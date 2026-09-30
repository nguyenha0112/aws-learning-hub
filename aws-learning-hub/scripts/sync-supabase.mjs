// Syncs generated lesson metadata into Supabase. It reads .env locally; secrets are never printed.
import { readFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const root = resolve(import.meta.dirname, "..");
const variables = Object.fromEntries((await readFile(join(root, ".env"), "utf8")).split(/\r?\n/).filter(x=>/^[A-Za-z_][A-Za-z0-9_]*=/.test(x)).map(line=>{const i=line.indexOf("=");return [line.slice(0,i),line.slice(i+1)];}));
const index = JSON.parse(await readFile(join(root, "web", "content-index.json"), "utf8"));
if (!variables.SUPABASE_URL || !variables.SUPABASE_SECRET_KEY) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY are required in .env");
const rows = index.lessons.map(l => ({ id:l.id, title:l.title, domain:l.domain, duration_minutes:l.duration_minutes, level:l.level, video_url:l.video_url || null, markdown:l.markdown, quiz:l.quiz, published:true }));
const response = await fetch(`${variables.SUPABASE_URL}/rest/v1/lessons?on_conflict=id`, { method:"POST", headers:{ apikey:variables.SUPABASE_SECRET_KEY, Authorization:`Bearer ${variables.SUPABASE_SECRET_KEY}`, "Content-Type":"application/json", Prefer:"resolution=merge-duplicates,return=minimal" }, body:JSON.stringify(rows) });
if (!response.ok) throw new Error(`Supabase sync failed (${response.status}). Apply supabase/schema.sql first.`);
console.log(`Synced ${rows.length} lessons to Supabase.`);
