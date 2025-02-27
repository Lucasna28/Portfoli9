/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LanguageSwitch, { useTranslation } from "./LanguageSwitch";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useTranslation();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Luk menu når der scrolles
  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener("scroll", closeMenu);
    return () => window.removeEventListener("scroll", closeMenu);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: headerOpacity, backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[2px]"
    >
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:hidden">
          <Link href="#home" className="text-xl font-bold text-gradient">
            Lucas
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitch />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 py-4"
            >
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "bg-primary/20 text-white"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between">
          <Link href="#home" className="text-xl font-bold text-gradient">
            Lucas
          </Link>
          <ul className="flex items-center justify-center space-x-12">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <motion.div
                    className="relative px-2 py-1"
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.span
                      className={`relative z-10 text-sm font-medium transition-colors duration-200
                              ${
                                activeSection === item.href.slice(1)
                                  ? "text-white"
                                  : "text-gray-400 hover:text-white"
                              }`}
                    >
                      {item.name}
                    </motion.span>

                    {/* Underline effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: activeSection === item.href.slice(1) ? 1 : 0,
                        opacity: activeSection === item.href.slice(1) ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover effect */}
                    <motion.div
                      className="absolute -inset-1 rounded-lg bg-white/5"
                      variants={{
                        initial: { opacity: 0, scale: 0.95 },
                        hover: {
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.2 },
                        },
                      }}
                    />
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
        </div>
      </nav>
    </motion.header>
  );
}
