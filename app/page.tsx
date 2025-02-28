"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <ScrollProgress />
      <StarBackground />
      <Header />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
