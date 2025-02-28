import { TranslationKey } from "@/translations";

export interface LocalizedString {
  da: string;
  en: string;
  [key: string]: string;
}

export interface Project {
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  isSlowLoading?: boolean;
}

export const projects = (t: (key: TranslationKey) => string): Project[] => [
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
    isSlowLoading: true,
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