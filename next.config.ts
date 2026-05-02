import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ofygrgagyodbmifsozcy.supabase.co",
      },
    ],
    unoptimized: true, // Desactivar optimización de imágenes para desarrollo
  },
};

export default nextConfig;
