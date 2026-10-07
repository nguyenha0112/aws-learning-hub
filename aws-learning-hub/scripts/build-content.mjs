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
  const questionEn = markdown.match(/<!-- quiz-en: ([\s\S]*?) -->/);
  const explanationEn = markdown.match(/<!-- explanation-en: ([\s\S]*?) -->/);
  return question && options.length ? { question: question[1], question_en: questionEn?.[1] || "", options, explanation: explanation?.[1] || "", explanation_en: explanationEn?.[1] || "" } : null;
}

function parseSectionQuizzes(markdown) {
  return [...markdown.matchAll(/<!-- section-quiz: ([\s\S]*?) -->([\s\S]*?)<!-- \/section-quiz -->/g)].map(match => {
    const questions = [...match[2].matchAll(/<!-- question: ([\s\S]*?) -->([\s\S]*?)<!-- \/question -->/g)].map(question => ({
      question: question[1].trim(),
      options: [...question[2].matchAll(/<!-- option: ([\s\S]*?)( \| correct)? -->/g)].map(option => ({
        text: option[1].trim(),
        correct: Boolean(option[2]),
      })),
      explanation: question[2].match(/<!-- explanation: ([\s\S]*?) -->/)?.[1].trim() || "",
    })).filter(question => question.options.length > 0);
    return { section: match[1].trim(), questions };
  }).filter(group => group.questions.length > 0);
}

function stripQuizMarkup(markdown) {
  return markdown
    .replace(/\n?<!-- section-quiz: [\s\S]*?<!-- \/section-quiz -->\s*/g, "\n")
    .replace(/\n## Quiz\s*\n(?:<!--[\s\S]*?-->\s*)+$/m, "\n")
    .trim();
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
    markdown: stripQuizMarkup(markdown),
    quiz: parseQuiz(markdown),
    section_quizzes: parseSectionQuizzes(markdown),
    source_file: relPath 
  });
}
lessons.sort((a,b) => a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title));

await mkdir(join(root, "frontend", "src", "data"), { recursive: true });
await writeFile(destination, JSON.stringify({ generated_at: new Date().toISOString(), lessons }, null, 2) + "\n");
console.log(`Built ${lessons.length} published lessons → frontend/src/data/content-index.json`);
