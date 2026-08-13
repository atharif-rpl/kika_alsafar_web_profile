import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function WhyChooseUsSection() {
  const pillars = [
    {
      title: "Muthawif Bersertifikat",
      desc: "Ibadah Anda akan dibimbing langsung oleh ustadz dan muthawif berpengalaman lulusan universitas Timur Tengah yang memahami sunnah.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Fasilitas Hotel Premium",
      desc: "Nikmati waktu istirahat yang maksimal di hotel berbintang 4 dan 5 dengan lokasi strategis yang sangat dekat dengan pelataran masjid.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Harga Jujur & Transparan",
      desc: "Tidak ada biaya tersembunyi. Semua fasilitas, tiket pesawat, visa, dan perlengkapan sudah termasuk dalam harga paket yang ditawarkan.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6EFDF] border-y border-[#C6952F]/20 overflow-hidden relative">
      {/* Ornamen Latar Belakang Halus */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C0A2E] rounded-full blur-[130px] opacity-[0.05] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      {/* Tekstur bintang geometris, konsisten dengan section lain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="whyStarMotif"
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
        <rect width="100%" height="100%" fill="url(#whyStarMotif)" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
            <h3 className="text-[#5C0A2E] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase">
              Keunggulan Kami
            </h3>
            <span className="w-2 h-2 rotate-45 bg-[#C6952F]" />
          </div>
          <h2
            className={`${marcellus.className} text-3xl md:text-4xl lg:text-5xl text-[#1B120B] leading-tight`}
          >
            Kenapa Memilih{" "}
            <span className="text-[#5C0A2E] relative inline-block">
              Kika Alsafar?
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
          <p className="mt-6 text-[#4a3f33] text-base md:text-lg leading-relaxed">
            Komitmen kami adalah memberikan pengalaman ibadah yang tenang,
            aman, dan nyaman sesuai tuntunan, dengan fasilitas terbaik untuk
            Anda.
          </p>
        </div>

        {/* Grid 3 Pilar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#C6952F]/15 flex flex-col items-start group hover:-translate-y-2 hover:shadow-xl hover:border-[#5C0A2E]/25 transition-all duration-300"
            >
              {/* Ikon dengan efek morphing/scale saat dihover */}
              <div className="w-16 h-16 rounded-2xl bg-[#F6EFDF] text-[#5C0A2E] flex items-center justify-center mb-8 group-hover:bg-gradient-to-br group-hover:from-[#1B120B] group-hover:via-[#2E0E1B] group-hover:to-[#5C0A2E] group-hover:text-[#C6952F] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                {pillar.icon}
              </div>

              <h4
                className={`${marcellus.className} text-xl md:text-2xl text-[#1B120B] mb-4 group-hover:text-[#5C0A2E] transition-colors`}
              >
                {pillar.title}
              </h4>

              <p className="text-[#5c5142] leading-relaxed text-sm md:text-base">
                {pillar.desc}
              </p>

              {/* Indikator kecil, senada kartu Misi */}
              <div className="w-8 h-1 bg-[#EDE3CB] rounded-full mt-6 group-hover:bg-[#C6952F] group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}