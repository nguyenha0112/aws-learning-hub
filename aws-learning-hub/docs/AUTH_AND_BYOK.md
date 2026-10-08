# Auth, roles, and personal AI keys

## Roles

Every new Supabase Auth user gets a `public.profiles` row with `user` role. The first administrator must be promoted deliberately in Supabase Dashboard → SQL Editor after they have registered:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'your-admin-email@example.com');
```

Do not place this promotion in a public app route. The database's RLS policies permit role changes only for an existing administrator.

## Personal AI key (BYOK)

The app supports direct browser requests to OpenRouter or Groq. A learner's key, chosen model, temperature, and output limit are kept in browser `sessionStorage`; they are not written to Supabase, application logs, Git, or an API route. The learner can clear it in **AI** settings.

Provider browser policies can change. If a provider blocks a browser request (for example through CORS), the app displays its returned error; it never proxies the key through this project.

## Supabase Free-plan keep-alive

`scripts/keep-supabase-alive.mjs` makes one read-only REST query against published lessons using the local publishable key. It does not write to the database or expose a secret. A scheduled local automation runs this command three times daily to provide ordinary database activity; keep the local `.env` available to the automation. See the private test report for the latest execution result.
