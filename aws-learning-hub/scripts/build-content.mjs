import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve, relative } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = join(root, "content");
const destination = join(root, "frontend", "src", "data", "content-index.json");

async function getMarkdownFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(dirent => {
    const res = join(dir, dirent.name);
    return dirent.isDirectory() ? getMarkdownFiles(res) : res;
  }));
  return files.flat().filter(f => f.endsWith('.md') && !f.includes('lesson-template.md'));
}

const files = await getMarkdownFiles(source);

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null; // Skip files without frontmatter
  const metadata = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map(line => {
    const [key, ...value] = line.split(":");
    return [key.trim(), value.join(":").trim().replace(/^"|"$/g, "")];
  }));
  return { metadata, markdown: match[2] };
}

function parseQuiz(markdown) {
  const question = markdown.match(/<!-- quiz: ([\s\S]*?) -->/);
  const options = [...markdown.matchAll(/<!-- option: ([\s\S]*?)( \| correct)? -->/g)].map(match => ({ text: match[1], correct: Boolean(match[2]) }));
  const explanation = markdown.match(/<!-- explanation: ([\s\S]*?) -->/);
  return question && options.length ? { question: question[1], options, explanation: explanation?.[1] || "" } : null;
}

const lessons = [];
for (const file of files) {
  const content = await readFile(file, "utf8");
  const parsed = parseFrontmatter(content);
  if (!parsed) continue; // skip files without frontmatter (like READMEs)
  const { metadata, markdown } = parsed;
  if (metadata.published !== "true") continue;
  
  const relPath = relative(root, file).replace(/\\/g, '/');
  lessons.push({ 
    ...metadata, 
    duration_minutes: Number(metadata.duration_minutes || 30), 
    markdown, 
    quiz: parseQuiz(markdown), 
    source_file: relPath 
  });
}
lessons.sort((a,b) => a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title));

await mkdir(join(root, "frontend", "src", "data"), { recursive: true });
await writeFile(destination, JSON.stringify({ generated_at: new Date().toISOString(), lessons }, null, 2) + "\n");
console.log(`Built ${lessons.length} published lessons → frontend/src/data/content-index.json`);
