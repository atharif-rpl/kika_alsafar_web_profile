"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Type definisi menyesuaikan dengan struktur database Laravel lu
type SlideType = {
  id: number;
  image: string;
  tagline: string;
  title: string;
  highlightWord: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
};

// Data cadangan kalau database kosong atau gagal fetch biar web nggak nge-blank
const fallbackSlides: SlideType[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1565552643982-278783c462b5?q=80&w=2070",
    tagline: "Masjidil Haram, Makkah",
    title: "Perjalanan Menuju",
    highlightWord: "Baitullah",
    description: "Langkah awal menuju kedamaian sejati dengan pelayanan eksklusif dan pendampingan muthawif berpengalaman.",
    buttonText: "Pesan Sekarang",
    buttonLink: "#konsultasi",
    isActive: true,
  }
];

export default function HeroSection() {
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Data dari Database Laravel
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sliders`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          // Hanya ambil slide yang statusnya aktif
          const activeSlides = result.data.filter((slide: SlideType) => slide.isActive);
          setSlides(activeSlides.length > 0 ? activeSlides : fallbackSlides);
        } else {
          setSlides(fallbackSlides);
        }
      } catch (error) {
        console.error("Gagal mengambil data slider:", error);
        setSlides(fallbackSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliders();
  }, []);

  // 2. Logika Auto Slide
  useEffect(() => {
    if (slides.length <= 1) return; // Nggak perlu muter kalau slide cuma 1
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);


  // Tampilan Loading Skeleton
  if (isLoading) {
    return (
      <div className="relative w-full h-screen min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#1B120B] via-[#2E0E1E] to-[#5C0A2E]">
        <svg className="animate-spin h-10 w-10 text-[#C6952F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  const activeData = slides[currentSlide];

  return (
    <div className="relative w-full">
      {/* --- HERO FULL SCREEN --- */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col bg-gradient-to-br from-[#1B120B] via-[#2E0E1E] to-[#5C0A2E]">
        {/* Tekstur bintang geometris */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="starMotif" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z" fill="none" stroke="#C6952F" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#starMotif)" />
        </svg>

        {/* Glow lembut di belakang arch photo */}
        <div className="hidden lg:block absolute right-[6%] top-[42%] -translate-y-1/2 w-[440px] h-[440px] bg-[#C6952F]/20 blur-[110px] rounded-full pointer-events-none" />

        {/* Konten utama */}
        <div className="relative z-20 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-32 sm:pt-36 lg:pt-36 pb-10">
          
          {/* KIRI: Teks & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            {/* Eyebrow / Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
              <span className="text-xs md:text-sm font-medium text-[#E4D6B8] tracking-[0.25em] uppercase">
                {activeData?.tagline}
              </span>
            </div>

            {/* Headline Dinamis */}
            <div key={currentSlide} className="animate-fade-in-up">
              <h1 className={`${marcellus.className} text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.12] text-[#F6EFDF] mb-6`}>
                {activeData?.title}
                <br />
                <span className="text-[#C6952F] relative inline-block mt-1">
                  {activeData?.highlightWord}
                  <svg className="absolute -bottom-3 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 8 Q 50 -4 98 8" stroke="#C6952F" strokeWidth="1.5" fill="none" opacity="0.7" />
                    <circle cx="50" cy="1.5" r="1.6" fill="#C6952F" />
                  </svg>
                </span>
              </h1>

              <p className="text-[#E4D6B8]/80 text-base md:text-lg mb-10 max-w-xl leading-relaxed font-normal line-clamp-3">
                {activeData?.description}
              </p>
            </div>

            {/* CTA + Progress indicator */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-auto lg:mt-0">
              <Link
                href={activeData?.buttonLink || "#"}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C6952F] hover:bg-[#D9AB4A] text-[#1B120B] px-8 py-4 rounded-full font-semibold transition-all shadow-[0_8px_30px_rgba(198,149,47,0.35)]"
              >
                {activeData?.buttonText || "Pesan Sekarang"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Slider Indicator */}
              {slides.length > 1 && (
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="relative h-[3px] w-10 rounded-full bg-[#F6EFDF]/20 overflow-hidden"
                      aria-label={`Ke slide ${index + 1}`}
                    >
                      {index < currentSlide && <span className="absolute inset-0 bg-[#C6952F]/70" />}
                      {index === currentSlide && (
                        <span key={`fill-${currentSlide}`} className="absolute inset-y-0 left-0 bg-[#C6952F] rounded-full" style={{ animation: "heroFillBar 6s linear forwards" }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trust chips */}
            <div className="hidden sm:flex items-center gap-6 mt-10 pt-8 border-t border-dashed border-[#C6952F]/20">
              {["PPIU Resmi Kemenag RI", "Muthawif Tersertifikasi", "Hotel Bintang 4 & 5"].map((chip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#C6952F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-xs text-[#E4D6B8]/60 font-medium whitespace-nowrap">{chip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KANAN: Arch photo frame */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center gap-5 h-full">
            <span className="w-px h-16 bg-gradient-to-b from-transparent to-[#C6952F]/40" />

            <div className="relative w-full max-w-[430px] aspect-[4/5] rounded-t-full rounded-b-[2rem] overflow-hidden border-[3px] border-[#C6952F]/50 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
              {slides.map((slide, index) => (
                <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
                  <Image src={slide.image} alt={slide.title} fill className="object-cover object-center scale-105 animate-[kenburns_20s_ease-out_infinite]" priority={index === 0} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B120B]/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            <p className={`${marcellus.className} text-[#E4D6B8]/70 text-sm tracking-[0.3em]`}>
              {String(currentSlide + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}
            </p>

            <span className="w-px h-16 bg-gradient-to-t from-transparent to-[#C6952F]/40" />
          </div>
        </div>

        {/* Manifest bar (Tetap Statis / Bisa disesuaikan nanti kalau ada data dinamisnya) */}
        <div className="relative z-20 mx-6 sm:mx-10 md:mx-16 xl:mx-28 mb-8 md:mb-10">
          <div className="absolute -top-1.5 left-4 right-4 flex justify-between px-1">
            {Array.from({ length: 20 }).map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#3a1526]" />)}
          </div>

          <span className="hidden md:inline-flex absolute -top-3 right-6 z-30 items-center gap-1.5 bg-[#5C0A2E] text-[#F6EFDF] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6952F] animate-pulse" />
            Buruan, Slot Terbatas
          </span>

          <div className="bg-[#F6EFDF] rounded-2xl shadow-xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-[#C6952F]/40">
            {/* Rating */}
            <div className="flex items-center gap-3 py-3 sm:py-2 sm:px-4 rounded-xl transition-all duration-300 hover:bg-white hover:-translate-y-0.5 cursor-default">
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-[#C6952F]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#1B120B] font-bold text-sm leading-tight">4.9 <span className="text-[#8a7a5f] font-medium">/ 5</span></p>
                <p className="text-[#8a7a5f] text-[11px] uppercase tracking-wide">Kepuasan Jemaah</p>
              </div>
            </div>

            {/* Jemaah */}
            <div className="flex items-center gap-3 py-3 sm:py-2 sm:px-4 rounded-xl transition-all duration-300 hover:bg-white hover:-translate-y-0.5 cursor-default">
              <div className="flex -space-x-2 shrink-0">
                {["A", "B", "C"].map((letter, i) => (
                  <span key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1B120B] via-[#2E0E1B] to-[#5C0A2E] border-2 border-[#F6EFDF] flex items-center justify-center text-[9px] font-bold text-[#C6952F]">{letter}</span>
                ))}
              </div>
              <div>
                <p className="text-[#1B120B] font-bold text-sm">10.000+</p>
                <p className="text-[#8a7a5f] text-[11px] uppercase tracking-wide">Jemaah Berangkat</p>
              </div>
            </div>

            {/* Seat */}
            <div className="flex flex-col gap-2 py-3 sm:py-2 sm:px-4 rounded-xl transition-all duration-300 hover:bg-white hover:-translate-y-0.5 cursor-default sm:min-w-[190px]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5C0A2E] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5C0A2E]" />
                </span>
                <div>
                  <p className="text-[#1B120B] font-bold text-sm">5 Seat Tersisa</p>
                  <p className="text-[#8a7a5f] text-[11px] uppercase tracking-wide">Paket VIP · 25 Ags 2026</p>
                </div>
              </div>
              <div className="w-full h-1 bg-[#5C0A2E]/10 rounded-full overflow-hidden ml-5">
                <div className="h-full w-[15%] bg-gradient-to-r from-[#5C0A2E] to-[#C6952F] rounded-full" />
              </div>
            </div>

            <Link href="#detail" className="group/cta flex items-center justify-center gap-1.5 mt-4 sm:mt-0 sm:ml-auto sm:px-5 bg-[#5C0A2E] hover:bg-[#C6952F] text-[#F6EFDF] hover:text-[#1B120B] text-xs font-bold px-5 py-3 rounded-full transition-all duration-300 shadow-md">
              Lihat Detail
              <svg className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes heroFillBar { from { width: 0%; } to { width: 100%; } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
    </div>
  );
}