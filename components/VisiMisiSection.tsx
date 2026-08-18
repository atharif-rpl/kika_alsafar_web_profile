import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function VisiMisiSection() {
  const misiList = [
    "Pelayanan prima bagi jamaah",
    "Manajemen profesional dan syariah",
    "Pembimbing ibadah berkompeten",
    "Kemitraan strategis dengan maskapai",
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6EFDF] overflow-hidden relative">
      {/* Ornamen Background Halaman */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5C0A2E] rounded-full blur-[150px] opacity-[0.06] pointer-events-none -translate-y-1/2" />

      {/* Tekstur bintang geometris, konsisten dengan section lain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="visimisiStarMotif"
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
        <rect width="100%" height="100%" fill="url(#visimisiStarMotif)" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <span className="text-xs md:text-sm font-semibold text-[#5C0A2E] uppercase tracking-[0.25em]">
              Komitmen Kami
            </span>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>
          <h2
            className={`${marcellus.className} text-3xl md:text-4xl lg:text-5xl text-[#1B120B]`}
          >
            Visi & <span className="text-[#5C0A2E]">Misi</span> Kika Al-Safar
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* KOLOM KIRI: VISI (Dengan Quote Watermark) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1B120B] via-[#2E0E1B] to-[#5C0A2E] rounded-[2.5rem] p-8 md:p-12 text-[#F6EFDF] relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-[#5C0A2E]/20 border border-[#C6952F]/20 group">
            {/* Ornamen Glow Emas & Tekstur bintang */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6952F] rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-700" />
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="visimisiCardStarMotif"
                  width="56"
                  height="56"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M28 4 L33 20 L50 20 L36 30 L41 46 L28 36 L15 46 L20 30 L6 20 L23 20 Z"
                    fill="none"
                    stroke="#F6EFDF"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#visimisiCardStarMotif)"
              />
            </svg>

            {/* Watermark Quote Raksasa */}
            <div
              className={`${marcellus.className} absolute -top-10 -left-6 text-[15rem] text-[#F6EFDF]/[0.06] leading-none pointer-events-none select-none`}
            >
              &ldquo;
            </div>

            <div className="relative z-10 mb-8 mt-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-1 bg-[#C6952F] rounded-full" />
                <span className="text-[#C6952F] font-semibold text-xs tracking-[0.25em] uppercase block">
                  Visi Utama
                </span>
              </div>
              <h3
                className={`${marcellus.className} text-3xl md:text-4xl leading-[1.35]`}
              >
                Menjadi penyelenggara perjalanan ibadah umrah dan wisata halal
                yang <span className="text-[#C6952F]">amanah, profesional,</span>{" "}
                dan <span className="text-[#C6952F]">terpercaya.</span>
              </h3>
            </div>

            <div className="relative z-10 pt-6 border-t border-dashed border-[#C6952F]/30 flex items-center justify-between">
              <span className="text-sm text-[#E4D6B8]/80 font-medium tracking-wide">
                Kika Al-Safar PPIU Resmi
              </span>
              <div className="w-10 h-10 rounded-full bg-[#C6952F] flex items-center justify-center text-[#1B120B] shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: MISI (Dengan Watermark Angka Raksasa) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {misiList.map((misi, index) => (
              <div
                key={index}
                className="bg-white border border-[#C6952F]/15 rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:border-[#5C0A2E]/30 group relative overflow-hidden hover:-translate-y-1"
              >
                {/* Watermark Angka di Background */}
                <span className="absolute -bottom-6 -right-4 text-9xl font-black text-[#F6EFDF] opacity-90 group-hover:text-[#F0E4C8] group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500 pointer-events-none select-none z-0">
                  0{index + 1}
                </span>

                <div className="relative z-10">
                  {/* Ikon Nomor */}
                  <div className="w-12 h-12 rounded-xl bg-[#F6EFDF] text-[#5C0A2E] flex items-center justify-center font-extrabold text-base mb-8 group-hover:bg-[#5C0A2E] group-hover:text-[#C6952F] transition-colors shadow-inner">
                    0{index + 1}
                  </div>

                  {/* Teks Misi */}
                  <p className="text-[#1B120B] font-bold text-lg md:text-xl leading-snug group-hover:text-[#5C0A2E] transition-colors max-w-[90%]">
                    {misi}
                  </p>
                </div>

                {/* Indikator Aksi Kecil */}
                <div className="relative z-10 w-8 h-1 bg-[#EDE3CB] rounded-full mt-8 group-hover:bg-[#C6952F] group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}