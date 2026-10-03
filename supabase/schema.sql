-- -------------------------------------------------------------
-- IoT Luxe 888 - Apple-Grade IoT E-Commerce & Ordering System
-- -------------------------------------------------------------

-- 1. ตารางสินค้า IoT / Microcontrollers / Sensors
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  price numeric not null,
  original_price numeric,
  stock integer default 50,
  sku text unique,
  badge text,
  description text,
  specs jsonb,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. ตารางคำสั่งซื้อ (Orders)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address text not null,
  need_tax_invoice boolean default false,
  company_name text,
  tax_id text,
  branch text,
  items jsonb not null,
  subtotal numeric not null,
  shipping_fee numeric default 0,
  total_amount numeric not null,
  status text default 'pending_payment', -- pending_payment, verifying, processing, shipped, completed
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. ตารางแจ้งชำระเงิน (Payment Notifications / Slips)
create table if not exists public.payment_notifications (
  id uuid default gen_random_uuid() primary key,
  order_number text not null,
  bank_name text not null,
  amount numeric not null,
  transfer_datetime timestamp with time zone not null,
  customer_note text,
  slip_status text default 'pending_verification',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.payment_notifications enable row level security;

create policy "Public can read products" on public.products for select using (true);
create policy "Public can create orders" on public.orders for insert with check (true);
create policy "Public can view own order by number" on public.orders for select using (true);
create policy "Public can submit payment notification" on public.payment_notifications for insert with check (true);
create policy "Public can view payment status" on public.payment_notifications for select using (true);
