/* eslint-disable */
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "@/components/LanguageSwitch";
import ProjectModal from "./ProjectModal";
import { projects } from "@/data/projects";
import {
  fadeInUpVariants,
  buttonHoverVariants,
  commonTransitions,
  commonAnimations,
} from "@/styles/animations";
import type { Project } from "@/data/projects";
import type { TranslationKey } from "@/translations";

type Language = "da" | "en";

// Genbrugelig ProjectTag komponent
const ProjectTag = ({ tech, index }: { tech: string; index: number }) => (
  <motion.span
    key={tech}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{
      delay: 0.5 + index * 0.1,
      ...commonTransitions.spring,
    }}
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      borderColor: "rgba(168, 85, 247, 0.5)",
    }}
    className="px-4 py-1.5 text-sm text-white/80 border border-white/10 rounded-full
              transition-all duration-300 hover:text-white cursor-default"
  >
    {tech}
  </motion.span>
);

// Genbrugelig ProjectImage komponent
const ProjectImage = ({
  image,
  title,
  index,
  currentLanguage,
}: {
  image: string;
  title: Project["title"];
  index: number;
  currentLanguage: Language;
}) => (
  <motion.div
    className="relative aspect-[16/9] rounded-xl overflow-hidden"
    whileHover={{ scale: 1.02 }}
    transition={commonTransitions.smooth}
  >
    <div
      className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 z-10 
                    opacity-0 group-hover:opacity-100 transition-all duration-500"
    />
    <div
      className="relative w-full h-full transform transition-all duration-700
                    group-hover:scale-105"
    >
      <Image
        src={image}
        alt={title[currentLanguage]}
        fill
        className="object-cover"
        priority={index === 0}
      />
    </div>
  </motion.div>
);

// Genbrugelig LoadingIndicator komponent
const LoadingIndicator = () => (
  <>
    <div
      className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 p-3 bg-gradient-to-b from-purple-500/10 to-purple-500/5
                   backdrop-blur-xl border border-purple-500/20 rounded-2xl text-sm text-white
                   opacity-0 group-hover/demo:opacity-100 transition-all duration-300
                   shadow-xl shadow-purple-500/10 hidden md:block pointer-events-none"
    >
      <div className="flex items-center gap-2 text-purple-300 font-medium mb-2">
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        <span>Server opstart</span>
      </div>
      <p className="text-white/80 leading-relaxed">
        Første besøg kræver lidt tålmodighed mens api´en starter op
      </p>
    </div>

    <div className="md:hidden text-sm text-purple-300/90 absolute -bottom-10 left-0 w-full text-center pointer-events-none">
      <div className="flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-xs">Api´en starter op ved første besøg</span>
      </div>
    </div>
  </>
);

// Genbrugelig ProjectLinks komponent
const ProjectLinks = ({
  project,
  t,
}: {
  project: Project;
  t: (key: TranslationKey) => string;
}) => (
  <motion.div
    className="flex gap-4 pt-4"
    {...commonAnimations.fadeIn}
    transition={{ delay: 0.6, duration: 0.5 }}
  >
    {project.demo && (
      <motion.div className="relative group/demo">
        {project.isSlowLoading && <LoadingIndicator />}
        <motion.a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white to-purple-50 text-black rounded-xl
                    font-medium transition-all duration-300 hover:to-purple-100
                    hover:shadow-lg hover:shadow-purple-500/25 group/link relative overflow-hidden"
          whileHover={buttonHoverVariants.hover}
          transition={commonTransitions.spring}
        >
          <span className="relative flex items-center gap-1.5">
            {t("projects.liveDemo")}
            {project.isSlowLoading && (
              <div className="flex gap-0.5 items-center ml-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-purple-500/80"
                  />
                ))}
              </div>
            )}
          </span>
          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 relative" />
        </motion.a>
      </motion.div>
    )}
    {project.github && (
      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium
                  border border-white/10 hover:border-purple-500/50
                  transition-all duration-300 hover:bg-purple-500/10 group/link"
        whileHover={buttonHoverVariants.hover}
        transition={commonTransitions.spring}
      >
        <span className="text-white">{t("projects.sourceCode")}</span>
        <Github className="w-4 h-4 text-white transition-transform duration-300 group-hover/link:translate-x-0.5" />
      </motion.a>
    )}
  </motion.div>
);

// Genbrugelig ProjectCard komponent
const ProjectCard = ({
  project,
  index,
  currentLanguage,
  t,
}: {
  project: Project;
  index: number;
  currentLanguage: Language;
  t: (key: TranslationKey) => string;
}) => (
  <motion.div initial="hidden" animate="visible" variants={fadeInUpVariants}>
    <div
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 rounded-2xl
                    transition-all duration-500 hover:bg-white/5 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <ProjectImage
        image={project.image}
        title={project.title}
        index={index}
        currentLanguage={currentLanguage}
      />

      <div className="relative space-y-6">
        <motion.div
          className="space-y-2"
          {...commonAnimations.slideIn}
          transition={commonTransitions.smoothSpring}
        >
          <motion.h3
            className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300"
            whileHover={{ scale: 1.02, x: 10 }}
            transition={commonTransitions.spring}
          >
            {project.title[currentLanguage]}
          </motion.h3>
          <motion.p
            className="text-lg text-gray-300 group-hover:text-white/90 transition-colors duration-300"
            {...commonAnimations.fadeIn}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {project.description[currentLanguage]}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          {...commonAnimations.fadeIn}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {project.technologies.map((tech, techIndex) => (
            <ProjectTag key={tech} tech={tech} index={techIndex} />
          ))}
        </motion.div>

        <ProjectLinks project={project} t={t} />
      </div>
    </div>
  </motion.div>
);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, currentLanguage } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-white mb-16"
          {...commonAnimations.slideIn}
        >
          {t("projects.title")}
        </motion.h2>

        <div className="space-y-32">
          {projects(t).map((project, index) => (
            <ProjectCard
              key={project.title[currentLanguage]}
              project={project}
              index={index}
              currentLanguage={currentLanguage as Language}
              t={t}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={{
            ...selectedProject,
            title: selectedProject.title[currentLanguage as Language],
            description:
              selectedProject.description[currentLanguage as Language],
          }}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
