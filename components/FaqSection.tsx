"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Tipe data untuk FAQ dari API
type ApiFaqType = {
  id: number;
  question: string;
  answer: string;
  status: "Publish" | "Draft";
};

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [dbFaqs, setDbFaqs] = useState<ApiFaqType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch FAQ dinamis dari Laravel
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`);
        const result = await response.json();
        
        if (result.success) {
          // Hanya ambil FAQ yang statusnya "Publish"
          const publishedFaqs = result.data.filter((faq: ApiFaqType) => faq.status === "Publish");
          setDbFaqs(publishedFaqs);
        }
      } catch (error) {
        console.error("Gagal mengambil data FAQ:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Item "Harga Termasuk" — checklist grid
  const includedItems = [
    "Perlengkapan Umroh",
    "Umroh 2X",
    "Tiket Pesawat (Pulang - Pergi)",
    "Manasik & Handling",
    "Tasreh Raudhah",
    "Ziarah Makkah & Madinah",
    "Free Ayam Albaik",
    "Hotel Dekat Masjid",
    "Makan 3x Sehari",
    "Visa Umroh",
    "Siskopatuh",
    "Air Zam Zam 5L",
    "Asuransi di Arab Saudi",
    "Tour Leader & Muthowif",
  ];

  const HargaTermasukContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {includedItems.map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 text-sm text-[#1B120B]">
          <span className="w-5 h-5 rounded-full bg-[#5C0A2E]/10 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-[#5C0A2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {item}
        </div>
      ))}
    </div>
  );

  // Item "Syarat & Ketentuan"
  type TermItem = string | { text: string; subItems: string[] };
  const termsSections: { title: string; items: TermItem[] }[] = [
    {
      title: "Syarat Pendaftaran",
      items: [
        "Passport yang masih berlaku",
        "Fotocopy buku nikah/ijazah",
        "Fotocopy akta lahir (khusus anak)",
        "Fotocopy KTP dan KK",
        "Mengisi dan menandatangani Formulir pendaftaran",
        "Mengisi dan menandatangani Formulir Term and Condition",
      ],
    },
    {
      title: "Tata Cara Pembayaran",
      items: [
        {
          text: "Pembayaran dilakukan dengan 3 termin",
          subItems: [
            "Termin 1: Booking fee Rp 5.000.000",
            "Termin 2: 14 hari setelah DP, pembayaran 50% dari total biaya umroh",
            "Termin 3: H-40 pelunasan biaya umroh",
          ],
        },
        "Pembayaran dilakukan melalui transfer ke rekening resmi perusahaan",
        "Kirimkan bukti transfer ke admin travel setelah pembayaran",
        "Admin akan memberikan kwitansi bukti pembayaran",
      ],
    },
    {
      title: "Ketentuan Pembatalan",
      items: [
        "Pembatalan ≥ H-60 sebelum keberangkatan dikenakan biaya Rp 5.000.000",
        "Pembatalan ≥ H-40 sebelum keberangkatan dikenakan biaya 75% dari harga paket",
        "Pembatalan ≥ H-30 sebelum keberangkatan dikenakan biaya 100%",
      ],
    },
    {
      title: "Harga Belum Termasuk",
      items: [
        "Vaksin meningitis dan polio",
        "Pembuatan paspor baru atau perpanjangan",
        "Pengeluaran pribadi (laundry, telepon, belanja oleh-oleh)",
        "Kelebihan bagasi di luar ketentuan maskapai",
      ],
    },
  ];

  const SyaratKetentuanContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {termsSections.map((section, i) => (
        <div key={i}>
          <div className="inline-flex items-center gap-2 bg-[#5C0A2E]/8 rounded-full pl-1 pr-4 py-1 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#5C0A2E] flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6952F]" />
            </span>
            <span className="text-xs font-bold text-[#5C0A2E] uppercase tracking-wide">
              {section.title}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {section.items.map((item, idx) => {
              if (typeof item === "string") {
                return (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#5c5142] leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-[#C6952F] mt-2 shrink-0" />
                    {item}
                  </li>
                );
              }
              return (
                <li key={idx} className="text-sm text-[#5c5142] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C6952F] mt-2 shrink-0" />
                    {item.text}
                  </div>
                  <ul className="flex flex-col gap-1.5 mt-1.5 ml-3 pl-3 border-l border-dashed border-[#C6952F]/30">
                    {item.subItems.map((sub, subIdx) => (
                      <li key={subIdx} className="text-xs text-[#5c5142]/90">
                        {sub}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  // FIX TYPESCRIPT: Tambahin tipe data explicitly biar dia tau content/answer opsional
  const combinedFaqs: { question: string; answer?: string; content?: React.ReactNode }[] = [
    ...dbFaqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
    // Kita simpan 2 FAQ khusus ini di bawah biar UI keren lu ga ilang
    {
      question: "Apa saja yang sudah termasuk dalam harga paket secara rinci?",
      content: <HargaTermasukContent />,
    },
    {
      question: "Apa saja syarat pendaftaran dan ketentuan yang berlaku?",
      content: <SyaratKetentuanContent />,
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full py-24 bg-[#F6EFDF] relative overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="faqStarMotif"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z"
              fill="none"
              stroke="#5C0A2E"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#faqStarMotif)" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* KOLOM KIRI: Judul & Info CS */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
              <h3 className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
                Informasi Umum
              </h3>
            </div>
            <h2
              className={`${marcellus.className} text-3xl md:text-4xl lg:text-5xl text-[#1B120B] mb-6 leading-[1.25]`}
            >
              Pertanyaan Seputar{" "}
              <span className="text-[#5C0A2E] relative inline-block">
                Perjalanan
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q 50 -4 98 8"
                    stroke="#C6952F"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.8"
                  />
                  <circle cx="50" cy="1.5" r="1.6" fill="#C6952F" />
                </svg>
              </span>
            </h2>
            <p className="text-[#4a3f33] text-base md:text-lg mb-8 leading-relaxed">
              Temukan jawaban atas pertanyaan yang paling sering diajukan oleh
              calon jemaah. Jika Anda memiliki pertanyaan lain yang lebih
              spesifik, jangan ragu untuk menghubungi tim kami.
            </p>

            <div className="p-6 bg-white rounded-3xl border border-[#C6952F]/20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 bg-[#F6EFDF] rounded-full flex items-center justify-center text-[#5C0A2E] shadow-sm shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#1B120B] mb-1">
                  Masih Butuh Bantuan?
                </h4>
                <Link
                  href="#contact"
                  className="text-sm font-semibold text-[#5C0A2E] hover:text-[#C6952F] transition-colors flex items-center gap-1"
                >
                  Hubungi Customer Service
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Accordion FAQ List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Tampilan Loading */}
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <svg className="animate-spin h-8 w-8 text-[#C6952F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : combinedFaqs.length === 0 ? (
              <div className="bg-white/60 rounded-3xl p-8 text-center text-gray-500">
                Belum ada pertanyaan yang ditambahkan.
              </div>
            ) : (
              combinedFaqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={`border transition-colors duration-300 rounded-3xl overflow-hidden ${
                      isOpen
                        ? "border-[#5C0A2E]/40 bg-white shadow-lg"
                        : "border-[#C6952F]/15 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span
                        className={`text-base md:text-lg font-bold pr-4 ${
                          isOpen ? "text-[#5C0A2E]" : "text-[#1B120B]"
                        }`}
                      >
                        {faq.question}
                      </span>

                      {/* Ikon Plus / Minus */}
                      <div
                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isOpen
                            ? "bg-[#5C0A2E] text-[#C6952F]"
                            : "bg-[#F6EFDF] text-[#5C0A2E]/60 shadow-sm"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Efek Buka Tutup */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-6 pt-0 text-[#5c5142] leading-relaxed text-sm md:text-base border-t border-dashed border-[#C6952F]/30 mt-2">
                          {faq.content ? faq.content : <p>{faq.answer}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}