"use client";

import Image from "next/image";
import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const contents = [
  "Profil & Legalitas Resmi",
  "Paket & Rincian Harga",
  "Galeri Perjalanan Jemaah",
  "Testimoni & Ulasan",
];

export default function CompanyProfileSection() {
  return (
    <section className="relative w-full py-20 z-0 -mt-2 md:py-28 bg-gradient-to-br from-[#1B120B] via-[#2E0E1B] to-[#5C0A2E] overflow-hidden">
      {/* Ornamen Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="cpStarMotif" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z" fill="none" stroke="#C6952F" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cpStarMotif)" />
      </svg>
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#C6952F] rounded-full blur-[150px] opacity-[0.1] pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* KIRI: Foto + mockup preview dokumen */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[380px]">
              <div className="relative aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden border-[3px] border-[#C6952F]/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
                <Image
                  src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800"
                  alt="Company Profile Kika Alsafar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B120B]/40 via-transparent to-transparent" />
              </div>

              {/* Mockup preview dokumen — nempel overlap, kasih kesan "nyata" */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 w-48 bg-[#F6EFDF] rounded-2xl shadow-2xl p-4 border border-[#C6952F]/20 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 shrink-0 rounded-md bg-gradient-to-br from-[#5C0A2E] to-[#1B120B] flex items-center justify-center shadow-inner">
                    <svg className="w-5 h-5 text-[#C6952F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#1B120B] text-xs font-bold truncate">
                      Company-Profile.pdf
                    </p>
                    <p className="text-[#8a7a5f] text-[10px]">24 Halaman · 3.5 MB</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-1 flex-1 rounded-full bg-[#C6952F]/25" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: Teks & Tombol Download */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
              <span className="text-[#C6952F] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
                Mengenal Lebih Dekat
              </span>
            </div>

            <h2
              className={`${marcellus.className} text-[#F6EFDF] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6`}
            >
              Unduh Company Profile{" "}
              <span className="text-[#C6952F]">Kika Al-Safar</span>
            </h2>

            <p className="text-[#E4D6B8]/75 text-base leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              Pelajari legalitas resmi, layanan unggulan, serta dedikasi kami
              dalam melayani tamu Allah — lengkap dalam satu dokumen.
            </p>

            {/* Checklist isi dokumen — kasih tau value-nya dulu sebelum diunduh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 max-w-md mx-auto lg:mx-0">
              {contents.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-[#E4D6B8]/80">
                  <span className="w-5 h-5 rounded-full bg-[#C6952F]/15 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#C6952F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>

            {/* Statistik singkat */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8 text-sm text-[#E4D6B8]/70">
              <div className="flex items-center gap-2">
                <span className={`${marcellus.className} text-[#C6952F] text-lg`}>10+</span>
                Tahun pengalaman
              </div>
              <span className="w-px h-8 bg-[#C6952F]/20" />
              <div className="flex items-center gap-2">
                <span className={`${marcellus.className} text-[#C6952F] text-lg`}>2.400+</span>
                Kali diunduh
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-3">
              {/*
                TODO: Ganti href di bawah dengan path ke file PDF asli.
                Misalnya: href="/files/Company-Profile-Kika-Alsafar.pdf"
              */}
              <Link
                href="/file/company-profile-kika-alsafar.pdf"
                target="_blank"
                download
                className="group inline-flex items-center justify-center gap-3 bg-[#C6952F] hover:bg-[#D9AB4A] text-[#1B120B] px-8 py-4 rounded-full font-bold transition-all shadow-[0_8px_30px_rgba(198,149,47,0.3)] hover:shadow-[0_8px_35px_rgba(198,149,47,0.5)] w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5 animate-bounce group-hover:animate-none group-hover:-translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF Sekarang
              </Link>
              <p className="text-xs text-[#E4D6B8]/50 font-medium">
                Gratis · Tanpa perlu isi form · ~3.5 MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}