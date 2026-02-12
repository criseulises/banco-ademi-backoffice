import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "Banco ADEMI - Portal de Clientes",
  description: "Portal de clientes Banco ADEMI - Credimejoras",
  keywords: ["Banco ADEMI", "Credimejoras", "Portal bancario", "República Dominicana"],
  icons: {
    icon: "/icon/icon-ademi.ico",
    apple: "/icon/icon-ademi.ico",
  },
  openGraph: {
    title: "Banco ADEMI - Portal de Clientes",
    description: "Portal de clientes Banco ADEMI - Credimejoras",
    type: "website",
    images: "/icon/icon-ademi.ico",
  },
  twitter: {
    card: "summary",
    title: "Banco ADEMI - Portal de Clientes",
    description: "Portal de clientes Banco ADEMI - Credimejoras",
    images: "/icon/icon-ademi.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
