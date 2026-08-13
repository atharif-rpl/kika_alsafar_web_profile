import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import VisiMisiSection from "../components/VisiMisiSection";
import PartnershipSection from "../components/PartnershipSection";
import DocumentationSection from "../components/DocumentationSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ServicesSection from "@/components/ServicesSection";
import PackageListSection from "@/components/PackageListSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CompanyProfileSection from "@/components/CompanyProfileSection";

export default function Home() {
  return (
    // 1. Tag main BERSIH dari segala padding (p-4, dll) dan max-width. Tambahkan overflow-x-hidden untuk jaga-jaga.
    <main className="w-full min-h-screen bg-[#F6EFDF] flex flex-col overflow-x-hidden">

      <Navbar />

      {/* Hero full-bleed: sengaja di luar wrapper berpadding, sama kayak Footer, biar mentok layar */}
      <HeroSection />
      <AboutSection />
      <VisiMisiSection />
      <PartnershipSection />
      <DocumentationSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <PackageListSection />
      <CompanyProfileSection />
      <TestimonialsSection />
        <FaqSection />
        <ContactSection />

    
      {/* 3. Footer juga di luar wrapper pembungkus! Bebas melebar 100% mentok layar */}
      <Footer />

    </main>
  );
}