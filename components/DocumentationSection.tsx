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
type DocumentationType = {
  id: number;
  title: string;
  category: string;
  date: string;
  description?: string;
  image_url: string;
};

export default function DocumentationSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [documentations, setDocumentations] = useState<DocumentationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari API Laravel
  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        // FIX 1: Pastikan endpoint nembak ke /api/
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galleries`);
        const result = await response.json();

        if (result.success && result.data) {
          // FIX 2: Mapping data untuk memastikan URL gambar valid dan absolute
          const formattedData = result.data.map((item: any) => {
            const rawImgUrl = item.image_url || item.image || "";
            const finalImageUrl = rawImgUrl
              ? (rawImgUrl.startsWith('http') ? rawImgUrl : `${process.env.NEXT_PUBLIC_API_URL}${rawImgUrl.startsWith('/') ? '' : '/'}${rawImgUrl}`)
              : "https://images.unsplash.com/photo-1565552643982-278783c462b5?q=80&w=800"; // Fallback aman

            return {
              id: item.id,
              title: item.title || "Dokumentasi Perjalanan",
              category: item.category || "Umum",
              date: item.date || new Date().toISOString().split('T')[0],
              description: item.description || "",
              image_url: finalImageUrl,
            };
          });

          setDocumentations(formattedData);
        }
      } catch (error) {
        console.error("Gagal mengambil data dokumentasi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentations();
  }, []);

  // Bikin filter dinamis berdasarkan kategori yang beneran ada di database
  const filters = ["Semua", ...Array.from(new Set(documentations.map((doc) => doc.category)))];

  const filteredDocs =
    activeFilter === "Semua"
      ? documentations
      : documentations.filter((doc) => doc.category === activeFilter);

  // Helper untuk format tanggal dari "2026-08-12" menjadi "Agustus 2026"
  const formatBulanTahun = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    } catch (e) {
      return dateString; // Fallback kalau format tanggal berantakan
    }
  };

  // Jika data kosong dan tidak loading, section tidak perlu dirender
  if (!isLoading && documentations.length === 0) return null;

  return (
    <section
      id="dokumentasi"
      className="w-full py-28 md:py-36 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #F6EFDF 0%, #1B120B 8%, #2E0E1B 25%, #5C0A2E 50%, #2E0E1B 75%, #1B120B 92%, #F6EFDF 100%)",
      }}
    >
      {/* Tekstur bintang geometris */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="docStarMotif"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z"
              fill="none"
              stroke="#C6952F"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#docStarMotif)" />
      </svg>

      {/* Glow lembut */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[#C6952F] rounded-full blur-[130px] opacity-[0.12] -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-[#C6952F] rounded-full blur-[130px] opacity-[0.08] translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <span className="text-[#C6952F] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Galeri Perjalanan
            </span>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>
          <h2
            className={`${marcellus.className} text-[#F6EFDF] text-3xl md:text-4xl lg:text-5xl mb-8`}
          >
            Dokumentasi Jemaah
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${
                  activeFilter === filter
                    ? "bg-[#C6952F] text-[#1B120B] shadow-[0_8px_24px_rgba(198,149,47,0.35)] scale-105"
                    : "bg-white/5 text-[#E4D6B8]/70 border border-[#C6952F]/25 hover:bg-white/10 hover:text-[#F6EFDF] hover:border-[#C6952F]/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px] transition-all duration-500 relative">
          
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-[#C6952F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <>
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-[#2E0E1B] shadow-sm hover:shadow-2xl hover:shadow-[#C6952F]/10 ring-1 ring-[#C6952F]/20 transition-all duration-500 cursor-pointer animate-fade-in-up"
                >
                  <Image
                    src={doc.image_url}
                    alt={doc.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B120B]/90 via-[#1B120B]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 left-4 bg-[#F6EFDF]/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <svg
                      className="w-3.5 h-3.5 text-[#5C0A2E]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-xs font-bold text-[#1B120B] capitalize">
                      {doc.category}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#C6952F] text-xs font-bold mb-1">
                      {formatBulanTahun(doc.date)}
                    </p>
                    <h4 className="text-[#F6EFDF] text-lg font-bold leading-snug">
                      {doc.title}
                    </h4>
                  </div>
                </div>
              ))}

              {filteredDocs.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-[#E4D6B8]/50">
                  <svg
                    className="w-12 h-12 mb-3 opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-semibold">
                    Dokumentasi untuk kategori ini belum tersedia.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}