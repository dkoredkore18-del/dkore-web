import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://ofygrgagyodbmifsozcy.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const LOCAL_IMAGES_PATH = 'C:\\Users\\admin\\Desktop\\dkore\\dkore-web\\imagenes usadas';
const BUCKET_NAME = 'dkore-images';

if (!SUPABASE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY no está definida en .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadDirectory(dirPath, remotePath = '') {
  try {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Recursivamente procesar subdirectorios
        const newRemotePath = remotePath ? `${remotePath}/${file}` : file;
        await uploadDirectory(filePath, newRemotePath);
      } else {
        // Subir archivo
        const fileContent = fs.readFileSync(filePath);
        const remoteFilePath = remotePath ? `${remotePath}/${file}` : file;

        console.log(`Subiendo: ${remoteFilePath}`);

        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(remoteFilePath, fileContent, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) {
          console.error(`Error al subir ${remoteFilePath}:`, error.message);
        } else {
          console.log(`✓ Subido: ${remoteFilePath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error procesando directorio:', error.message);
  }
}

async function main() {
  console.log('Iniciando carga de imágenes...');
  console.log(`Ruta local: ${LOCAL_IMAGES_PATH}`);
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log('---');

  if (!fs.existsSync(LOCAL_IMAGES_PATH)) {
    console.error(`Error: La ruta no existe: ${LOCAL_IMAGES_PATH}`);
    process.exit(1);
  }

  await uploadDirectory(LOCAL_IMAGES_PATH);

  console.log('---');
  console.log('Carga completada');
}

main().catch(console.error);
