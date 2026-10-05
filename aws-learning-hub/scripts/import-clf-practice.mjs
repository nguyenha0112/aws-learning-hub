// Convert the exported Google Docs CLF-C02 practice test into the frontend JSON format.
// Usage: node scripts/import-clf-practice.mjs <input.txt>
import { readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/import-clf-practice.mjs <input.txt>");
const raw = (await readFile(resolve(input), "utf8")).replace(/\r/g, "");
const answerMarker = "🗝️ ĐÁP ÁN & GIẢI THÍCH CHI TIẾT BỘ ĐỀ SỐ 1";
const markerIndex = raw.lastIndexOf(answerMarker);
if (markerIndex < 0) throw new Error("Could not find the answer key section.");
const questionsText = raw.slice(raw.indexOf("Question 1 (Cloud Concepts):"), markerIndex);
const answersText = raw.slice(markerIndex);
const answers = new Map([...answersText.matchAll(/Question (\d+):\s*([A-D])\.\s*([^\n]+)/g)].map(match => [Number(match[1]), { correct_option: match[2], explanation: match[3].trim() }]));
const blocks = [...questionsText.matchAll(/Question (\d+) \(([^)]+)\):\s*([\s\S]*?)(?=\nQuestion \d+ \(|$)/g)];
const questions = blocks.map(match => {
  const number = Number(match[1]);
  const lines = match[3].split("\n").map(line => line.trim()).filter(Boolean);
  const question = lines[0];
  const options = lines.slice(1).map(line => { const opt = line.match(/^\d+\.\s*([A-D])\.\s*(.+)$/); return opt ? { id: opt[1], text: opt[2] } : null; }).filter(Boolean);
  const answer = answers.get(number);
  if (options.length !== 4 || !answer) throw new Error(`Could not parse question ${number}.`);
  return { id: `q${number}`, domain: match[2], question, options, ...answer };
});
if (questions.length !== 65) throw new Error(`Expected 65 questions, found ${questions.length}.`);
const output = { exams: [{ id: "clf-c02-practice-1", title: "AWS Cloud Practitioner (CLF-C02) - Đề thi thử số 1", certification: "CLF-C02", duration_minutes: 90, passing_score: 700, questions }] };
await writeFile(join(resolve(import.meta.dirname, ".."), "frontend", "src", "data", "mock-exam.json"), JSON.stringify(output, null, 2) + "\n");
console.log(`Imported ${questions.length} questions into frontend/src/data/mock-exam.json`);
