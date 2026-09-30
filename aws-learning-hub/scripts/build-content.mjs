import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = join(root, "content", "lessons");
const destination = join(root, "web", "content-index.json");
const files = (await readdir(source)).filter(file => file.endsWith(".md"));

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Missing YAML frontmatter");
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
  const { metadata, markdown } = parseFrontmatter(await readFile(join(source, file), "utf8"));
  if (metadata.published !== "true") continue;
  lessons.push({ ...metadata, duration_minutes: Number(metadata.duration_minutes || 30), markdown, quiz: parseQuiz(markdown), source_file: `content/lessons/${file}` });
}
lessons.sort((a,b) => a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title));
await mkdir(join(root, "web"), { recursive: true });
await writeFile(destination, JSON.stringify({ generated_at: new Date().toISOString(), lessons }, null, 2) + "\n");
console.log(`Built ${lessons.length} published lessons → web/content-index.json`);
