import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update Metadata untuk SEO Web Travel lu
export const metadata: Metadata = {
  title: "Kika Alsafar | Travel Umrah & Wisata Halal Resmi",
  description: "Penyelenggara perjalanan ibadah umrah dan wisata halal resmi yang berdedikasi memberikan pelayanan amanah, profesional, dan terpercaya.",
};

// Perbaikan tipe data TypeScript standar Next.js App Router
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ubah lang jadi "id" dan tambahkan 'scroll-smooth' agar navigasi navbar mulus
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      {/* Bersihkan body dari class layouting yang bentrok dengan page.tsx */}
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}