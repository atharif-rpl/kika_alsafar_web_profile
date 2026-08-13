"use client";

import { useState } from "react";
import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Apa saja yang sudah termasuk dalam biaya paket?",
      answer:
        "Biaya paket sudah termasuk tiket pesawat PP (kelas ekonomi), visa umrah, akomodasi hotel sesuai pilihan paket, makan 3x sehari (full board), transportasi bus ber-AC selama di Arab Saudi, muthawif/pembimbing, air zamzam 5 liter, dan perlengkapan ibadah dasar.",
    },
    {
      question: "Bagaimana sistem pendaftaran dan pembayarannya?",
      answer:
        "Pendaftaran dapat dilakukan dengan mengisi formulir dan menyetorkan Down Payment (DP) sebesar Rp 5.000.000. Pelunasan wajib dilakukan maksimal 30 hari sebelum jadwal keberangkatan.",
    },
    {
      question: "Apakah Kika Alsafar terdaftar resmi di Kemenag?",
      answer:
        "Tentu. Kika Alsafar adalah Penyelenggara Perjalanan Ibadah Umrah (PPIU) yang resmi terdaftar di Kementerian Agama Republik Indonesia. Legalitas kami dapat dicek langsung melalui portal Kemenag.",
    },
    {
      question: "Bisakah saya mengajukan upgrade kamar hotel (Double/Triple)?",
      answer:
        "Sangat bisa. Harga standar kami menggunakan kamar Quad (isi 4 orang). Jika Anda menginginkan kamar Triple (isi 3) atau Double (isi 2), Anda bisa mengajukan upgrade dengan penyesuaian biaya tambahan.",
    },
    {
      question: "Apakah ada bimbingan manasik sebelum berangkat?",
      answer:
        "Ya, kami menyediakan bimbingan manasik umrah secara komprehensif 1 hingga 2 minggu sebelum keberangkatan. Manasik mencakup teori, praktik ibadah, dan panduan perjalanan.",
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
      {/* Tekstur bintang geometris, konsisten dengan section lain */}
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
            {faqs.map((faq, index) => {
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
                      <p className="p-6 pt-0 text-[#5c5142] leading-relaxed text-sm md:text-base border-t border-dashed border-[#C6952F]/30 mt-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}