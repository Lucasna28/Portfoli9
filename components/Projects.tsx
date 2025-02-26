"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "@/components/LanguageSwitch";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, currentLanguage } = useTranslation();

  const projects = [
    {
      title: "Min Kalender",
      description: {
        da: "En moderne og brugervenlig kalenderapplikation med fokus på simplicitet og brugeroplevelse. Features inkluderer begivenhedshåndtering, deling og påmindelser.",
        en: "A modern and user-friendly calendar application focusing on simplicity and user experience. Features include event management, sharing, and reminders.",
      },
      image: "/calender-project.png",
      link: "https://min-kalender.vercel.app/calendar",
      github: "https://github.com/lucasna28/min-kalender",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Shadcn UI",
        "Zod",
        "Motion",
        "date-fns",
      ],
    },
    {
      title: "Din Mægler",
      description: {
        da: "En moderne ejendomsmægler platform udviklet som skoleprojekt. Implementeret med custom API integration, avancerede søgefunktioner og interaktivt boligkatalog. Features inkluderer boligsøgning, mægleroversigt og detaljerede boligvisninger med animationer.",
        en: "A modern real estate platform developed as a school project. Implemented with custom API integration, advanced search functions, and interactive property catalog. Features include property search, agent overview, and detailed property views with animations.",
      },
      image: "/dinm-gler.png",
      link: "https://din-meagler.vercel.app/",
      github: "https://github.com/Lucasna28/din-meagler",
      tags: ["Next.js", "React", "Motion", "Zod", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "CinemaNest",
      description: {
        da: "En moderne mobile-first filmapplikation bygget med TMDB API'et. Features inkluderer brugerautentificering via Clerk, filmdetaljer, ratings og anmeldelser. Optimeret for mobiloplevelsen med responsivt design og touch-venlige interaktioner.",
        en: "A modern mobile-first movie application built with the TMDB API. Features include user authentication via Clerk, movie details, ratings, and reviews. Optimized for mobile experience with responsive design and touch-friendly interactions.",
      },
      image: "/movie.png",
      link: "https://cinemanest.vercel.app/",
      github: "https://github.com/Lucasna28/Moviez",
      tags: [
        "React",
        "TypeScript",
        "Clerk",
        "Shadcn UI",
        "Tailwind CSS",
        "TMDB API",
      ],
    },
    {
      title: t("projects.spotify.title"),
      description: {
        da: t("projects.spotify.description"),
        en: t("projects.spotify.description"),
      },
      image: "/spotify.png",
      link: "https://spatify.vercel.app/",
      github: "https://github.com/Lucasna28/s",
      tags: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Spotify API",
        "shadcn/ui",
        "motion",
      ],
    },
  ];

  return (
    <section id="projects" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-white mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("projects.title")}
        </motion.h2>

        <div className="space-y-32" ref={containerRef}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Projekt Card */}
              <div
                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 rounded-2xl
                            transition-colors duration-300 hover:bg-white/5"
              >
                {/* Billede Container */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 z-10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Billede */}
                  <div
                    className="relative w-full h-full transform transition-transform duration-700
                                group-hover:scale-105"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Indhold */}
                <div className="relative space-y-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-300 group-hover:text-white/90 transition-colors duration-300">
                      {project.description[currentLanguage]}
                    </p>
                  </motion.div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-4 py-1.5 text-sm text-white/80 border border-white/10 rounded-full
                                 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/10
                                 hover:text-white cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl
                               font-medium transition-all duration-300 hover:bg-purple-100
                               hover:shadow-lg hover:shadow-purple-500/25 group/link"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span>{t("projects.liveDemo")}</span>
                      <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium
                               border border-white/10 hover:border-purple-500/50
                               transition-all duration-300 hover:bg-purple-500/10 group/link"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-white">
                        {t("projects.sourceCode")}
                      </span>
                      <Github className="w-4 h-4 text-white transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
