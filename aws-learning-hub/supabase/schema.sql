-- Run this once in Supabase Dashboard → SQL Editor.
-- Content is authored in Markdown and can be synced by scripts/sync-supabase.mjs.
create table if not exists public.lessons (
  id text primary key,
  title text not null,
  domain text not null,
  duration_minutes integer not null default 30 check (duration_minutes > 0),
  level text not null default 'Foundation',
  video_url text,
  markdown text not null,
  quiz jsonb,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;
alter table public.lessons enable row level security;

create policy "Published lessons are readable by everyone"
on public.lessons for select
using (published = true);

create policy "Users read their own learning progress"
on public.lesson_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Users insert their own learning progress"
on public.lesson_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users update their own learning progress"
on public.lesson_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users delete their own learning progress"
on public.lesson_progress for delete to authenticated
using ((select auth.uid()) = user_id);
