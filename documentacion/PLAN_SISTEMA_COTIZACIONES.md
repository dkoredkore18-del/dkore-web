# 📋 PLAN DE TRABAJO: SISTEMA DE COTIZACIONES AUTOMÁTICAS

**Fecha de Creación:** Marzo 17, 2026  
**Estado:** En Planificación  
**Versión:** 1.0

---

## 🎯 OBJETIVO PRINCIPAL

Crear un sistema de cotizaciones automáticas que permita a los usuarios:
1. Agregar productos al carrito de compras
2. Solicitar una cotización con un clic
3. Recibir un PDF con los detalles de la cotización
4. Recibir el PDF por WhatsApp automáticamente

---

## 📊 FLUJO DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO EN PÁGINA WEB                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  1. NAVEGA CATÁLOGO Y AGREGA PRODUCTOS AL CARRITO           │
│     - Selecciona cantidad                                    │
│     - Visualiza carrito en tiempo real                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  2. ACCEDE A PÁGINA DEL CARRITO                             │
│     - Ve resumen de productos                               │
│     - Ve subtotal y total                                   │
│     - Botón "Solicitar Cotización"                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  3. COMPLETA FORMULARIO DE DATOS                            │
│     - Nombre completo                                       │
│     - Email                                                 │
│     - Teléfono WhatsApp                                     │
│     - Empresa (opcional)                                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  4. BACKEND PROCESA COTIZACIÓN                              │
│     - Valida datos                                          │
│     - Genera PDF con detalles                               │
│     - Guarda en Supabase                                    │
│     - Envía por WhatsApp (GRATIS)                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  5. USUARIO RECIBE MENSAJE EN WHATSAPP                      │
│     - Saludo personalizado                                  │
│     - PDF adjunto con cotización                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 OPCIONES GRATIS PARA CADA COMPONENTE

### 1. **GENERACIÓN DE PDF** ✅ GRATIS
**Opción Recomendada: `pdfkit` (Node.js)**
- Librería open-source completamente gratis
- Funciona en backend (Next.js API routes)
- Genera PDFs de alta calidad
- Sin límites de uso

**Alternativa:** `html2pdf` (también gratis)

### 2. **ENVÍO POR WHATSAPP** ✅ GRATIS (con limitaciones)
**Opción 1: Twilio (RECOMENDADO)**
- Plan gratuito: $15 USD de crédito inicial
- Suficiente para ~2000 mensajes
- Muy confiable y fácil de integrar
- Después: ~$0.0075 USD por mensaje

**Opción 2: WhatsApp Business API (GRATIS pero complejo)**
- Requiere aprobación de Meta
- Más burocracia
- Mejor para volumen alto

**Opción 3: Baileys (EXPERIMENTAL - NO RECOMENDADO)**
- Usa WhatsApp Web
- Viola términos de servicio
- Riesgo de bloqueo

**RECOMENDACIÓN FINAL:** Usar Twilio con crédito gratuito inicial

### 3. **BASE DE DATOS** ✅ GRATIS
**Ya tienes:** Supabase (plan gratuito)
- 500 MB de almacenamiento
- Suficiente para cotizaciones
- Queries ilimitadas

### 4. **HOSTING** ✅ GRATIS
**Ya tienes:** Vercel (plan gratuito)
- Despliega Next.js sin costo
- Suficiente para este proyecto

### 5. **ALMACENAMIENTO DE PDFs** ✅ GRATIS
**Opción 1: Supabase Storage (RECOMENDADO)**
- 1 GB gratuito
- Integrado con tu BD
- Fácil de usar

**Opción 2: Generar PDF en memoria**
- Sin almacenamiento
- Enviar directamente por WhatsApp
- Más simple

---

## 📋 FASES DEL PROYECTO

### **FASE 1: CARRITO DE COMPRAS** (Semana 1)
**Objetivo:** Implementar carrito funcional

#### Tareas:
- [ ] Crear contexto/estado global del carrito (Context API o Zustand)
- [ ] Crear componente `CartContext.tsx`
- [ ] Agregar botón "Agregar al carrito" en productos
- [ ] Crear página `/app/carrito/page.tsx`
- [ ] Mostrar resumen de productos en carrito
- [ ] Calcular subtotal y total
- [ ] Persistir carrito en localStorage
- [ ] Crear botón "Solicitar Cotización"

**Archivos a crear:**
```
contexts/
  └── CartContext.tsx
app/carrito/
  └── page.tsx
components/cart/
  └── CartSummary.tsx
  └── CartItem.tsx
```

---

### **FASE 2: FORMULARIO DE COTIZACIÓN** (Semana 1-2)
**Objetivo:** Recopilar datos del cliente

#### Tareas:
- [ ] Crear componente `QuotationForm.tsx`
- [ ] Validar datos (email, teléfono)
- [ ] Integrar con carrito
- [ ] Mostrar modal o página separada
- [ ] Guardar datos temporalmente

**Archivos a crear:**
```
components/quotation/
  └── QuotationForm.tsx
  └── FormValidation.ts
```

---

### **FASE 3: GENERACIÓN DE PDF** (Semana 2)
**Objetivo:** Crear PDFs con cotizaciones

#### Tareas:
- [ ] Instalar `pdfkit` y `@types/pdfkit`
- [ ] Crear función `generateQuotationPDF()`
- [ ] Diseñar template del PDF:
  - Logo de DKORE
  - Datos del cliente
  - Tabla de productos
  - Subtotal, impuestos, total
  - Fecha y número de cotización
- [ ] Guardar PDF en Supabase Storage (opcional)
- [ ] Retornar PDF como buffer

**Archivos a crear:**
```
lib/pdf/
  └── generateQuotationPDF.ts
```

---

### **FASE 4: INTEGRACIÓN TWILIO** (Semana 2-3)
**Objetivo:** Enviar cotizaciones por WhatsApp

#### Tareas:
- [ ] Crear cuenta en Twilio (gratis)
- [ ] Obtener número de WhatsApp de Twilio
- [ ] Instalar `twilio` SDK
- [ ] Crear función `sendWhatsAppMessage()`
- [ ] Configurar variables de entorno
- [ ] Probar envío de mensajes

**Archivos a crear:**
```
lib/whatsapp/
  └── twilio.ts
```

**Variables de entorno:**
```
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+1234567890
```

---

### **FASE 5: API ROUTE PARA COTIZACIONES** (Semana 3)
**Objetivo:** Procesar cotizaciones completas

#### Tareas:
- [ ] Crear endpoint `/api/quotations`
- [ ] Validar datos recibidos
- [ ] Generar PDF
- [ ] Enviar por WhatsApp
- [ ] Guardar en Supabase
- [ ] Retornar confirmación al frontend

**Archivos a crear:**
```
app/api/quotations/
  └── route.ts
```

---

### **FASE 6: INTEGRACIÓN FRONTEND** (Semana 3-4)
**Objetivo:** Conectar todo en la UI

#### Tareas:
- [ ] Crear hook `useQuotation()`
- [ ] Conectar formulario con API
- [ ] Mostrar loading mientras se procesa
- [ ] Mostrar confirmación de éxito
- [ ] Manejar errores
- [ ] Limpiar carrito después de enviar

**Archivos a crear:**
```
hooks/
  └── useQuotation.ts
```

---

### **FASE 7: TABLA EN SUPABASE** (Semana 1)
**Objetivo:** Almacenar cotizaciones

#### Tareas:
- [ ] Crear tabla `quotations` en Supabase
- [ ] Definir campos
- [ ] Crear índices
- [ ] Configurar RLS (Row Level Security)

**SQL:**
```sql
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
```

---

### **FASE 8: TESTING Y REFINAMIENTO** (Semana 4)
**Objetivo:** Asegurar que todo funciona

#### Tareas:
- [ ] Probar flujo completo
- [ ] Validar PDFs generados
- [ ] Verificar mensajes WhatsApp
- [ ] Probar en diferentes dispositivos
- [ ] Optimizar rendimiento
- [ ] Documentar bugs encontrados

---

## 🛠️ TECNOLOGÍAS Y LIBRERÍAS

### Frontend
```json
{
  "react": "19.2.3",
  "next": "16.1.6",
  "tailwindcss": "4"
}
```

### Backend (A instalar)
```json
{
  "pdfkit": "^0.13.0",
  "@types/pdfkit": "^0.12.0",
  "twilio": "^4.0.0"
}
```

### Servicios Externos
- **Twilio:** Envío de WhatsApp (gratis inicialmente)
- **Supabase:** Base de datos y almacenamiento (gratis)
- **Vercel:** Hosting (gratis)

---

## 📊 ESTRUCTURA DE DATOS

### Carrito (Frontend - localStorage)
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
}
```

### Cotización (Backend - Supabase)
```typescript
interface Quotation {
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

## 🔐 VARIABLES DE ENTORNO

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Twilio
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+1234567890

# Configuración
NEXT_PUBLIC_COMPANY_NAME=DKORE
NEXT_PUBLIC_COMPANY_EMAIL=info@dkore.com.ec
NEXT_PUBLIC_COMPANY_PHONE=+593XXXXXXXXX
```

---

## 📈 TIMELINE ESTIMADO

| Fase | Duración | Inicio | Fin |
|------|----------|--------|-----|
| 1. Carrito | 3-4 días | Semana 1 | Semana 1 |
| 2. Formulario | 2-3 días | Semana 1 | Semana 1-2 |
| 3. PDF | 3-4 días | Semana 2 | Semana 2 |
| 4. Twilio | 2-3 días | Semana 2 | Semana 2-3 |
| 5. API | 3-4 días | Semana 3 | Semana 3 |
| 6. Frontend | 2-3 días | Semana 3 | Semana 3-4 |
| 7. BD | 1-2 días | Semana 1 | Semana 1 |
| 8. Testing | 3-4 días | Semana 4 | Semana 4 |

**Total estimado:** 4-5 semanas

---

## ✅ CHECKLIST DE REQUISITOS

### Antes de Empezar
- [ ] Revisar estructura actual del proyecto
- [ ] Entender lista de precios de productos
- [ ] Definir IDs de productos en BD
- [ ] Crear cuenta Twilio (gratis)
- [ ] Crear tabla en Supabase

### Durante Desarrollo
- [ ] Instalar dependencias necesarias
- [ ] Crear archivos según estructura
- [ ] Implementar cada fase en orden
- [ ] Probar cada componente
- [ ] Documentar cambios

### Antes de Deploy
- [ ] Validar todas las variables de entorno
- [ ] Probar flujo completo
- [ ] Verificar PDFs
- [ ] Probar WhatsApp
- [ ] Optimizar rendimiento
- [ ] Revisar seguridad

---

## 🚀 PRÓXIMOS PASOS

1. **Revisar estructura actual** de productos y precios
2. **Crear tabla en Supabase** para cotizaciones
3. **Instalar dependencias** (pdfkit, twilio)
4. **Comenzar FASE 1** (Carrito de compras)
5. **Documentar avances** en este archivo

---

## 📝 NOTAS IMPORTANTES

- **Costo Total:** $0 USD (usando opciones gratis)
- **Crédito Twilio:** $15 USD gratuitos (suficiente para ~2000 mensajes)
- **Tiempo de Implementación:** 4-5 semanas
- **Mantenimiento:** Mínimo después de implementar
- **Escalabilidad:** Fácil de escalar si crece el volumen

---

## 🔗 REFERENCIAS ÚTILES

- [PDFKit Documentation](http://pdfkit.org/)
- [Twilio WhatsApp API](https://www.twilio.com/whatsapp)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Última actualización:** Marzo 17, 2026  
**Responsable:** Sistema de Cotizaciones DKORE
