"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const pillars = [
  {
    title: "Jaminan Kepastian Visa & Keberangkatan",
    desc: "Tanggal berangkat dan proses visa Anda kami pastikan, tanpa penundaan mendadak.",
    bgImage: "https://images.unsplash.com/photo-1542043103-6850d750c333?q=80&w=800", // Tema: Bandara/Pesawat
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Jaminan Keamanan",
    desc: "Seluruh perjalanan diawasi standar keamanan ketat, dari keberangkatan sampai pulang.",
    bgImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800", // Tema: Makkah/Ka'bah
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Pelayanan Profesional & Berkualitas",
    desc: "Tim berpengalaman siap membantu setiap detail ibadah Anda dengan sepenuh hati.",
    bgImage: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=800", // Tema: Pelayanan/Muthowif
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Fasilitas Lengkap dan Nyaman",
    desc: "Hotel, transportasi, dan konsumsi dipilih agar istirahat Anda tetap maksimal.",
    bgImage: "https://images.unsplash.com/photo-1577538928305-3807c3993047?q=80&w=800", // Tema: Hotel/Kamar Nyaman
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Ramah, Amanah, dan Terpercaya",
    desc: "Dipercaya ribuan jemaah karena selalu menepati janji dan melayani dengan tulus.",
    bgImage: "https://images.unsplash.com/photo-1565552643986-13a890731f24?q=80&w=800", // Tema: Masjid Nabawi/Kedamaian
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function WhyChooseUsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % pillars.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6EFDF] border-y border-[#C6952F]/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C0A2E] rounded-full blur-[130px] opacity-[0.05] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="whyStarMotif" width="56" height="56" patternUnits="userSpaceOnUse">
            <path
              d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z"
              fill="none"
              stroke="#5C0A2E"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#whyStarMotif)" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <h3 className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Keunggulan Kami
            </h3>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>
          <h2 className={`${marcellus.className} text-3xl md:text-4xl lg:text-5xl text-[#1B120B] leading-tight`}>
            Kenapa Memilih{" "}
            <span className="text-[#5C0A2E] relative inline-block">
              Kika Al-Safar?
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 Q 50 -4 98 8" stroke="#C6952F" strokeWidth="1.5" fill="none" opacity="0.8" />
                <circle cx="50" cy="1.5" r="1.6" fill="#C6952F" />
              </svg>
            </span>
          </h2>
          <p className="mt-6 text-[#4a3f33] text-base md:text-lg leading-relaxed">
            Komitmen kami adalah memberikan pengalaman ibadah yang tenang,
            aman, dan nyaman sesuai tuntunan, dengan fasilitas terbaik untuk
            Anda.
          </p>
        </div>

        {/* ==================== DESKTOP: Panel Fan Interaktif ==================== */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="hidden lg:flex gap-4 h-[440px]"
        >
          {pillars.map((pillar, index) => {
            const isActive = index === active;
            return (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`relative rounded-[1.75rem] overflow-hidden text-left transition-all duration-500 ease-in-out border ${
                  isActive
                    ? "flex-[3] bg-[#2E0E1B] border-[#C6952F]/30 shadow-2xl"
                    : "flex-1 bg-white border-[#C6952F]/15 hover:border-[#5C0A2E]/25 hover:bg-[#F6EFDF]/60"
                }`}
              >
                {/* Background Image buat ngisi kekosongan pas aktif */}
                <div 
                  className={`absolute inset-0 z-0 transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={pillar.bgImage}
                    alt={pillar.title}
                    fill
                    className="object-cover opacity-[0.35] mix-blend-luminosity"
                  />
                  {/* Gradien penutup biar teks tetep kebaca jelas */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B120B] via-[#2E0E1B]/80 to-[#5C0A2E]/40" />
                </div>

                {/* Watermark angka */}
                <span
                  className={`${marcellus.className} absolute -bottom-4 right-4 z-10 text-8xl leading-none pointer-events-none select-none transition-colors duration-500 ${
                    isActive ? "text-white/[0.15]" : "text-[#5C0A2E]/[0.06]"
                  }`}
                >
                  0{index + 1}
                </span>

                {/* Konten kolaps (icon + judul vertikal) */}
                <div
                  className={`absolute inset-0 z-10 flex flex-col items-center justify-between p-6 transition-opacity duration-300 ${
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <span className="w-12 h-12 rounded-xl bg-[#F6EFDF] text-[#5C0A2E] flex items-center justify-center shrink-0">
                    {pillar.icon}
                  </span>
                  <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-semibold text-[#1B120B] tracking-wide text-center">
                    {pillar.title}
                  </span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#C6952F]" />
                </div>

                {/* Konten expand (aktif) */}
                <div
                  className={`relative z-20 h-full flex flex-col justify-between p-8 md:p-10 transition-opacity duration-500 delay-150 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md text-[#C6952F] flex items-center justify-center shrink-0 border border-white/10">
                    {pillar.icon}
                  </span>
                  <div className="max-w-[85%]">
                    <h4 className={`${marcellus.className} text-2xl xl:text-3xl text-white mb-3 leading-snug drop-shadow-md`}>
                      {pillar.title}
                    </h4>
                    <p className="text-[#E4D6B8]/90 text-sm md:text-base leading-relaxed max-w-sm drop-shadow">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ==================== MOBILE: Accordion Vertikal ==================== */}
        <div className="flex lg:hidden flex-col gap-3">
          {pillars.map((pillar, index) => {
            const isOpen = openMobile === index;
            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                  isOpen ? "border-[#5C0A2E]/40 bg-white shadow-md" : "border-[#C6952F]/15 bg-white/70"
                }`}
              >
                <button
                  onClick={() => setOpenMobile(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-[#5C0A2E] text-[#C6952F]" : "bg-[#F6EFDF] text-[#5C0A2E]"
                    }`}
                  >
                    {pillar.icon}
                  </span>
                  <span className={`flex-1 font-bold text-sm ${isOpen ? "text-[#5C0A2E]" : "text-[#1B120B]"}`}>
                    {pillar.title}
                  </span>
                  <svg
                    className={`w-5 h-5 shrink-0 text-[#5C0A2E]/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[4.25rem] text-sm text-[#5c5142] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}