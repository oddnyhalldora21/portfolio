-- Contact form messages for oddnyhalldora.com
-- Run this once in Supabase Dashboard → SQL Editor → New query.

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320 and email like '%_@_%'),
  message     text not null check (char_length(message) between 1 and 5000),
  created_at  timestamptz not null default now()
);

-- Row Level Security: with RLS on and no SELECT/UPDATE/DELETE policies,
-- nobody using the public anon key can read or change messages.
alter table public.contact_messages enable row level security;

-- Allow anonymous visitors to insert messages, and nothing else.
drop policy if exists "Anonymous can insert contact messages" on public.contact_messages;
create policy "Anonymous can insert contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- Defense in depth: also restrict table-level privileges for the anon role.
revoke all on table public.contact_messages from anon;
grant insert (name, email, message) on table public.contact_messages to anon;

-- Read your messages in Table Editor → contact_messages,
-- or with: select * from public.contact_messages order by created_at desc;
