"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Helper untuk format Rupiah di Input
function formatRupiah(digitsOnly: string) {
  const clean = digitsOnly.replace(/\D/g, "");
  if (!clean) return "";
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Type definisi menyesuaikan dengan output API Laravel
type PackageType = {
  id: string | number;
  title: string;
  image: string;
  price: string;
  priceValue: number;
  airline: string;
  month: string;
  duration: string;
};

export default function PackageListSection() {
  const [rawPackages, setRawPackages] = useState<PackageType[]>([]);
  const [results, setResults] = useState<PackageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==================== FETCH DATA API ====================
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`);
        const result = await response.json();

        if (result.success && result.data) {
          // Mapping data dari DB agar sesuai format yang dibutuhkan UI & Filter
          const formattedData = result.data.map((item: any) => {
            // Ambil angka murni dari string harga (misal "Rp 27.900.000" jadi 27900000)
            const rawPrice = item.startingPrice || item.price || "0";
            const priceValue = parseInt(rawPrice.toString().replace(/\D/g, ""), 10) || 0;

            return {
              id: item.id,
              title: item.title || item.name,
              image: item.image_url || "https://images.unsplash.com/photo-1565552643982-278783c462b5?q=80&w=800",
              price: rawPrice,
              priceValue: priceValue,
              airline: item.airline || "Umum", // Fallback kalau field belum ada di DB
              month: item.month || "Kapan Saja",
              duration: item.duration || "-",
            };
          });

          setRawPackages(formattedData);
          setResults(formattedData);
        }
      } catch (error) {
        console.error("Gagal mengambil data paket:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // ==================== FILTER LOGIC ====================
  const airlineOptions = useMemo(
    () => Array.from(new Set(rawPackages.map((p) => p.airline))),
    [rawPackages]
  );
  const monthOptions = useMemo(
    () => Array.from(new Set(rawPackages.map((p) => p.month))),
    [rawPackages]
  );

  const [airline, setAirline] = useState("all");
  const [month, setMonth] = useState("all");
  const [minPrice, setMinPrice] = useState("23.900.000"); // Default display
  const [maxPrice, setMaxPrice] = useState("50.000.000");
  const [sortBy, setSortBy] = useState("relevan");

  const applyFilters = () => {
    const min = parseInt(minPrice.replace(/\D/g, ""), 10) || 0;
    const max = parseInt(maxPrice.replace(/\D/g, ""), 10) || Infinity;

    let filtered = rawPackages.filter((pkg) => {
      const matchAirline = airline === "all" || pkg.airline === airline;
      const matchMonth = month === "all" || pkg.month === month;
      const matchPrice = pkg.priceValue >= min && pkg.priceValue <= max;
      return matchAirline && matchMonth && matchPrice;
    });

    if (sortBy === "termurah") {
      filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === "termahal") {
      filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    }

    setResults(filtered);
  };

  const resetFilters = () => {
    setAirline("all");
    setMonth("all");
    setMinPrice("23.900.000");
    setMaxPrice("50.000.000");
    setSortBy("relevan");
    setResults(rawPackages);
  };

  // ==================== CAROUSEL ====================
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Reset ke slide pertama tiap kali daftar hasil berubah
  useEffect(() => {
    setActiveIndex(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [results]);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || results.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % results.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, results.length]);

  // Sync scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const card = track.children[activeIndex] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % results.length);

  // ==================== LOADING STATE ====================
  if (isLoading) {
    return (
      <section id="paket" className="w-full py-16 md:py-24 bg-[#F6EFDF] flex justify-center items-center min-h-[500px]">
        <svg className="animate-spin h-10 w-10 text-[#5C0A2E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </section>
    );
  }

  return (
    <section id="paket" className="w-full py-16 md:py-24 bg-[#F6EFDF] relative overflow-hidden">
      {/* Tekstur bintang geometris */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="paketStarMotif" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z" fill="none" stroke="#5C0A2E" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paketStarMotif)" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className={`${marcellus.className} text-3xl md:text-4xl text-[#1B120B] mb-2`}>
            Temukan <span className="text-[#5C0A2E]">Paket Perjalanan</span> Anda
          </h2>
          <p className="text-[#5c5142]">
            Pilih jadwal dan fasilitas yang paling sesuai dengan kebutuhan ibadah Anda.
          </p>
        </div>

        {/* BAGIAN 1: FILTER BAR */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#C6952F]/15 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Filter Maskapai */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#5C0A2E] tracking-widest uppercase">Maskapai</label>
              <div className="relative">
                <select
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full appearance-none bg-[#F6EFDF]/60 border border-[#C6952F]/20 text-[#1B120B] text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#C6952F] focus:ring-1 focus:ring-[#C6952F] transition-all cursor-pointer"
                >
                  <option value="all">Semua maskapai</option>
                  {airlineOptions.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C0A2E]/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Filter Bulan */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#5C0A2E] tracking-widest uppercase">Bulan Keberangkatan</label>
              <div className="relative">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full appearance-none bg-[#F6EFDF]/60 border border-[#C6952F]/20 text-[#1B120B] text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#C6952F] focus:ring-1 focus:ring-[#C6952F] transition-all cursor-pointer"
                >
                  <option value="all">Semua bulan</option>
                  {monthOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C0A2E]/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Filter Harga */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#5C0A2E] tracking-widest uppercase">Cari Berdasarkan Harga</label>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C0A2E]/50 text-sm font-semibold">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(formatRupiah(e.target.value))}
                    className="w-full bg-[#F6EFDF]/60 border border-[#C6952F]/20 text-[#1B120B] text-sm rounded-xl pl-9 pr-3 py-3.5 focus:outline-none focus:border-[#C6952F] focus:ring-1 focus:ring-[#C6952F] transition-all"
                  />
                </div>
                <span className="text-xs font-semibold text-[#5C0A2E]/40">s/d</span>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C0A2E]/50 text-sm font-semibold">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(formatRupiah(e.target.value))}
                    className="w-full bg-[#F6EFDF]/60 border border-[#C6952F]/20 text-[#1B120B] text-sm rounded-xl pl-9 pr-3 py-3.5 focus:outline-none focus:border-[#C6952F] focus:ring-1 focus:ring-[#C6952F] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Filter Urutkan & Aksi */}
            <div className="flex items-end gap-3">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[10px] font-bold text-[#5C0A2E] tracking-widest uppercase">Urutkan</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-[#F6EFDF]/60 border border-[#C6952F]/20 text-[#1B120B] text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#C6952F] focus:ring-1 focus:ring-[#C6952F] transition-all cursor-pointer"
                  >
                    <option value="relevan">Paling relevan</option>
                    <option value="termurah">Harga terendah</option>
                    <option value="termahal">Harga tertinggi</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C0A2E]/40">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <button
                onClick={applyFilters}
                className="bg-[#1B120B] hover:bg-[#5C0A2E] text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-colors shrink-0"
              >
                Terapkan
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-dashed border-[#C6952F]/25">
            <p className="text-xs md:text-sm text-[#5c5142] font-medium">
              <span className="font-bold text-[#5C0A2E]">{results.length}</span> paket ditemukan
            </p>
            <button onClick={resetFilters} className="text-xs md:text-sm font-semibold text-[#5C0A2E] hover:text-[#C6952F] transition-colors">
              Reset Filter
            </button>
          </div>
        </div>

        {/* BAGIAN 2: CAROUSEL KARTU PAKET */}
        {results.length > 0 ? (
          <>
            <div
              ref={trackRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {results.map((pkg) => (
                <div key={pkg.id} className="flex-none w-[86%] sm:w-[48%] lg:w-[32%] snap-start bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-[#C6952F]/12 hover:border-[#C6952F]/35 transition-all duration-300 flex flex-col group cursor-pointer">
                  
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F6EFDF]">
                    <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B120B]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h4 className="text-lg md:text-xl font-bold text-[#1B120B] mb-5 leading-snug group-hover:text-[#5C0A2E] transition-colors line-clamp-2">
                      {pkg.title}
                    </h4>

                    <div className="bg-[#F6EFDF]/40 rounded-2xl p-5 mb-6 border border-[#C6952F]/15">
                      <span className="text-[10px] font-bold text-[#5C0A2E] tracking-widest uppercase">Harga Mulai Dari</span>
                      <div className="text-2xl font-extrabold text-[#C6952F] mt-1 mb-2 drop-shadow-sm">{pkg.price}</div>
                      <p className="text-xs text-[#5c5142] leading-relaxed">
                        Harga estimasi terendah pada grup paket ini. Pilih salah satu tanggal untuk melihat detail lengkap.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      <span className="bg-[#F6EFDF] border border-[#C6952F]/15 text-[#5C0A2E] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#C6952F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {pkg.airline}
                      </span>
                      <span className="bg-[#5C0A2E]/5 border border-[#5C0A2E]/10 text-[#5C0A2E] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#C6952F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {pkg.duration}
                      </span>
                    </div>

                    <div className="bg-[#F6EFDF] rounded-xl p-4 text-center text-xs font-semibold text-[#5c5142] group-hover:bg-[#5C0A2E] group-hover:text-[#F6EFDF] transition-colors duration-300">
                      Pilih opsi di bawah untuk melihat detail paket.
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Kontrol carousel */}
            {results.length > 1 && (
              <div className="flex items-center justify-center gap-5 mt-8">
                <button onClick={goPrev} aria-label="Paket sebelumnya" className="w-10 h-10 shrink-0 rounded-full border border-[#C6952F]/30 bg-white flex items-center justify-center text-[#5C0A2E] hover:bg-[#5C0A2E] hover:text-[#F6EFDF] hover:border-[#5C0A2E] transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex items-center gap-2">
                  {results.map((pkg, i) => (
                    <button key={pkg.id} onClick={() => setActiveIndex(i)} aria-label={`Ke paket ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-[#C6952F]" : "w-2 bg-[#5C0A2E]/20 hover:bg-[#5C0A2E]/40"}`} />
                  ))}
                </div>
                <button onClick={goNext} aria-label="Paket berikutnya" className="w-10 h-10 shrink-0 rounded-full border border-[#C6952F]/30 bg-white flex items-center justify-center text-[#5C0A2E] hover:bg-[#5C0A2E] hover:text-[#F6EFDF] hover:border-[#5C0A2E] transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-[2rem] border border-dashed border-[#C6952F]/30">
            <svg className="w-12 h-12 mb-4 text-[#5C0A2E]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-[#1B120B] font-semibold mb-1">Belum ada paket yang cocok</p>
            <p className="text-sm text-[#5c5142] mb-6">Coba ubah rentang harga atau bulan keberangkatannya.</p>
            <button onClick={resetFilters} className="text-sm font-semibold text-[#5C0A2E] hover:text-[#C6952F] transition-colors underline underline-offset-4">
              Reset semua filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}