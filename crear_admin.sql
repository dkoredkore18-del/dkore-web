-- ============================================
-- CREAR USUARIO ADMIN - D'KORE
-- ============================================

-- INSTRUCCIONES:
-- 1. Reemplaza 'USER_UID_AQUI' con el UID que copiaste
-- 2. Reemplaza 'Tu Nombre' con tu nombre real
-- 3. Reemplaza 'tu-email@ejemplo.com' con el email que usaste
-- 4. Ejecuta este SQL

INSERT INTO usuarios_admin (id, nombre, email, rol, activo)
VALUES (
  'USER_UID_AQUI',           -- ⚠️ REEMPLAZAR con el UID del usuario
  'Tu Nombre',                -- ⚠️ REEMPLAZAR con tu nombre
  'tu-email@ejemplo.com',     -- ⚠️ REEMPLAZAR con tu email
  'admin',                    -- Rol (dejar como está)
  true                        -- Activo (dejar como está)
);

-- Verificar que se creó correctamente
SELECT * FROM usuarios_admin;

-- Deberías ver 1 registro con tu información
