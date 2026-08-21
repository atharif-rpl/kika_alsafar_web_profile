"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Tipe data menyesuaikan API Laravel
type TestimonialApiType = {
  id: number;
  name: string;
  package_name: string;
  review: string;
  rating: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

// Tipe data yang dibutuhkan oleh UI Next.js
type MappedTestimonial = {
  id: number;
  name: string;
  photo: string;
  package: string;
  comment: string;
  rating: number;
  date: string;
  theme: "light" | "dark";
  badge?: string;
};

const StarRow = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-[#C6952F]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<MappedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState<number[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // FIX 1: Nambahin /api/ di URL endpoint biar bisa nembak ke route backend Laravel yang bener
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);
        const result = await response.json();

        if (result.success && result.data) {
          // Filter hanya testimoni yang aktif
          const activeTestis = result.data.filter((t: TestimonialApiType) => t.is_active);
          
          // Mapping data API ke format UI
          const formatted = activeTestis.map((item: TestimonialApiType, index: number) => {
            const date = new Date(item.created_at);
            const formattedDate = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

            return {
              id: item.id,
              name: item.name,
              // FIX 2: Ganti link gambar Unsplash yang mati 404 pakai link cadangan yang baru dan elegan
              photo: item.image_url || "https://images.unsplash.com/photo-1591461942940-0eb52b571110?q=80&w=800&auto=format&fit=crop",
              package: item.package_name || "Layanan Kika Alsafar",
              comment: item.review,
              rating: item.rating,
              date: formattedDate,
              theme: index % 2 !== 0 ? "dark" : "light", // Selang-seling warna kartu
              badge: index === 0 && item.rating >= 4 ? "Ulasan Pilihan" : undefined
            };
          });

          setTestimonials(formatted);
        }
      } catch (error) {
        console.error("Gagal mengambil data testimoni:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const toggleExpand = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Mencegah klik tombol expand memicu pergantian slide
    setExpanded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (isLoading) {
    return (
      <section className="w-full py-24 bg-[#F6EFDF] flex items-center justify-center min-h-[500px]">
        <svg className="animate-spin h-10 w-10 text-[#5C0A2E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </section>
    );
  }

  // Jika database kosong, jangan render section ini
  if (!isLoading && testimonials.length === 0) return null;

  return (
    <section className="w-full py-24 bg-[#F6EFDF] relative overflow-hidden">
      {/* Tekstur bintang geometris */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="testiStarMotif" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z" fill="none" stroke="#5C0A2E" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#testiStarMotif)" />
      </svg>

      {/* Glow lembut */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#5C0A2E] rounded-full blur-[140px] opacity-[0.05] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <span className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Testimoni Jemaah
            </span>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>
          <h2 className={`${marcellus.className} text-[#1B120B] text-3xl md:text-4xl`}>
            Cerita Perjalanan & Kepuasan Jemaah
          </h2>
        </div>

        {/* ==================== STACKED CARDS CONTAINER ==================== */}
        <div className="relative h-[650px] md:h-[600px] w-full max-w-[420px] sm:max-w-md mx-auto flex justify-center items-center">
          {testimonials.map((item, index) => {
            const isDark = item.theme === "dark";
            const isOpen = expanded.includes(item.id);
            
            // Logika Posisi Tumpukan
            const offset = (index - activeIndex + testimonials.length) % testimonials.length;
            const isFront = offset === 0;
            
            // Konfigurasi visual berdasarkan offset (posisi)
            let zIndex = testimonials.length - offset;
            let transform = "translateY(0) scale(1) rotate(0deg)";
            let opacity = 1;

            if (offset === 1) {
              // Kartu kedua (di belakang)
              transform = "translateY(15px) scale(0.95) rotate(3deg)";
              opacity = 0.8;
            } else if (offset === 2) {
              // Kartu ketiga (paling belakang)
              transform = "translateY(30px) scale(0.90) rotate(-3deg)";
              opacity = 0.5;
            } else if (offset > 2) {
              // Kartu keempat dst. (sembunyikan)
              opacity = 0;
            }

            return (
              <div
                key={item.id}
                onClick={isFront ? undefined : nextCard} // Jika di depan, tidak apa-apa. Jika di belakang, klik untuk memajukan
                className={`absolute inset-0 mx-auto w-full transition-all duration-500 ease-in-out cursor-pointer rounded-[2rem] overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-[#1B120B] via-[#2E0E1B] to-[#5C0A2E] border border-[#C6952F]/25 shadow-2xl shadow-[#5C0A2E]/30"
                    : "bg-white border border-[#C6952F]/15 shadow-2xl shadow-black/5"
                } ${isFront ? "shadow-2xl z-30" : ""}`}
                style={{
                  zIndex: isFront ? 50 : zIndex, // Paksa kartu depan z-index tinggi
                  transform,
                  opacity,
                  pointerEvents: opacity === 0 ? "none" : "auto", // Jangan bisa diklik jika invisible
                }}
              >
                {/* Foto besar — arch frame */}
                <div className="relative p-4 pb-0">
                  {item.badge && isFront && (
                    <span className="absolute top-7 right-7 z-20 bg-[#C6952F] text-[#1B120B] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md animate-fade-in">
                      {item.badge}
                    </span>
                  )}
                  <div className={`relative w-full aspect-[4/3] rounded-t-[2rem] rounded-b-2xl overflow-hidden border-[3px] transition-colors ${
                      isDark ? "border-[#C6952F]/50" : "border-[#C6952F]/30"
                    }`}
                  >
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      // FIX 3: Tambahin properti sizes biar warning terminal Next.js ilang dan nambah performance gambar
                      sizes="(max-width: 768px) 100vw, 400px" 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B120B]/50 via-transparent to-transparent" />
                    <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#5C0A2E] ring-2 ring-[#F6EFDF]/80 flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-[#C6952F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4V3h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-4V3h10z" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Konten teks */}
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <StarRow count={item.rating} />
                  </div>

                  <p className={`text-sm leading-relaxed italic transition-all duration-300 ${isOpen && isFront ? "" : "line-clamp-3"} ${
                      isDark ? "text-white/75" : "text-[#5c5142]"
                    }`}
                  >
                    &ldquo;{item.comment}&rdquo;
                  </p>
                  
                  {item.comment.length > 120 && isFront && (
                    <button
                      onClick={(e) => toggleExpand(e, item.id)}
                      className={`mt-2 w-max text-xs font-semibold transition-colors ${
                        isDark ? "text-[#C6952F] hover:text-[#F6EFDF]" : "text-[#5C0A2E] hover:text-[#C6952F]"
                      }`}
                    >
                      {isOpen ? "Sembunyikan" : "Baca selengkapnya"}
                    </button>
                  )}

                  <div className={`border-t border-dashed pt-4 mt-4 ${
                      isDark ? "border-white/15" : "border-[#C6952F]/25"
                    }`}
                  >
                    <h4 className={`font-bold text-sm truncate ${isDark ? "text-white" : "text-[#1B120B]"}`}>
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-xs text-[#C6952F] font-semibold truncate">{item.package}</p>
                      <span className={`text-xs shrink-0 ${isDark ? "text-[#E4D6B8]/50" : "text-[#8a7a5f]"}`}>
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Indikator klik untuk kartu di belakang */}
                {!isFront && (
                    <div className="absolute inset-0 z-40 bg-white/0 hover:bg-white/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 hover:opacity-100 bg-[#1B120B]/80 text-white text-xs font-bold px-4 py-2 rounded-full transition-opacity shadow-lg backdrop-blur-sm">
                            Lihat Testimoni
                        </span>
                    </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Kontrol navigasi */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-5 mt-6 relative z-50">
            <button
              onClick={nextCard}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#C6952F]/30 bg-white shadow-sm hover:bg-[#5C0A2E] hover:border-[#5C0A2E] transition-all"
            >
              <span className="text-xs font-bold text-[#5C0A2E] group-hover:text-white transition-colors">Testimoni Selanjutnya</span>
              <svg className="w-4 h-4 text-[#C6952F] group-hover:text-[#F6EFDF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}