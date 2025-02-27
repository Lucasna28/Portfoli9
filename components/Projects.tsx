/* eslint-disable */
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "@/components/LanguageSwitch";
import ProjectModal from "./ProjectModal";

type Language = "da" | "en";

interface LocalizedString {
  [key in Language]: string;
}

interface Project {
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, currentLanguage } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: {
        da: "Portfolio Website",
        en: "Portfolio Website",
      },
      description: {
        da: "Min personlige portfolio hjemmeside bygget med Next.js, Three.js og Tailwind CSS.",
        en: "My personal portfolio website built with Next.js, Three.js, and Tailwind CSS.",
      },
      image: "/projects/portfolio.png",
      technologies: ["Next.js", "Three.js", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com",
    },
    {
      title: {
        da: "Min Kalender",
        en: "My Calendar",
      },
      description: {
        da: "En moderne og brugervenlig kalenderapplikation med fokus på simplicitet og brugeroplevelse. Features inkluderer begivenhedshåndtering, deling og påmindelser.",
        en: "A modern and user-friendly calendar application focusing on simplicity and user experience. Features include event management, sharing, and reminders.",
      },
      image: "/calender-project.png",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Shadcn UI",
        "Zod",
        "Motion",
        "date-fns",
      ],
      demo: "https://min-kalender.vercel.app/calendar",
      github: "https://github.com/lucasna28/min-kalender",
    },
    {
      title: {
        da: "Din Mægler",
        en: "Your Realtor",
      },
      description: {
        da: "En moderne ejendomsmægler platform udviklet som skoleprojekt. Implementeret med custom API integration, avancerede søgefunktioner og interaktivt boligkatalog. Features inkluderer boligsøgning, mægleroversigt og detaljerede boligvisninger med animationer.",
        en: "A modern real estate platform developed as a school project. Implemented with custom API integration, advanced search functions, and interactive property catalog. Features include property search, agent overview, and detailed property views with animations.",
      },
      image: "/dinm-gler.png",
      technologies: [
        "Next.js",
        "React",
        "Motion",
        "Zod",
        "Tailwind CSS",
        "JavaScript",
      ],
      demo: "https://din-meagler.vercel.app/",
      github: "https://github.com/Lucasna28/din-meagler",
    },
    {
      title: {
        da: "CinemaNest",
        en: "CinemaNest",
      },
      description: {
        da: "En moderne mobile-first filmapplikation bygget med TMDB API'et. Features inkluderer brugerautentificering via Clerk, filmdetaljer, ratings og anmeldelser. Optimeret for mobiloplevelsen med responsivt design og touch-venlige interaktioner.",
        en: "A modern mobile-first movie application built with the TMDB API. Features include user authentication via Clerk, movie details, ratings, and reviews. Optimized for mobile experience with responsive design and touch-friendly interactions.",
      },
      image: "/movie.png",
      technologies: [
        "React",
        "TypeScript",
        "Clerk",
        "Shadcn UI",
        "Tailwind CSS",
        "TMDB API",
      ],
      demo: "https://cinemanest.vercel.app/",
      github: "https://github.com/Lucasna28/Moviez",
    },
    {
      title: {
        da: t("projects.spotify.title"),
        en: t("projects.spotify.title"),
      },
      description: {
        da: t("projects.spotify.description"),
        en: t("projects.spotify.description"),
      },
      image: "/spotify.png",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Spotify API",
        "shadcn/ui",
        "motion",
      ],
      demo: "https://spatify.vercel.app/",
      github: "https://github.com/Lucasna28/s",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-xl text-gray-400">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title[currentLanguage]}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors duration-300"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title[currentLanguage]}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                  {project.title[currentLanguage]}
                </h3>
                <p className="text-lg text-gray-300 group-hover:text-white/90 transition-colors duration-300">
                  {project.description[currentLanguage]}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={{
            ...selectedProject,
            title: selectedProject.title[currentLanguage],
            description: selectedProject.description[currentLanguage],
          }}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
