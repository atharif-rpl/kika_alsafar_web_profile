import Link from "next/link";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Paket Umrah", href: "#paket" },
    { label: "Galeri Perjalanan", href: "#galeri" },
    { label: "Tanya Jawab (FAQ)", href: "#faq" },
  ];

  const services = [
    "Umrah Reguler",
    "Umrah VIP",
    "Umrah Plus Turki",
    "Wisata Halal",
  ];

  return (
    <footer className="w-full relative overflow-hidden text-[#F6EFDF] rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-2xl mt-12 md:mt-20 bg-gradient-to-br from-[#1B120B] via-[#2E0E1B] to-[#5C0A2E]">
      {/* Tekstur bintang geometris — konsisten dengan hero */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="footerStarMotif"
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
        <rect width="100%" height="100%" fill="url(#footerStarMotif)" />
      </svg>

      {/* Glow lembut, senada hero */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6952F] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F6EFDF] rounded-full blur-[150px] opacity-5 pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Mini-arch trim — gema dari arch photo di hero */}
      <svg
        className="absolute top-0 left-0 w-full h-6 md:h-8 opacity-40 pointer-events-none"
        viewBox="0 0 480 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 20 Q 20 0 40 20 Q 60 0 80 20 Q 100 0 120 20 Q 140 0 160 20 Q 180 0 200 20 Q 220 0 240 20 Q 260 0 280 20 Q 300 0 320 20 Q 340 0 360 20 Q 380 0 400 20 Q 420 0 440 20 Q 460 0 480 20"
          fill="none"
          stroke="#C6952F"
          strokeWidth="1"
        />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-16 md:pt-24 pb-12 relative z-10">
        {/* BAGIAN ATAS: Newsletter CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 mb-12 border-b border-dashed border-[#C6952F]/30">
          <div className="max-w-xl">
            <h3
              className={`${marcellus.className} text-2xl md:text-3xl mb-2 text-[#F6EFDF]`}
            >
              Dapatkan Promo & Info Keberangkatan
            </h3>
            <p className="text-[#E4D6B8]/70 text-sm md:text-base leading-relaxed">
              Jadilah yang pertama tahu tentang paket umrah terbaru, diskon
              khusus, dan inspirasi perjalanan spiritual dari Kika Al-Safar.
            </p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Masukkan alamat email Anda..."
              className="px-6 py-4 rounded-full bg-white/5 border border-[#C6952F]/30 focus:outline-none focus:border-[#C6952F] focus:bg-white/10 text-[#F6EFDF] placeholder:text-[#E4D6B8]/40 w-full sm:w-80 transition-all"
            />
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C6952F] hover:bg-[#D9AB4A] text-[#1B120B] font-semibold transition-all shadow-[0_8px_30px_rgba(198,149,47,0.35)] shrink-0">
              Berlangganan
            </button>
          </div>
        </div>

        {/* BAGIAN TENGAH: 2 Kolom — Brand & Kontak */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Kolom 1: Brand Info — diperlebar mengisi ruang yang dulu dipakai 2 kolom shortcut */}
          <div className="lg:col-span-5 flex flex-col">
            <Link href="/" className="flex items-center gap-3 group mb-6 w-max">
              <div className="w-12 h-12 bg-[#F6EFDF] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shrink-0">
                <svg
                  className="w-6 h-6 text-[#5C0A2E]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3c-2.5 3-3.5 6-1.8 9.6C7.8 11.8 6 9.5 6 6.5 3.5 8.7 2 11.7 2 15c0 4.4 4.5 6 6 6 .3-1 1-2 2-2.5-.6 1-.5 2 .2 2.5.6-1.2 2-1.5 2.8-1 .5-1 .3-2.2-.5-3 1.6.2 2.7 1.4 3 3 1.9-1 4.5-3.5 4.5-7 0-2.6-1.2-4.8-3-6.2.3 1.6-.2 3-1.4 3.9C16.8 8 16.3 4.8 12 3z" />
                </svg>
              </div>
              <span
                className={`${marcellus.className} text-2xl md:text-3xl tracking-tight text-[#F6EFDF]`}
              >
                Kika<span className="text-[#C6952F]">Al-Safar</span>
              </span>
            </Link>
            <p className="text-[#E4D6B8]/70 text-sm leading-relaxed mb-8 max-w-md">
              Penyelenggara perjalanan ibadah umrah dan wisata halal resmi
              yang berdedikasi memberikan pelayanan amanah, profesional, dan
              terpercaya bagi setiap jemaah.
            </p>
            <div className="flex gap-3">
              {["IG", "FB", "TK"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-[#C6952F]/30 flex items-center justify-center text-[#F6EFDF] hover:bg-[#C6952F] hover:text-[#1B120B] hover:-translate-y-1 transition-all"
                >
                  <span className="text-xs font-bold">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Kontak — mini-grid kartu, echo motif manifest bar */}
          <div className="lg:col-span-7 flex flex-col">
            <h4 className="text-[#C6952F] font-semibold tracking-[0.2em] text-xs uppercase mb-6">
              Hubungi Kami
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-dashed border-[#C6952F]/25">
                <svg
                  className="w-5 h-5 shrink-0 text-[#C6952F]/70 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#E4D6B8]/40 mb-1">
                    Alamat Kantor
                  </p>
                  <p className="text-sm text-[#F6EFDF]/85 font-medium leading-relaxed">
                    Jln. Artzimar III no. A10, Tegal Gundil, Bogor
                  </p>
                </div>
              </div>

              <a
                href="tel:08212600250"
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-dashed border-[#C6952F]/25 hover:border-[#C6952F]/60 hover:bg-white/10 transition-all"
              >
                <svg
                  className="w-5 h-5 shrink-0 text-[#C6952F]/70 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#E4D6B8]/40 mb-1">
                    Telepon
                  </p>
                  <p className="text-sm text-[#F6EFDF]/85 font-medium">
                    0821-2600-250
                  </p>
                </div>
              </a>

              <a
                href="mailto:kikaalsafar@gmail.com"
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-dashed border-[#C6952F]/25 hover:border-[#C6952F]/60 hover:bg-white/10 transition-all"
              >
                <svg
                  className="w-5 h-5 shrink-0 text-[#C6952F]/70 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#E4D6B8]/40 mb-1">
                    Email
                  </p>
                  <p className="text-sm text-[#F6EFDF]/85 font-medium">
                    kikaalsafar@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-dashed border-[#C6952F]/25">
                <svg
                  className="w-5 h-5 shrink-0 text-[#C6952F]/70 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#E4D6B8]/40 mb-1">
                    Jam Operasional
                  </p>
                  <p className="text-sm text-[#F6EFDF]/85 font-medium">
                    Senin – Sabtu, 09.00–17.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN BAWAH: Copyright & Legalitas */}
        <div className="pt-8 border-t border-[#C6952F]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-[#E4D6B8]/50 font-medium">
          <p>&copy; {currentYear} Kika Al-Safar. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#F6EFDF] transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="hover:text-[#F6EFDF] transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}