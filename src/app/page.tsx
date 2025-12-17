"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppShowcase from "@/components/AppShowcase";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      <HeroSection />
      <AppShowcase />
      <section id="about">
        <AboutSection />
      </section>
      <ContactSection />
    </main>
  );
}
