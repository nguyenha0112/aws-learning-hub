-- Run this once in Supabase Dashboard → SQL Editor.
-- This database design stores only per-user learning progress.
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

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
