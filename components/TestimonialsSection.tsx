"use client";

import { useState, useEffect, useRef } from "react";
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

type MappedTestimonial = {
  id: number;
  name: string;
  photo: string;
  package: string;
  comment: string;
  rating: number;
  date: string;
};

const StarRow = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 md:w-5 md:h-5 ${i < count ? "text-[#C6952F]" : "text-gray-200"}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<MappedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`);
        const result = await response.json();

        if (result.success && result.data) {
          const activeTestis = result.data.filter((t: TestimonialApiType) => t.is_active);
          
          const formatted = activeTestis.map((item: TestimonialApiType) => {
            const date = new Date(item.created_at);
            return {
              id: item.id,
              name: item.name,
              photo: item.image_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
              package: item.package_name || "Layanan Kika Alsafar",
              comment: item.review,
              rating: item.rating,
              date: date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
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

  // 2. Auto-play Logic
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Ganti tiap 5 detik
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  // 3. Scroll Into View Logic (Hanya container foto yang scroll, bukan halamannya)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const activeElement = container.children[activeIndex] as HTMLElement;
    if (activeElement) {
      // Menggunakan nearest mencegah layar browser ikut ke-scroll secara paksa
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest", 
        inline: "nearest"
      });
    }
  }, [activeIndex]);

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

  if (!isLoading && testimonials.length === 0) return null;

  const activeTesti = testimonials[activeIndex];

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6EFDF] relative overflow-hidden">
      {/* Background Ornaments */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="testiStarMotifNew" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z" fill="none" stroke="#5C0A2E" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#testiStarMotifNew)" />
      </svg>
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#C6952F] rounded-full blur-[140px] opacity-[0.08] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <span className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Testimoni Jemaah
            </span>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>
          <h2 className={`${marcellus.className} text-[#1B120B] text-3xl md:text-4xl lg:text-5xl leading-tight`}>
            Cerita & Kepuasan<br className="hidden md:block" /> Jemaah Kami
          </h2>
        </div>

        {/* Main Content: Split Layout */}
        <div 
          className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-auto lg:h-[480px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          
          {/* KIRI (Mobile: Atas): List Thumbnail Foto */}
          <div 
            ref={scrollContainerRef}
            className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto w-full lg:w-48 shrink-0 pb-4 lg:pb-0 lg:pr-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x lg:snap-y snap-mandatory"
          >
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-24 h-24 lg:w-full lg:h-36 shrink-0 rounded-2xl overflow-hidden transition-all duration-500 snap-start
                    ${isActive 
                      ? "border-[3px] border-[#C6952F] scale-100 opacity-100 shadow-lg" 
                      : "border-transparent scale-95 opacity-50 grayscale hover:grayscale-0 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={item.photo}
                    alt={`Foto ${item.name}`}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradien halus */}
                  <div className={`absolute inset-0 transition-colors ${isActive ? 'bg-transparent' : 'bg-[#1B120B]/20'}`} />
                </button>
              );
            })}
          </div>

          {/* KANAN (Mobile: Bawah): Teks & Detail Testimoni (Sesuai Referensi) */}
          <div className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(27,18,11,0.05)] border border-[#C6952F]/10 flex flex-col justify-center min-h-[350px]">
            
            {/* Dekorasi Quote Raksasa di Background */}
            <span className={`${marcellus.className} absolute top-4 right-8 text-[200px] leading-none text-[#F6EFDF] opacity-60 select-none pointer-events-none`}>
              ”
            </span>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Teks Ulasan */}
              <div className="mb-10">
                <p 
                  key={`review-${activeTesti.id}`} // Key untuk re-render animasi saat ganti
                  className="text-[#1B120B] text-xl md:text-2xl lg:text-[1.75rem] leading-relaxed md:leading-[1.6] animate-fade-in font-medium"
                >
                  {activeTesti.comment}
                </p>
              </div>

              {/* Detail Profil & Rating */}
              <div 
                key={`detail-${activeTesti.id}`} 
                className="mt-auto animate-fade-in-up"
              >
                {/* Garis pemisah putus-putus */}
                <div className="w-full h-px border-b border-dashed border-gray-200 mb-6" />
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <h4 className="font-bold text-[#1B120B] text-lg mb-1">{activeTesti.name}</h4>
                    <p className="text-[#5c5142] text-sm">{activeTesti.package}</p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-2">
                    <StarRow count={activeTesti.rating} />
                    <span className="text-xs font-semibold text-gray-400">{activeTesti.date}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}