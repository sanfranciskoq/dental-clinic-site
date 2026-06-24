-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_date date not null,
  preferred_time text not null,
  service text not null,
  patient_type text not null check (patient_type in ('new', 'returning')),
  notes text,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

create index if not exists appointment_requests_created_at_idx
  on public.appointment_requests (created_at desc);

alter table public.appointment_requests enable row level security;

-- No public read/update/delete policies. Inserts go through the server using the service role key.
