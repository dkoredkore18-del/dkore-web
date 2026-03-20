# 📁 ESTRUCTURA DE ARCHIVOS - SISTEMA DE COTIZACIONES

**Fecha:** Marzo 17, 2026  
**Objetivo:** Mostrar la estructura completa de archivos que se crearán

---

## 📂 ÁRBOL DE DIRECTORIOS COMPLETO

```
dkore/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts (ya existe)
│   │   ├── upload-images/
│   │   │   └── route.ts (ya existe)
│   │   └── quotations/                    ✨ NUEVO
│   │       └── route.ts                   ✨ NUEVO
│   │
│   ├── carrito/                           ✨ NUEVO
│   │   └── page.tsx                       ✨ NUEVO
│   │
│   ├── catalogo/
│   │   └── ... (ya existe)
│   │
│   ├── contacto/
│   │   └── ... (ya existe)
│   │
│   ├── layout.tsx (modificar)
│   ├── page.tsx (modificar)
│   └── globals.css
│
├── components/
│   ├── home/
│   │   └── ... (ya existe)
│   │
│   ├── layout/
│   │   └── ... (ya existe)
│   │
│   ├── products/
│   │   └── ... (ya existe)
│   │
│   ├── ui/
│   │   └── ... (ya existe)
│   │
│   ├── cart/                              ✨ NUEVO
│   │   ├── CartSummary.tsx                ✨ NUEVO
│   │   ├── CartItem.tsx                   ✨ NUEVO
│   │   └── CartButton.tsx                 ✨ NUEVO
│   │
│   └── quotation/                         ✨ NUEVO
│       ├── QuotationForm.tsx              ✨ NUEVO
│       ├── QuotationModal.tsx             ✨ NUEVO
│       └── QuotationSuccess.tsx           ✨ NUEVO
│
├── contexts/                              ✨ NUEVO
│   └── CartContext.tsx                    ✨ NUEVO
│
├── hooks/
│   ├── useAuth.ts (ya existe)
│   ├── useProducts.ts (ya existe)
│   ├── useCart.ts                         ✨ NUEVO
│   └── useQuotation.ts                    ✨ NUEVO
│
├── lib/
│   ├── constants.ts (ya existe)
│   ├── utils.ts (ya existe)
│   ├── validations.ts (ya existe)
│   │
│   ├── supabase/
│   │   ├── client.ts (ya existe)
│   │   ├── server.ts (ya existe)
│   │   └── middleware.ts (ya existe)
│   │
│   ├── pdf/                               ✨ NUEVO
│   │   ├── generateQuotationPDF.ts        ✨ NUEVO
│   │   └── pdfTemplates.ts                ✨ NUEVO
│   │
│   ├── whatsapp/                          ✨ NUEVO
│   │   └── twilio.ts                      ✨ NUEVO
│   │
│   └── quotations/                        ✨ NUEVO
│       ├── quotationService.ts            ✨ NUEVO
│       └── quotationValidation.ts         ✨ NUEVO
│
├── types/
│   ├── index.ts (modificar)
│   └── quotation.ts                       ✨ NUEVO
│
├── documentacion/
│   ├── PLAN_SISTEMA_COTIZACIONES.md       ✨ NUEVO
│   ├── OPCIONES_GRATIS_DETALLADAS.md      ✨ NUEVO
│   ├── ESTRUCTURA_ARCHIVOS_COTIZACIONES.md ✨ NUEVO
│   ├── GUIA_IMPLEMENTACION_PASO_A_PASO.md ✨ NUEVO
│   └── ... (otros documentos)
│
├── .env.local (modificar)
├── .env.local.example (modificar)
├── package.json (modificar)
├── tsconfig.json (ya existe)
└── next.config.ts (ya existe)
```

---

## 📋 DESCRIPCIÓN DE ARCHIVOS A CREAR

### 1. CONTEXTO DEL CARRITO

**Archivo:** `contexts/CartContext.tsx`
```typescript
// Proporciona estado global del carrito
// Métodos: addItem, removeItem, updateQuantity, clearCart
// Persiste en localStorage
```

---

### 2. COMPONENTES DEL CARRITO

**Archivo:** `components/cart/CartSummary.tsx`
```typescript
// Muestra resumen del carrito
// Subtotal, total, cantidad de items
// Botón "Solicitar Cotización"
```

**Archivo:** `components/cart/CartItem.tsx`
```typescript
// Componente individual de producto en carrito
// Cantidad, precio, botón eliminar
```

**Archivo:** `components/cart/CartButton.tsx`
```typescript
// Botón flotante o en header
// Muestra cantidad de items
// Enlace a página del carrito
```

---

### 3. COMPONENTES DE COTIZACIÓN

**Archivo:** `components/quotation/QuotationForm.tsx`
```typescript
// Formulario para datos del cliente
// Campos: nombre, email, teléfono, empresa
// Validación de datos
```

**Archivo:** `components/quotation/QuotationModal.tsx`
```typescript
// Modal que contiene el formulario
// Abre cuando usuario hace clic en "Solicitar Cotización"
```

**Archivo:** `components/quotation/QuotationSuccess.tsx`
```typescript
// Pantalla de confirmación
// Muestra que se envió correctamente
// Número de cotización
```

---

### 4. HOOKS PERSONALIZADOS

**Archivo:** `hooks/useCart.ts`
```typescript
// Hook para usar el carrito
// Simplifica acceso al contexto
// Métodos: addItem, removeItem, etc.
```

**Archivo:** `hooks/useQuotation.ts`
```typescript
// Hook para procesar cotizaciones
// Maneja loading, errores, éxito
// Llama a API /api/quotations
```

---

### 5. GENERACIÓN DE PDF

**Archivo:** `lib/pdf/generateQuotationPDF.ts`
```typescript
// Función principal para generar PDF
// Recibe datos de cotización
// Retorna buffer del PDF
// Usa PDFKit
```

**Archivo:** `lib/pdf/pdfTemplates.ts`
```typescript
// Funciones auxiliares para diseño del PDF
// Encabezado, tabla de productos, pie de página
// Estilos y formatos
```

---

### 6. INTEGRACIÓN WHATSAPP

**Archivo:** `lib/whatsapp/twilio.ts`
```typescript
// Funciones para enviar mensajes por WhatsApp
// sendWhatsAppMessage()
// Usa SDK de Twilio
```

---

### 7. SERVICIOS DE COTIZACIÓN

**Archivo:** `lib/quotations/quotationService.ts`
```typescript
// Lógica de negocio para cotizaciones
// Crear cotización
// Guardar en Supabase
// Generar número único
```

**Archivo:** `lib/quotations/quotationValidation.ts`
```typescript
// Validación de datos de cotización
// Validar email, teléfono, etc.
// Validar productos
```

---

### 8. TIPOS TYPESCRIPT

**Archivo:** `types/quotation.ts`
```typescript
// Interfaces para cotizaciones
// CartItem, Quotation, QuotationRequest, etc.
```

---

### 9. PÁGINA DEL CARRITO

**Archivo:** `app/carrito/page.tsx`
```typescript
// Página principal del carrito
// Muestra CartSummary
// Botón para solicitar cotización
// Enlace para continuar comprando
```

---

### 10. API ROUTE

**Archivo:** `app/api/quotations/route.ts`
```typescript
// Endpoint POST para procesar cotizaciones
// Recibe datos del cliente y carrito
// Genera PDF
// Envía por WhatsApp
// Guarda en Supabase
// Retorna confirmación
```

---

## 📝 ARCHIVOS A MODIFICAR

### 1. `package.json`
```json
{
  "dependencies": {
    // Agregar:
    "pdfkit": "^0.13.0",
    "twilio": "^4.0.0"
  },
  "devDependencies": {
    // Agregar:
    "@types/pdfkit": "^0.12.0"
  }
}
```

### 2. `.env.local`
```env
# Agregar:
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+1234567890
NEXT_PUBLIC_COMPANY_NAME=DKORE
NEXT_PUBLIC_COMPANY_EMAIL=info@dkore.com.ec
NEXT_PUBLIC_COMPANY_PHONE=+593XXXXXXXXX
```

### 3. `.env.local.example`
```env
# Agregar las mismas variables que en .env.local
```

### 4. `types/index.ts`
```typescript
// Agregar tipos de cotización
// Importar desde types/quotation.ts
```

### 5. `app/layout.tsx`
```typescript
// Agregar CartProvider
// Envolver componentes con contexto
```

### 6. `app/page.tsx`
```typescript
// Agregar CartButton en header
// Mostrar carrito en navegación
```

---

## 🗂️ ESTRUCTURA DE CARPETAS A CREAR

```bash
# Crear carpetas
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

## 📊 RESUMEN DE ARCHIVOS

| Tipo | Cantidad | Estado |
|------|----------|--------|
| Archivos nuevos | 20+ | ✨ A crear |
| Archivos a modificar | 6 | 📝 Modificar |
| Carpetas nuevas | 8 | 📁 A crear |
| Archivos existentes | 30+ | ✅ Sin cambios |

---

## 🔄 ORDEN DE CREACIÓN RECOMENDADO

### Fase 1: Estructura Base
1. Crear carpetas
2. Crear `types/quotation.ts`
3. Crear `contexts/CartContext.tsx`
4. Crear `hooks/useCart.ts`

### Fase 2: Componentes UI
5. Crear `components/cart/CartItem.tsx`
6. Crear `components/cart/CartSummary.tsx`
7. Crear `components/cart/CartButton.tsx`
8. Crear `components/quotation/QuotationForm.tsx`
9. Crear `components/quotation/QuotationModal.tsx`
10. Crear `components/quotation/QuotationSuccess.tsx`

### Fase 3: Lógica Backend
11. Crear `lib/pdf/pdfTemplates.ts`
12. Crear `lib/pdf/generateQuotationPDF.ts`
13. Crear `lib/whatsapp/twilio.ts`
14. Crear `lib/quotations/quotationValidation.ts`
15. Crear `lib/quotations/quotationService.ts`

### Fase 4: Hooks y API
16. Crear `hooks/useQuotation.ts`
17. Crear `app/api/quotations/route.ts`

### Fase 5: Páginas
18. Crear `app/carrito/page.tsx`

### Fase 6: Integración
19. Modificar `app/layout.tsx`
20. Modificar `app/page.tsx`
21. Modificar `package.json`
22. Modificar `.env.local`
23. Modificar `types/index.ts`

---

## 🎯 CHECKLIST DE CREACIÓN

### Carpetas
- [ ] `contexts/`
- [ ] `components/cart/`
- [ ] `components/quotation/`
- [ ] `lib/pdf/`
- [ ] `lib/whatsapp/`
- [ ] `lib/quotations/`
- [ ] `types/`
- [ ] `app/carrito/`
- [ ] `app/api/quotations/`

### Archivos Nuevos
- [ ] `types/quotation.ts`
- [ ] `contexts/CartContext.tsx`
- [ ] `hooks/useCart.ts`
- [ ] `hooks/useQuotation.ts`
- [ ] `components/cart/CartItem.tsx`
- [ ] `components/cart/CartSummary.tsx`
- [ ] `components/cart/CartButton.tsx`
- [ ] `components/quotation/QuotationForm.tsx`
- [ ] `components/quotation/QuotationModal.tsx`
- [ ] `components/quotation/QuotationSuccess.tsx`
- [ ] `lib/pdf/pdfTemplates.ts`
- [ ] `lib/pdf/generateQuotationPDF.ts`
- [ ] `lib/whatsapp/twilio.ts`
- [ ] `lib/quotations/quotationValidation.ts`
- [ ] `lib/quotations/quotationService.ts`
- [ ] `app/carrito/page.tsx`
- [ ] `app/api/quotations/route.ts`

### Archivos a Modificar
- [ ] `package.json`
- [ ] `.env.local`
- [ ] `.env.local.example`
- [ ] `types/index.ts`
- [ ] `app/layout.tsx`
- [ ] `app/page.tsx`

---

## 📚 REFERENCIAS

- [Next.js File Structure](https://nextjs.org/docs/getting-started/project-structure)
- [React Context API](https://react.dev/reference/react/useContext)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/)

---

**Última actualización:** Marzo 17, 2026
