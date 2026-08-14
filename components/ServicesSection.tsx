"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const WA_NUMBER = "628212600250";
function buildWaLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Type definisi disesuaikan untuk mengantisipasi snake_case dari API Laravel
type ServiceType = {
  id: number;
  title: string;
  description: string;
  startingPrice?: string;
  starting_price?: string; // Antisipasi API Laravel
  isPopular?: boolean;
  is_popular?: boolean; // Antisipasi API Laravel
  theme: "dark" | "light" | "outline";
  features: string[] | string; // Antisipasi jika API mengirim format string JSON
  image_url?: string;
  icon_key?: "umroh" | "umroh_plus" | "haji" | "lainnya";
};

// ==================== ICON LIBRARY ====================
const ICONS: Record<string, React.ReactNode> = {
  umroh: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3c-2.5 3-3.5 6-1.8 9.6C7.8 11.8 6 9.5 6 6.5 3.5 8.7 2 11.7 2 15c0 4.4 4.5 6 6 6 .3-1 1-2 2-2.5-.6 1-.5 2 .2 2.5.6-1.2 2-1.5 2.8-1 .5-1 .3-2.2-.5-3 1.6.2 2.7 1.4 3 3 1.9-1 4.5-3.5 4.5-7 0-2.6-1.2-4.8-3-6.2.3 1.6-.2 3-1.4 3.9C16.8 8 16.3 4.8 12 3z" />
    </svg>
  ),
  umroh_plus: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  ),
  haji: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" />
    </svg>
  ),
  lainnya: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
};

function resolveIcon(service: ServiceType) {
  if (service.icon_key && ICONS[service.icon_key]) return ICONS[service.icon_key];
  const title = service.title.toLowerCase();
  if (title.includes("haji")) return ICONS.haji;
  if (title.includes("plus")) return ICONS.umroh_plus;
  if (title.includes("umroh") || title.includes("umrah")) return ICONS.umroh;
  return ICONS.lainnya;
}

// ==================== SKELETON ====================
function ServicesSkeleton() {
  const shapes = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8" aria-hidden="true">
      {shapes.map((span, i) => (
        <div
          key={i}
          className={`${span} rounded-[2rem] p-8 md:p-12 bg-white border border-[#C6952F]/10 animate-pulse h-[320px] flex flex-col justify-between`}
        >
          <div className="space-y-4">
            <div className="w-9 h-9 rounded-full bg-[#C6952F]/15" />
            <div className="h-7 w-2/5 rounded-full bg-[#C6952F]/15" />
            <div className="h-3 w-4/5 rounded-full bg-[#C6952F]/10" />
            <div className="h-3 w-3/5 rounded-full bg-[#C6952F]/10" />
          </div>
          <div className="h-11 w-40 rounded-full bg-[#C6952F]/15" />
        </div>
      ))}
    </div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "empty" | "ready">("loading");

  const fetchServices = useCallback(async () => {
    setStatus("loading");
    try {
      // FIX 1: Tambahkan /api/ pada endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
      if (!response.ok) throw new Error("Bad response");
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        setServices(result.data);
        setStatus("ready");
      } else {
        setServices([]);
        setStatus("empty");
      }
    } catch (error) {
      console.error("Gagal mengambil data layanan:", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (status === "empty") return null;

  return (
    <section id="layanan" className="w-full py-24 md:py-32 bg-[#F6EFDF] relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="layananStarMotif" width="56" height="56" patternUnits="userSpaceOnUse">
            <path
              d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z"
              fill="none"
              stroke="#5C0A2E"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#layananStarMotif)" />
      </svg>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C0A2E] rounded-full blur-[150px] opacity-[0.06] pointer-events-none -translate-y-1/3 translate-x-1/3" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-[#C6952F]" />
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <h3 className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Pilihan Perjalanan
            </h3>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <span className="w-12 h-[1px] bg-[#C6952F]" />
          </div>

          <h2 className={`${marcellus.className} text-4xl md:text-5xl lg:text-6xl text-[#1B120B] leading-tight mb-6`}>
            Layanan <span className="text-[#5C0A2E]">Kami</span>
          </h2>
          <p className="text-[#4a3f33] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dari perjalanan spiritual yang khusyuk hingga wisata halal yang bermakna — pilih paket di bawah, atau langsung tanyakan detailnya ke tim kami.
          </p>
        </div>

        {status === "loading" && <ServicesSkeleton />}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-[2rem] border border-dashed border-[#C6952F]/30">
            <svg className="w-10 h-10 mb-4 text-[#5C0A2E]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-[#1B120B] font-semibold mb-1">Gagal memuat daftar layanan</p>
            <p className="text-sm text-[#5c5142] mb-6">Sepertinya ada gangguan koneksi ke server. Coba lagi sebentar.</p>
            <button
              onClick={fetchServices}
              className="inline-flex items-center gap-2 bg-[#5C0A2E] hover:bg-[#4A0825] text-[#F6EFDF] text-sm font-bold px-6 py-3 rounded-full transition-colors"
            >
              Muat Ulang
            </button>
          </div>
        )}

        {status === "ready" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {services.map((service, index) => {
              // FIX 2: Baca data dengan aman dari respons API
              const isPopular = service.isPopular || service.is_popular;
              const startingPrice = service.startingPrice || service.starting_price || "-";
              
              const isDark = service.theme === "dark";
              const isOutline = service.theme === "outline";
              const colSpan = index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
              
              // FIX 3: Parsing string URL gambar
              const rawImgUrl = service.image_url || "";
              const finalImageUrl = rawImgUrl
                ? (rawImgUrl.startsWith('http') ? rawImgUrl : `${process.env.NEXT_PUBLIC_API_URL}${rawImgUrl.startsWith('/') ? '' : '/'}${rawImgUrl}`)
                : "https://images.unsplash.com/photo-1565552643982-278783c462b5?q=80&w=1000";

              // FIX 4: Safety parse untuk fitur jika API mengembalikan string JSON
              let featuresArray: string[] = [];
              if (Array.isArray(service.features)) {
                featuresArray = service.features;
              } else if (typeof service.features === 'string') {
                try {
                  featuresArray = JSON.parse(service.features);
                } catch (e) {
                  featuresArray = []; // Fallback jika gagal parse JSON
                }
              }

              return (
                <div
                  key={service.id}
                  className={`
                    relative overflow-hidden rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                    ${colSpan}
                    ${isDark ? "bg-gradient-to-br from-[#1B120B] via-[#2E0E1B] to-[#5C0A2E] shadow-xl shadow-[#5C0A2E]/20 border border-[#C6952F]/20" : ""}
                    ${service.theme === "light" ? "bg-white shadow-md border border-[#C6952F]/10" : ""}
                    ${isOutline ? "bg-white shadow-md border-2 border-[#C6952F]/25" : ""}
                  `}
                >
                  {isPopular && (
                    <span className="absolute top-6 right-6 md:top-8 md:right-8 z-20 bg-[#C6952F] text-[#1B120B] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      Paling Diminati
                    </span>
                  )}

                  <div className="absolute inset-0 w-full h-full opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-700 pointer-events-none">
                    <Image
                      src={finalImageUrl}
                      alt={service.title}
                      fill
                      className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                    />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/10 text-[#C6952F]" : "bg-[#5C0A2E]/8 text-[#5C0A2E]"}`}>
                        {resolveIcon(service)}
                      </span>
                      <h3 className={`${marcellus.className} text-2xl md:text-3xl tracking-wide ${isDark ? "text-white" : "text-[#5C0A2E]"}`}>
                        {service.title}
                      </h3>
                    </div>

                    <p className={`text-sm leading-relaxed mb-5 max-w-md ${isDark ? "text-white/60" : "text-[#5c5142]"}`}>
                      {service.description}
                    </p>

                    <div className={`flex items-baseline gap-2 mb-6 pb-6 border-b ${isDark ? "border-white/15" : "border-[#5C0A2E]/10"}`}>
                      <span className={`text-[10px] uppercase tracking-widest ${isDark ? "text-[#E4D6B8]/50" : "text-[#8a7a5f]"}`}>
                        Mulai dari
                      </span>
                      <span className={`${marcellus.className} text-xl md:text-2xl ${isDark ? "text-[#C6952F]" : "text-[#5C0A2E]"}`}>
                        {startingPrice}
                      </span>
                    </div>

                    {featuresArray.length > 0 && (
                      <ul className="flex flex-col gap-3 mb-8">
                        {featuresArray.map((feature, idx) => (
                          <li key={idx}>
                            <Link
                              href={buildWaLink(`Assalamu'alaikum, saya tertarik dengan "${feature}". Boleh minta info lebih lanjut?`)}
                              target="_blank"
                              className="flex items-center gap-4 group/item"
                            >
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isDark ? "bg-white/10 text-[#C6952F] group-hover/item:bg-[#C6952F] group-hover/item:text-[#1B120B]" : "bg-[#5C0A2E]/5 text-[#C6952F] group-hover/item:bg-[#5C0A2E] group-hover/item:text-[#F6EFDF]"}`}>
                                <svg className="w-4 h-4 transform group-hover/item:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                              <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${isDark ? "text-white/80 group-hover/item:text-white" : "text-[#1B120B] group-hover/item:text-[#5C0A2E]"}`}>
                                {feature}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={buildWaLink(`Assalamu'alaikum, saya ingin bertanya tentang layanan ${service.title}. Boleh dibantu?`)}
                      target="_blank"
                      className={`mt-auto inline-flex items-center justify-center gap-2 w-full sm:w-max px-6 py-3.5 rounded-full font-semibold text-sm transition-all ${isDark ? "bg-[#C6952F] hover:bg-[#D9AB4A] text-[#1B120B] shadow-[0_8px_24px_rgba(198,149,47,0.35)]" : "bg-[#5C0A2E] hover:bg-[#4A0825] text-[#F6EFDF] shadow-[0_8px_24px_rgba(92,10,46,0.2)]"}`}
                    >
                      Tanya Layanan Ini
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.5 0-2.91-.32-4.16-.9L3 20l1.05-3.16A7.94 7.94 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}