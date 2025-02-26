import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen text-white relative">
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
