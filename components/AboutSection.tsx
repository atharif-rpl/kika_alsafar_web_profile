import Image from "next/image";
import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#F6EFDF] overflow-hidden"
    >
      {/* Seam ke hero: trim arch tipis, echo dari footer — bukan gradient tebal */}
      <svg
        className="absolute top-0 left-0 w-full h-6 md:h-8 opacity-50 pointer-events-none"
        viewBox="0 0 480 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0 Q 20 20 40 0 Q 60 20 80 0 Q 100 20 120 0 Q 140 20 160 0 Q 180 20 200 0 Q 220 20 240 0 Q 260 20 280 0 Q 300 20 320 0 Q 340 20 360 0 Q 380 20 400 0 Q 420 20 440 0 Q 460 20 480 0"
          fill="none"
          stroke="#C6952F"
          strokeWidth="1"
        />
      </svg>

      {/* Tekstur bintang geometris, konsisten dengan hero & footer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="aboutStarMotif"
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
        <rect width="100%" height="100%" fill="url(#aboutStarMotif)" />
      </svg>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* KOLOM KIRI: Editorial Image Group */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            {/* Gambar Utama — arch frame, echo dari mihrab photo di hero */}
            <div className="relative w-[75%] sm:w-[65%] md:w-[60%] aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden shadow-xl border-[3px] border-[#C6952F]/40">
              <Image
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000"
                alt="Jemaah Kika Al-Safar"
                fill
                className="object-cover"
              />
            </div>

            {/* Gambar Sekunder (Square, overlap kanan bawah) */}
            <div className="absolute bottom-[-5%] right-[5%] sm:right-[15%] lg:right-[10%] w-[50%] sm:w-[45%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-[6px] border-[#F6EFDF] ring-1 ring-[#C6952F]/30">
              <Image
                src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=800"
                alt="Pelayanan Umrah"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Badge Takedown sesuai revisi */}
          </div>

          {/* KOLOM KANAN: Text & Informasi */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center mt-8 lg:mt-0">
            {/* Eyebrow — diamond marker, senada hero */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
              <span className="text-[#5C0A2E] font-semibold uppercase tracking-[0.25em] text-xs md:text-sm">
                Tentang Kika Al-Safar
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`${marcellus.className} text-3xl md:text-4xl lg:text-5xl text-[#1B120B] mb-6 leading-[1.25]`}
            >
              Mengukir Perjalanan Ibadah yang{" "}
              <span className="text-[#5C0A2E] relative inline-block">
                Nyaman, Khusyuk, dan Berkesan
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

            {/* Deskripsi */}
            <p className="text-[#4a3f33] text-base md:text-lg leading-relaxed mb-10">
              Setiap perjalanan memiliki cerita, dan setiap ibadah memiliki makna. Kika Al-Safar hadir untuk menemani Anda dengan pelayanan terbaik, perhatian yang tulus, dan pengalaman yang berkesan.
            </p>

            {/* Tombol CTA sebagai pengganti Statistik agar tidak kosong */}
            <div className="pt-8 border-t border-dashed border-[#C6952F]/40 flex justify-start">
              <Link 
                href="#packages" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1B120B] hover:bg-[#5C0A2E] text-white text-sm md:text-base font-medium rounded-full transition-all duration-300 shadow-lg shadow-[#1B120B]/10 hover:shadow-[#5C0A2E]/20"
              >
                Lihat Paket Keberangkatan
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}