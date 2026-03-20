import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawerProvider } from "@/contexts/CartDrawerContext";
import CartDrawerRoot from "@/components/cart/CartDrawerRoot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "D'kore | Macetas, Revestimientos y Muebles en Cuenca",
    template: "%s | D'kore",
  },
  description:
    "D'kore — Decore y Remodele. Macetas decorativas, revestimientos 3D y muebles de melamina personalizados en Cuenca, Ecuador. Diseño con carácter y precisión.",
  keywords: [
    "macetas decorativas Cuenca",
    "revestimientos 3D Ecuador",
    "muebles melamina Cuenca",
    "decoración hogar Ecuador",
    "D'kore",
    "dkore",
    "macetas personalizadas",
    "revestimientos decorativos",
  ],
  authors: [{ name: "D'kore", url: "https://www.dkore.com.ec" }],
  creator: "D'kore",
  metadataBase: new URL("https://www.dkore.com.ec"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://www.dkore.com.ec",
    siteName: "D'kore",
    title: "D'kore | Macetas, Revestimientos y Muebles en Cuenca",
    description:
      "Macetas decorativas, revestimientos 3D y muebles de melamina personalizados. Diseño con carácter en Cuenca, Ecuador.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D'kore — Decore y Remodele",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D'kore | Macetas, Revestimientos y Muebles en Cuenca",
    description:
      "Macetas decorativas, revestimientos 3D y muebles de melamina personalizados en Cuenca, Ecuador.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <CartProvider>
          <CartDrawerProvider>
            <Navbar />
            {children}
            <WhatsAppButton />
            <CartDrawerRoot />
          </CartDrawerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
