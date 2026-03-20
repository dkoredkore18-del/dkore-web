# 🚀 GUÍA DE IMPLEMENTACIÓN PASO A PASO

**Fecha:** Marzo 17, 2026  
**Objetivo:** Guía detallada para implementar el sistema de cotizaciones

---

## ⚡ INICIO RÁPIDO

### Paso 0: Preparación Inicial

```bash
# 1. Instalar dependencias necesarias
npm install pdfkit @types/pdfkit twilio

# 2. Crear tabla en Supabase (ver SQL abajo)

# 3. Crear cuenta Twilio (ver instrucciones abajo)

# 4. Configurar variables de entorno
# Editar .env.local con credenciales
```

---

## 📊 PASO 1: CREAR TABLA EN SUPABASE

### SQL a ejecutar en Supabase

```sql
-- Crear tabla de cotizaciones
CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  client_company VARCHAR(255),
  products JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2),
  total DECIMAL(10, 2) NOT NULL,
  pdf_url VARCHAR(500),
  quotation_number VARCHAR(50) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para búsquedas rápidas
CREATE INDEX idx_quotations_client_email ON quotations(client_email);
CREATE INDEX idx_quotations_created_at ON quotations(created_at);
CREATE INDEX idx_quotations_status ON quotations(status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Política para insertar (cualquiera puede crear)
CREATE POLICY "Anyone can insert quotations"
  ON quotations FOR INSERT
  WITH CHECK (true);

-- Política para leer (cualquiera puede leer)
CREATE POLICY "Anyone can read quotations"
  ON quotations FOR SELECT
  USING (true);
```

### Pasos en Supabase:
1. Ir a https://supabase.com
2. Abrir tu proyecto DKORE
3. Ir a SQL Editor
4. Crear nueva query
5. Copiar y pegar el SQL anterior
6. Ejecutar

---

## 🔑 PASO 2: CONFIGURAR TWILIO

### Crear cuenta Twilio:

1. Ir a https://www.twilio.com/
2. Hacer clic en "Sign Up"
3. Completar formulario
4. Verificar email
5. Ir a Console
6. Copiar:
   - Account SID
   - Auth Token
7. Ir a "Messaging" → "Services"
8. Crear nuevo servicio WhatsApp
9. Copiar número de WhatsApp asignado

### Variables de entorno:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890
```

---

## 📦 PASO 3: INSTALAR DEPENDENCIAS

```bash
npm install pdfkit @types/pdfkit twilio
```

---

## 🏗️ PASO 4: CREAR ESTRUCTURA DE CARPETAS

```bash
mkdir -p contexts
mkdir -p components/cart
mkdir -p components/quotation
mkdir -p lib/pdf
mkdir -p lib/whatsapp
mkdir -p lib/quotations
mkdir -p types
mkdir -p app/carrito
mkdir -p app/api/quotations
```

---

## 📝 PASO 5: CREAR TIPOS TYPESCRIPT

### Archivo: `types/quotation.ts`

```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface QuotationRequest {
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company?: string;
  items: CartItem[];
}

export interface Quotation {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company?: string;
  products: CartItem[];
  subtotal: number;
  tax?: number;
  total: number;
  pdf_url?: string;
  quotation_number: string;
  status: 'pending' | 'sent' | 'viewed' | 'rejected';
  created_at: Date;
  updated_at: Date;
}
```

---

## 🎯 PRÓXIMOS PASOS

Ver documentos:
- `PLAN_SISTEMA_COTIZACIONES.md` - Plan completo
- `ESTRUCTURA_ARCHIVOS_COTIZACIONES.md` - Estructura de archivos
- `OPCIONES_GRATIS_DETALLADAS.md` - Opciones gratis disponibles

