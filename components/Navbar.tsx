"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sesuaikan link dengan ID section yang udah kita buat
  const navLinks = [
    { name: "Tentang Kami", href: "#about" },
    { name: "Paket Umrah", href: "#packages" },
    { name: "Dokumentasi", href: "#dokumentasi" },
    { name: "Testimoni", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out flex items-center justify-between
        ${
          isScrolled
            ? "top-4 w-[95%] md:w-[80%] max-w-5xl bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(27,18,11,0.12)] border border-[#C6952F]/20 py-3 px-6 md:px-8 rounded-full"
            : "top-6 md:top-10 w-[92%] max-w-[1440px] bg-white/[0.06] backdrop-blur-md border border-white/15 py-3 px-4 md:px-10 rounded-full"
        }`}
    >
      {/* Brand & Logo Area */}
      <Link href="/" className="flex items-center gap-3 group relative z-50">
        <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden group-hover:scale-105 transition-transform shadow-sm bg-white ring-1 ring-[#C6952F]/40">
          <Image
            src="/images/logokika.png"
            alt="Logo Kika Al-safar"
            fill
            className="object-cover"
          />
        </div>

        {/* Teks Logo Kika Al-safar */}
        <span
          className={`${marcellus.className} text-lg md:text-xl tracking-tight transition-colors duration-300 ${
            isScrolled ? "text-[#1B120B]" : "text-[#F6EFDF]"
          }`}
        >
          Kika <span className="text-[#C6952F]">Al-Safar</span>
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 group/link ${
              isScrolled
                ? "text-[#4a3f33] hover:text-[#5C0A2E]"
                : "text-[#E4D6B8]/85 hover:text-[#F6EFDF]"
            }`}
          >
            {link.name}
            {/* Underline gold, muncul dari tengah saat hover */}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C6952F] group-hover/link:w-full transition-all duration-300" />
          </Link>
        ))}
      </div>

      {/* Diamond divider + Desktop CTA Button */}
      <div className="hidden md:flex items-center gap-5 relative z-50">
        <span
          className={`w-1.5 h-1.5 rotate-45 transition-colors duration-300 ${
            isScrolled ? "bg-[#C6952F]/50" : "bg-[#C6952F]/60"
          }`}
        />
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#C6952F] hover:bg-[#D9AB4A] text-[#1B120B] transition-all shadow-[0_8px_20px_rgba(198,149,47,0.35)] hover:shadow-[0_8px_24px_rgba(198,149,47,0.5)]"
        >
          Hubungi Kami
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`focus:outline-none p-2.5 rounded-full transition-colors ${
            isScrolled
              ? "text-[#5C0A2E] bg-[#F6EFDF]"
              : "text-[#F6EFDF] bg-white/10 backdrop-blur-sm"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-[110%] left-0 w-full bg-[#F6EFDF]/98 backdrop-blur-xl border border-[#C6952F]/25 rounded-3xl shadow-2xl p-4 flex flex-col gap-1 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-[#1B120B] hover:text-[#5C0A2E] hover:bg-white rounded-xl transition-colors"
            >
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6952F]/50" />
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center mt-2 w-full bg-[#C6952F] hover:bg-[#D9AB4A] text-[#1B120B] px-4 py-4 rounded-2xl font-bold shadow-md transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      )}
    </nav>
  );
}