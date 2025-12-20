"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppShowcase from "@/components/AppShowcase";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SectionIndicator from "@/components/SectionIndicator";

const sections = [
  { id: "hero", label: "Home" },
  { id: "apps", label: "Apps" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll to detect active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;

      // Determine which section is in view
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          // Check if we're in this section (with some tolerance)
          if (
            scrollPosition >= elementTop - windowHeight / 3 &&
            scrollPosition < elementBottom - windowHeight / 3
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Handle navbar link clicks - intercept anchor clicks
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const sectionId = href.substring(1);
          scrollToSection(sectionId);
        }
      }
    };

    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, [scrollToSection]);

  return (
    <main
      ref={containerRef}
      className="fullpage-container bg-[#050505] text-white"
    >
      <Navbar />

      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="fullpage-section">
        <HeroSection />
      </section>

      {/* Apps Section */}
      <section id="apps" className="fullpage-section">
        <AppShowcase />
      </section>

      {/* About Section */}
      <section id="about" className="fullpage-section">
        <AboutSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="fullpage-section">
        <ContactSection />
      </section>
    </main>
  );
}
