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

-- A profile row is created when a user signs up. Role assignment is stored in
-- the database and enforced by RLS; the browser cannot promote itself.
do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill profiles for any accounts created before this migration.
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do update set email = excluded.email;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.lesson_progress enable row level security;
alter table public.lessons enable row level security;
alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;

drop policy if exists "Published lessons are readable by everyone" on public.lessons;
drop policy if exists "Users read their own learning progress" on public.lesson_progress;
drop policy if exists "Users insert their own learning progress" on public.lesson_progress;
drop policy if exists "Users update their own learning progress" on public.lesson_progress;
drop policy if exists "Users delete their own learning progress" on public.lesson_progress;
drop policy if exists "Users read their own profile" on public.profiles;
drop policy if exists "Admins read every profile" on public.profiles;
drop policy if exists "Admins update roles" on public.profiles;
drop policy if exists "Admins read all lessons" on public.lessons;
drop policy if exists "Admins insert lessons" on public.lessons;
drop policy if exists "Admins update lessons" on public.lessons;
drop policy if exists "Admins delete lessons" on public.lessons;

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

create policy "Users read their own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "Admins read every profile"
on public.profiles for select to authenticated
using ((select public.is_admin()));

create policy "Admins update roles"
on public.profiles for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins read all lessons"
on public.lessons for select to authenticated
using ((select public.is_admin()));

create policy "Admins insert lessons"
on public.lessons for insert to authenticated
with check ((select public.is_admin()));

create policy "Admins update lessons"
on public.lessons for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins delete lessons"
on public.lessons for delete to authenticated
using ((select public.is_admin()));
