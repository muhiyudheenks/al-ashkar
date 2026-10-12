-- ---------------------------------------------------------------------------
-- Al Ashkar — thobe order requests
--
-- Run this once in the Supabase SQL editor, then put the project URL and the
-- anon key in .env.local. The site works without it: the order form simply
-- falls back to WhatsApp.
-- ---------------------------------------------------------------------------

create table if not exists public.thobe_orders (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  full_name        text        not null,
  phone            text        not null,
  email            text,
  city             text,

  service          text        not null,
  collar_style     text,
  fabric           text,
  quantity         integer     not null default 1 check (quantity between 1 and 99),
  needed_by        date,

  -- { "chest": 104, "shoulder": 48, ... } in centimetres
  measurements     jsonb,

  notes            text,
  whatsapp_consent boolean     not null default false,
  language         text        not null default 'en',

  -- Shop-side workflow column, not written by the website
  status           text        not null default 'new'
                   check (status in ('new', 'contacted', 'in_progress', 'ready', 'closed'))
);

create index if not exists thobe_orders_created_at_idx
  on public.thobe_orders (created_at desc);

-- --- Row level security ----------------------------------------------------
-- The public site may only INSERT. Reading orders requires an authenticated
-- staff session, so customer details are never exposed through the anon key.

alter table public.thobe_orders enable row level security;

drop policy if exists "anon can submit an order" on public.thobe_orders;
create policy "anon can submit an order"
  on public.thobe_orders
  for insert
  to anon
  with check (true);

drop policy if exists "staff can read orders" on public.thobe_orders;
create policy "staff can read orders"
  on public.thobe_orders
  for select
  to authenticated
  using (true);

drop policy if exists "staff can update orders" on public.thobe_orders;
create policy "staff can update orders"
  on public.thobe_orders
  for update
  to authenticated
  using (true)
  with check (true);
