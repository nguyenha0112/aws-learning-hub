// Safe, read-only keep-alive for a Supabase Free plan project.
// Reads one public lesson using only the publishable key from the ignored .env.
// It never writes content, auth data, progress, or API keys.
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const env = Object.fromEntries(
  (await readFile(join(root, ".env"), "utf8"))
    .split(/\r?\n/)
    .filter((line) => /^[A-Za-z_][A-Za-z0-9_]*=/.test(line))
    .map((line) => { const divider = line.indexOf("="); return [line.slice(0, divider), line.slice(divider + 1)]; }),
);

if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in local .env.");
}

const url = new URL("/rest/v1/lessons?select=id&limit=1", env.SUPABASE_URL);
const response = await fetch(url, {
  headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}` },
});

if (!response.ok) throw new Error(`Supabase keep-alive failed with HTTP ${response.status}.`);
console.log(`Supabase keep-alive OK (${new Date().toISOString()}).`);
