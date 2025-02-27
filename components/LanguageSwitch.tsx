/* eslint-disable */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { translations } from "@/translations";
import type { TranslationKey } from "@/translations";

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: "da", name: "Dansk" },
  { code: "en", name: "English" },
];

// Create language context
const LanguageContext = createContext<{
  currentLang: string;
  setLanguage: (code: string) => void;
}>({
  currentLang: "da",
  setLanguage: () => {},
});

// Create provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState("da");

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem("language");
    if (savedLang && languages.some((lang) => lang.code === savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  const setLanguage = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem("language", code);
    document.documentElement.lang = code;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);

// Custom hook for translations
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  const { currentLang, setLanguage } = context;

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[currentLang][key];
    },
    [currentLang]
  );

  return { t, setLanguage, currentLanguage: currentLang };
};

export default function LanguageSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, setLanguage } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".language-switch")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative language-switch">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span>{languages.find((l) => l.code === currentLang)?.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-black/50 backdrop-blur-xl 
                     rounded-xl border border-primary/20 overflow-hidden min-w-[120px]"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                className={`block w-full px-6 py-3 text-left hover:bg-primary/10 transition-colors
                          ${
                            currentLang === lang.code
                              ? "text-primary"
                              : "text-gray-300"
                          }`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                {lang.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
