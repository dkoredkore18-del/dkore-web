import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pfvgoumghwtkrinhxgwa.supabase.co",
      },
    ],
    unoptimized: true, // Desactivar optimización de imágenes para desarrollo
  },
};

export default nextConfig;
