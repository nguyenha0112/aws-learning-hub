// Applies supabase/schema.sql through the Supabase Management API.
// Required .env value: SUPABASE_ACCESS_TOKEN (scoped PAT with Database Read-write).
import { readFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const root = resolve(import.meta.dirname, "..");
const variables = Object.fromEntries((await readFile(join(root, ".env"), "utf8")).split(/\r?\n/).filter(x => /^[A-Za-z_][A-Za-z0-9_]*=/.test(x)).map(line => { const i=line.indexOf("="); return [line.slice(0,i), line.slice(i+1)]; }));
if (!variables.SUPABASE_ACCESS_TOKEN) throw new Error("Missing SUPABASE_ACCESS_TOKEN. Create a scoped PAT with Database Read-write, then add it to .env.");
const projectRef = new URL(variables.SUPABASE_URL).hostname.split(".")[0];
const query = await readFile(join(root, "supabase", "schema.sql"), "utf8");
const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, { method:"POST", headers:{ Authorization:`Bearer ${variables.SUPABASE_ACCESS_TOKEN}`, "Content-Type":"application/json" }, body:JSON.stringify({query}) });
if (!response.ok) throw new Error(`Schema migration failed (${response.status}): ${await response.text()}`);
console.log("Supabase schema applied successfully.");
