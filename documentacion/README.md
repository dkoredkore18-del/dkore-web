# DOCUMENTACIÓN DEL PROYECTO D'KORE

Esta carpeta contiene toda la documentación del desarrollo del proyecto D'kore Web.

---

## 📋 ÍNDICE DE DOCUMENTOS

### Especificaciones y Estado
- **PROYECTO_DKORE_ESPECIFICACIONES.md** - Especificaciones completas del proyecto
- **ESTADO_PROYECTO.md** - Estado actual del desarrollo
- **INDICE_DOCUMENTACION.md** - Índice original de documentación

### Sesiones de Desarrollo
- **SESION_01_REESTRUCTURACION.md** - Primera sesión: Reestructuración del proyecto
- **SESION_02_SUPABASE.md** - Segunda sesión: Configuración de Supabase
- **SESION_03_MIGRACION.md** - Tercera sesión: Migración de productos
- **RESUMEN_SESION_02.md** - Resumen de la sesión 2

### Guías Técnicas
- **GUIA_SUPABASE.md** - Guía de configuración de Supabase
- **REESTRUCTURACION.md** - Documentación de la reestructuración

### Bugs y Soluciones
- **BUGS_CORREGIDOS.md** - Lista de bugs corregidos
- **SOLUCIONES_CARRUSEL.md** - ⚠️ Soluciones intentadas para el carrusel (EN PROGRESO)

### Completados
- **MIGRACION_COMPLETADA.md** - Documentación de migración completada
- **CARRUSEL_NUEVO.md** - Documentación del nuevo carrusel

---

## 🚨 PROBLEMA ACTUAL

**Carrusel Hero - Controles no visibles**

Ver: `SOLUCIONES_CARRUSEL.md` para detalles completos de todas las soluciones intentadas.

**Estado:** Se implementó solución con inline styles (Intento #5)
**Pendiente:** Verificar si funciona en el navegador

---

## 📁 ESTRUCTURA DEL PROYECTO

```
dkore/
├── app/                    # Páginas de Next.js
├── components/            # Componentes React
│   ├── home/             # Componentes del home (HeroCarousel, etc)
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── products/         # Componentes de productos
│   └── ui/               # Componentes UI reutilizables
├── lib/                   # Utilidades y configuración
│   ├── supabase/         # Clientes de Supabase
│   ├── constants.ts      # Constantes del proyecto
│   ├── utils.ts          # Funciones utilitarias
│   └── validations.ts    # Validaciones
├── hooks/                 # Custom React hooks
├── types/                 # Definiciones de TypeScript
├── public/               # Archivos estáticos
├── scripts/              # Scripts de utilidad
└── documentacion/        # 📚 Esta carpeta
```

---

## 🔧 TECNOLOGÍAS

- Next.js 16.1.6 (Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4 (Beta)
- Framer Motion
- Supabase

---

## 📝 CONVENCIONES

- Cada sesión de desarrollo debe documentarse en un archivo SESION_XX.md
- Los bugs deben registrarse en BUGS_CORREGIDOS.md
- Las soluciones complejas deben tener su propio documento (ej: SOLUCIONES_CARRUSEL.md)
- Mantener ESTADO_PROYECTO.md actualizado con el progreso

---

Última actualización: 3 de marzo de 2026
