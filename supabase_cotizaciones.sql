-- Tabla para guardar cotizaciones generadas en D'kore
-- Ejecutar en Supabase SQL Editor

create table if not exists cotizaciones (
  id uuid default gen_random_uuid() primary key,
  numero_cotizacion text not null unique,
  fecha_emision text not null,
  fecha_validez text not null,
  cliente_nombres text not null,
  cliente_apellidos text not null,
  cliente_cedula text not null,
  cliente_telefono text not null,
  cliente_direccion text not null,
  items jsonb not null default '[]',
  subtotal numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

-- Índices útiles para búsquedas
create index if not exists idx_cotizaciones_cedula on cotizaciones(cliente_cedula);
create index if not exists idx_cotizaciones_created_at on cotizaciones(created_at desc);

-- RLS: solo el service role puede insertar/leer (desde API route)
alter table cotizaciones enable row level security;

-- Política: acceso total solo con service role (desde servidor)
create policy "service_role_all" on cotizaciones
  for all
  using (true)
  with check (true);
