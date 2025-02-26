"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Code2, Globe2, Brain, Palette, Star, Zap } from "lucide-react";
import { useRef, useMemo } from "react";
import { useTranslation } from "@/components/LanguageSwitch";

// Tilføj particle effekt ligesom i About
const createStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
    blinkSpeed: Math.random() * 0.02 + 0.01,
  }));
};

const timelineEvents = {
  da: [
    {
      year: "2021",
      title: "WordPress i Fotograf-praktik",
      description:
        "Under min praktik i GF2 fotograf fik jeg første erfaring med hjemmesider gennem WordPress. Dette gav mig et indblik i web-verdenen.",
      icon: Code2,
      technologies: ["WordPress", "CMS", "Fotografi"],
      achievement: "Første erfaring med website management",
    },
    {
      year: "2022",
      title: "Kreativ Udforskning",
      description:
        "I mit sabbatår eksperimenterede jeg med Adobe Website Creator for at lave min egen hjemmeside, hvilket styrkede min interesse for webudvikling.",
      icon: Palette,
      technologies: ["Adobe Website Creator", "Web Design"],
      achievement: "Første selvstændige hjemmeside",
    },
    {
      year: "2023 (GF2)",
      title: "Første Kodelinjer",
      description:
        "Startede på webudvikleruddannelsens grundforløb, hvor jeg lærte de fundamentale byggesten inden for webudvikling.",
      icon: Brain,
      technologies: ["HTML", "CSS", "JavaScript"],
      achievement: "Første håndkodede hjemmeside",
    },
    {
      year: "2024",
      title: "Avanceret Webudvikling",
      description:
        "I hovedforløbet dykker jeg ned i moderne frameworks og udviklingsværktøjer.",
      icon: Globe2,
      technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
      achievement: "Udvikling af avancerede webapplikationer",
    },
  ],
  en: [
    {
      year: "2021",
      title: "WordPress in Photography Internship",
      description:
        "During my GF2 photography internship, I gained my first experience with websites through WordPress. This gave me insight into the web world.",
      icon: Code2,
      technologies: ["WordPress", "CMS", "Photography"],
      achievement: "First experience with website management",
    },
    {
      year: "2022",
      title: "Creative Exploration",
      description:
        "During my gap year, I experimented with Adobe Website Creator to build my own website, which strengthened my interest in web development.",
      icon: Palette,
      technologies: ["Adobe Website Creator", "Web Design"],
      achievement: "First independent website",
    },
    {
      year: "2023 (GF2)",
      title: "First Lines of Code",
      description:
        "Started the web development education's basic course, where I learned the fundamental building blocks of web development.",
      icon: Brain,
      technologies: ["HTML", "CSS", "JavaScript"],
      achievement: "First hand-coded website",
    },
    {
      year: "2024",
      title: "Advanced Web Development",
      description:
        "In the main course, I dive deep into modern frameworks and development tools.",
      icon: Globe2,
      technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
      achievement: "Development of advanced web applications",
    },
  ],
};

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const { t, currentLanguage } = useTranslation();

  const stars = useMemo(() => createStars(50), []);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Star className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/50 to-white">
              {t("journey.title")}
            </h2>
            <Star className="w-8 h-8 text-primary animate-pulse" />
          </motion.div>
        </motion.div>

        {/* 3D Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <AnimatePresence mode="wait">
            {timelineEvents[currentLanguage as keyof typeof timelineEvents].map(
              (event, index) => (
                <motion.div
                  key={`${event.year}-${currentLanguage}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-32 relative z-10 group"
                >
                  <div
                    className={`flex items-start gap-8 ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="glass p-8 rounded-2xl relative"
                      >
                        <event.icon className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-2 text-gradient">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 mb-6">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm glass rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-primary/80">
                          <Zap className="w-5 h-5" />
                          <span className="text-sm">{event.achievement}</span>
                        </div>

                        <motion.span
                          className="absolute -bottom-12 left-1/2 -translate-x-1/2
                               text-4xl font-bold text-primary/30"
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {event.year}
                        </motion.span>
                      </motion.div>
                    </div>

                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-4 h-4 bg-primary rounded-full relative z-10"
                      >
                        <div className="absolute w-8 h-8 bg-primary/20 rounded-full -inset-2 animate-pulse" />
                      </motion.div>
                    </div>

                    <div className="w-1/2" />
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
