"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Definisi tipe data dari API Laravel
type PartnerType = {
  id: number;
  name: string;
  src: string;
};

export default function PartnershipSection() {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari API Laravel
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // FIX 1: Pastikan endpoint nembak ke /api/
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partners`);
        const result = await response.json();

        if (result.success && result.data) {
          // Hanya ambil mitra yang statusnya "active" (Antisipasi juga kalau API pakai boolean is_active)
          const activePartners = result.data.filter((p: any) => p.status === 'active' || p.is_active === true);
          
          // Format data biar sesuai dengan properti yang dipanggil di UI (src)
          const formattedPartners = activePartners.map((p: any) => {
            // FIX 2: Logika URL Gambar Absolute
            const rawImgUrl = p.image_url || p.image || "";
            const finalImageUrl = rawImgUrl
              ? (rawImgUrl.startsWith('http') ? rawImgUrl : `${process.env.NEXT_PUBLIC_API_URL}${rawImgUrl.startsWith('/') ? '' : '/'}${rawImgUrl}`)
              : "https://images.unsplash.com/photo-1565552643982-278783c462b5?q=80&w=200"; // Fallback aman
              
            return {
              id: p.id,
              name: p.name || "Mitra Kika Alsafar",
              src: finalImageUrl, 
            };
          });

          setPartners(formattedPartners);
        }
      } catch (error) {
        console.error("Gagal mengambil data mitra:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Tampilan loading agar tinggi section tidak loncat
  if (isLoading) {
    return (
      <section className="w-full py-20 bg-[#F6EFDF] border-y border-[#C6952F]/20 flex items-center justify-center min-h-[300px]">
        <svg className="animate-spin h-10 w-10 text-[#5C0A2E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </section>
    );
  }

  // Sembunyikan section jika tidak ada mitra aktif
  if (!isLoading && partners.length === 0) return null;

  return (
    <section className="w-full py-20 bg-[#F6EFDF] border-y border-[#C6952F]/20 overflow-hidden flex flex-col items-center relative">

      {/* Bagian Atas: Teks & Headline */}
      <div className="w-full text-center px-6 mb-12 max-w-[1440px] relative z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          <span className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
            Mitra Perjalanan
          </span>
          <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
        </div>
        <h2 className={`${marcellus.className} text-[#1B120B] text-3xl md:text-4xl`}>
          Maskapai & Fasilitas Premium
        </h2>
      </div>

      {/* Bagian Bawah: Marquee Logo Berjalan */}
      <div className="w-full relative flex overflow-hidden group py-6">

        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#F6EFDF] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#F6EFDF] to-transparent z-10 pointer-events-none" />

        {/* Track Animasi 1 */}
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] items-center">
          {partners.map((partner, index) => (
            <div key={`track1-${partner.id}-${index}`} className="flex items-center">

              {/* Kontainer Logo */}
              <div className="mx-8 md:mx-16 relative w-48 md:w-64 h-20 md:h-28 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer drop-shadow-sm">
                <Image
                  src={partner.src}
                  alt={`Logo ${partner.name}`}
                  fill
                  className="object-contain"
                />
              </div>

              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6952F]/50 shrink-0" />
            </div>
          ))}
        </div>

        {/* Track Animasi 2 (Clone untuk loop infinite) */}
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] items-center" aria-hidden="true">
          {partners.map((partner, index) => (
            <div key={`track2-${partner.id}-${index}`} className="flex items-center">

              {/* Kontainer Logo */}
              <div className="mx-8 md:mx-16 relative w-48 md:w-64 h-20 md:h-28 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer drop-shadow-sm">
                <Image 
                  src={partner.src} 
                  alt={`Logo ${partner.name}`} 
                  fill 
                  className="object-contain"
                /> 
              </div>

              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6952F]/50 shrink-0" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}