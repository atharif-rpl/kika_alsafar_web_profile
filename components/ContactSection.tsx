"use client";

import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full py-24 md:py-32 bg-[#F6EFDF] relative overflow-hidden border-t border-[#C6952F]/20"
    >
      {/* Tekstur bintang geometris, konsisten dengan section lain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="contactStarMotif"
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
        <rect width="100%" height="100%" fill="url(#contactStarMotif)" />
      </svg>

      {/* Glow maroon/gold — disamakan dengan section lain (bukan putih) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5C0A2E] rounded-full blur-[140px] opacity-[0.06] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C6952F] rounded-full blur-[150px] opacity-[0.08] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* Header Section (Centered) */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <h3 className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Hubungi Kami
            </h3>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>

          <h2
            className={`${marcellus.className} text-3xl md:text-4xl lg:text-5xl text-[#1B120B] mb-6 leading-[1.25]`}
          >
            Mulai Perjalanan Anda Menuju{" "}
            <span className="text-[#5C0A2E] relative inline-block">
              Baitullah
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

          <p className="text-[#4a3f33] text-base md:text-lg leading-relaxed mt-4">
            Tim konsultan Kika Al-Safar siap melayani dan membantu
            merencanakan perjalanan ibadah Anda. Jangan ragu untuk
            menghubungi kami melalui kontak di bawah ini.
          </p>
        </div>

        {/* Grid Informasi Kontak (3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Alamat Kantor */}
          <div className="flex flex-col items-center text-center p-8 md:p-10 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-[#C6952F]/15 hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:border-[#5C0A2E]/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#F6EFDF] rounded-full flex items-center justify-center text-[#5C0A2E] mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-br group-hover:from-[#1B120B] group-hover:via-[#2E0E1B] group-hover:to-[#5C0A2E] group-hover:text-[#C6952F] transition-all duration-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h4 className="text-lg md:text-xl font-bold text-[#1B120B] mb-4 uppercase tracking-wider">
              Alamat Kantor
            </h4>
            <p className="text-[#5c5142] leading-relaxed font-medium">
              Jln. Artzimar III no. A10,
              <br />
              Tegal Gundil, Kota Bogor,
              <br />
              Jawa Barat
            </p>
            <div className="w-8 h-1 bg-[#EDE3CB] rounded-full mt-6 group-hover:bg-[#C6952F] group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Card 2: Informasi Kontak (Telepon & Email) */}
          <div className="flex flex-col items-center text-center p-8 md:p-10 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-[#C6952F]/15 hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:border-[#5C0A2E]/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#F6EFDF] rounded-full flex items-center justify-center text-[#5C0A2E] mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-br group-hover:from-[#1B120B] group-hover:via-[#2E0E1B] group-hover:to-[#5C0A2E] group-hover:text-[#C6952F] transition-all duration-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </div>
            <h4 className="text-lg md:text-xl font-bold text-[#1B120B] mb-4 uppercase tracking-wider">
              Informasi Kontak
            </h4>
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="tel:08212600250"
                className="flex flex-col items-center py-2 px-4 rounded-xl hover:bg-[#F6EFDF]/50 transition-colors"
              >
                <span className="text-xs font-bold text-[#C6952F] tracking-widest uppercase mb-1">
                  Telepon
                </span>
                <span className="text-[#5C0A2E] font-extrabold text-lg">
                  0821-2600-250
                </span>
              </Link>
              <Link
                href="mailto:kikaalsafar@gmail.com"
                className="flex flex-col items-center py-2 px-4 rounded-xl hover:bg-[#F6EFDF]/50 transition-colors"
              >
                <span className="text-xs font-bold text-[#C6952F] tracking-widest uppercase mb-1">
                  Email
                </span>
                <span className="text-[#1B120B] font-bold">
                  kikaalsafar@gmail.com
                </span>
              </Link>
            </div>
            <div className="w-8 h-1 bg-[#EDE3CB] rounded-full mt-6 group-hover:bg-[#C6952F] group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Card 3: Social Media (Follow Us) */}
          <div className="flex flex-col items-center text-center p-8 md:p-10 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-sm border border-[#C6952F]/15 hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:border-[#5C0A2E]/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#F6EFDF] rounded-full flex items-center justify-center text-[#5C0A2E] mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-to-br group-hover:from-[#1B120B] group-hover:via-[#2E0E1B] group-hover:to-[#5C0A2E] group-hover:text-[#C6952F] transition-all duration-300">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <h4 className="text-lg md:text-xl font-bold text-[#1B120B] mb-4 uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="https://instagram.com/kikaalsafar_travel"
                target="_blank"
                className="flex flex-col items-center py-2 px-4 rounded-xl hover:bg-[#F6EFDF]/50 transition-colors"
              >
                <span className="text-xs font-bold text-[#C6952F] tracking-widest uppercase mb-1">
                  Instagram
                </span>
                <span className="text-[#1B120B] font-bold">
                  @kikaalsafar_travel
                </span>
              </Link>
              <Link
                href="https://tiktok.com/@kikaalsafartravel"
                target="_blank"
                className="flex flex-col items-center py-2 px-4 rounded-xl hover:bg-[#F6EFDF]/50 transition-colors"
              >
                <span className="text-xs font-bold text-[#C6952F] tracking-widest uppercase mb-1">
                  TikTok
                </span>
                <span className="text-[#1B120B] font-bold">
                  @kikaalsafartravel
                </span>
              </Link>
            </div>
            <div className="w-8 h-1 bg-[#EDE3CB] rounded-full mt-6 group-hover:bg-[#C6952F] group-hover:w-16 transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}