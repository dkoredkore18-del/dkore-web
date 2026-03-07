-- ============================================
-- CONFIGURACIÓN DE BASE DE DATOS - D'KORE
-- ============================================

-- 1. TABLA DE PRODUCTOS
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  descripcion TEXT NOT NULL,
  descripcion_larga TEXT,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  imagenes TEXT[] DEFAULT '{}',
  destacado BOOLEAN DEFAULT false,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para productos
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_productos_slug ON productos(slug);
CREATE INDEX idx_productos_destacado ON productos(destacado);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON productos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================

-- 2. TABLA DE MENSAJES DE CONTACTO
CREATE TABLE mensajes_contacto (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  celular TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'leido', 'respondido')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  leido_at TIMESTAMP WITH TIME ZONE
);

-- Índices para mensajes
CREATE INDEX idx_mensajes_estado ON mensajes_contacto(estado);
CREATE INDEX idx_mensajes_created_at ON mensajes_contacto(created_at DESC);

-- ============================================

-- 3. TABLA DE PROYECTOS
CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  imagenes TEXT[] DEFAULT '{}',
  productos_usados UUID[] DEFAULT '{}',
  fecha_realizacion DATE,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para proyectos
CREATE INDEX idx_proyectos_destacado ON proyectos(destacado);
CREATE INDEX idx_proyectos_fecha ON proyectos(fecha_realizacion DESC);

-- ============================================

-- 4. TABLA DE USUARIOS ADMIN
CREATE TABLE usuarios_admin (
  id UUID REFERENCES auth.users PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  rol TEXT DEFAULT 'admin',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para usuarios
CREATE INDEX idx_usuarios_activo ON usuarios_admin(activo);

-- ============================================

-- 5. POLÍTICAS DE SEGURIDAD (RLS - Row Level Security)

-- Productos: Lectura pública, escritura solo admin
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Productos son visibles públicamente"
ON productos FOR SELECT
USING (true);

CREATE POLICY "Solo admins pueden insertar productos"
ON productos FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

CREATE POLICY "Solo admins pueden actualizar productos"
ON productos FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

CREATE POLICY "Solo admins pueden eliminar productos"
ON productos FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

-- ============================================

-- Mensajes: Inserción pública, lectura solo admin
ALTER TABLE mensajes_contacto ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar mensajes"
ON mensajes_contacto FOR INSERT
WITH CHECK (true);

CREATE POLICY "Solo admins pueden leer mensajes"
ON mensajes_contacto FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

CREATE POLICY "Solo admins pueden actualizar mensajes"
ON mensajes_contacto FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

-- ============================================

-- Proyectos: Lectura pública, escritura solo admin
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Proyectos son visibles públicamente"
ON proyectos FOR SELECT
USING (true);

CREATE POLICY "Solo admins pueden gestionar proyectos"
ON proyectos FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

-- ============================================

-- Usuarios admin: Solo admins pueden ver
ALTER TABLE usuarios_admin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Solo admins pueden ver usuarios"
ON usuarios_admin FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM usuarios_admin
    WHERE id = auth.uid() AND activo = true
  )
);

-- ============================================

-- 6. FUNCIONES ÚTILES

-- Función para buscar productos
CREATE OR REPLACE FUNCTION buscar_productos(termino TEXT)
RETURNS SETOF productos AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM productos
  WHERE 
    nombre ILIKE '%' || termino || '%' OR
    descripcion ILIKE '%' || termino || '%' OR
    categoria ILIKE '%' || termino || '%'
  ORDER BY destacado DESC, orden ASC, nombre ASC;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener productos destacados
CREATE OR REPLACE FUNCTION productos_destacados(limite INTEGER DEFAULT 6)
RETURNS SETOF productos AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM productos
  WHERE destacado = true
  ORDER BY orden ASC, created_at DESC
  LIMIT limite;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener productos por categoría
CREATE OR REPLACE FUNCTION productos_por_categoria(cat TEXT)
RETURNS SETOF productos AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM productos
  WHERE categoria = cat
  ORDER BY orden ASC, nombre ASC;
END;
$$ LANGUAGE plpgsql;

-- ============================================

-- 7. DATOS DE EJEMPLO (OPCIONAL - comentar si no quieres datos de prueba)

-- Insertar algunos productos de ejemplo
INSERT INTO productos (nombre, slug, descripcion, categoria, destacado, orden) VALUES
('Mesa Calacata White', 'mesa-calacata-white', 'Elegante mesa en piedra sinterizada con vetas blancas', 'mesas-piedra-sinterizada', true, 1),
('Maceta Lunaris Mini', 'maceta-lunaris-mini', 'Maceta compacta en fibra de vidrio', 'macetas-fibra-vidrio', true, 2),
('Revestimiento 3D Ola', 'revestimiento-ola', 'Textura ondulada moderna para paredes', 'revestimientos-3d', true, 3);

-- ============================================

COMMIT;

-- Verificar que todo se creó correctamente
SELECT 'Tablas creadas:' as mensaje;
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

SELECT 'Productos insertados:' as mensaje;
SELECT COUNT(*) as total FROM productos;
