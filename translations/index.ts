export const MAX_MESSAGE_LENGTH = 500;

type TranslationKey = 
  // Navigation
  | "nav.home"
  | "nav.about"
  | "nav.projects"
  | "nav.contact"
  
  // Hero section
  | "hero.greeting"
  | "hero.role"
  | "hero.learnMore"
  
  // Profile/About section
  | "profile.title"
  | "profile.subtitle"
  | "profile.description"
  | "education.title"
  | "skills.title"
  | "programs.title"
  | "skills.levels.expert"
  | "skills.levels.intermediate"
  | "skills.levels.beginner"
  | "programs.categories.design"
  | "programs.categories.video"
  | "programs.categories.other"
  
  // Projects section
  | "projects.title"
  | "projects.subtitle"
  | "projects.viewProject"
  | "projects.technologies"
  | "projects.liveDemo"
  | "projects.sourceCode"
  
  // Spotify Project
  | "projects.spotify.title"
  | "projects.spotify.description"
  | "projects.spotify.tech"
  
  // Journey section
  | "journey.title"
  
  // Contact section
  | "contact.title"
  | "contact.subtitle"
  | "contact.form.name"
  | "contact.form.email"
  | "contact.form.subject"
  | "contact.form.message"
  | "contact.form.send"
  | "contact.form.sending"
  | "contact.form.namePlaceholder"
  | "contact.form.emailPlaceholder"
  | "contact.form.subjectPlaceholder"
  | "contact.form.messagePlaceholder"
  | "contact.form.success.title"
  | "contact.form.success.message"
  | "contact.form.error.title"
  | "contact.form.error.message"
  | "contact.form.error.close"
  | "contact.form.errors.name"
  | "contact.form.errors.emailRequired"
  | "contact.form.errors.emailInvalid"
  | "contact.form.errors.subject"
  | "contact.form.errors.message"
  | "contact.form.errors.messageLength"
  | "contact.socials.title"
  | "contact.location"
  | "contact.availability"
  
  // Footer translations
  | "footer.logo.alt"
  | "footer.role"
  | "footer.tech"
  | "footer.rights"
  | "footer.social.email"
  | "footer.social.github"
  | "footer.social.linkedin";

export type { TranslationKey };

type Translations = {
  [key in TranslationKey]: string;
};

type TranslationsMap = {
  [lang: string]: Translations;
};

export const translations: TranslationsMap = {
  da: {
    // Navigation
    "nav.home": "Hjem",
    "nav.about": "Om Mig",
    "nav.projects": "Projekter",
    "nav.contact": "Kontakt",

    // Hero section
    "hero.greeting": "Hej, jeg er",
    "hero.role": "Frontend Developer & UI/UX Designer",
    "hero.learnMore": "Lær mig at kende",

    // Profile/About section
    "profile.title": "Profil",
    "profile.subtitle": "Frontend udvikler med fokus på moderne webteknologier",
    "profile.description": "Jeg specialiserer mig i udvikling af moderne webapplikationer med React og Next.js. Efter at have udforsket fotografi på GF2, valgte jeg at følge min interesse for webudvikling. I august 2023 startede jeg på webudvikleruddannelsen, hvor jeg nu kombinerer min kreative baggrund med teknisk udvikling.",
    "education.title": "Uddannelse",
    "skills.title": "Færdigheder",
    "programs.title": "Programmer",
    "skills.levels.expert": "God",
    "skills.levels.intermediate": "Øvet",
    "skills.levels.beginner": "Begynder",
    "programs.categories.design": "Design & Foto",
    "programs.categories.video": "Video",
    "programs.categories.other": "Andet",

    // Projects section
    "projects.title": "Projekter",
    "projects.subtitle": "Et udvalg af mine seneste projekter",
    "projects.viewProject": "Se projekt",
    "projects.technologies": "Teknologier",
    "projects.liveDemo": "Se Demo",
    "projects.sourceCode": "Kildekode",

    // Spotify Project
    "projects.spotify.title": "Spatify - Spotify Clone",
    "projects.spotify.description": "En moderne Spotify klon bygget med Next.js og Tailwind CSS. Projektet inkluderer features som musikafspilning, playlister og et responsivt design inspireret af Spotify's interface.",
    "projects.spotify.tech": "Next.js, React, Tailwind CSS, TypeScript",

    // Journey section
    "journey.title": "Min Rejse",

    // Contact section
    "contact.title": "Kontakt",
    "contact.subtitle": "Lad os snakke!",
    "contact.form.name": "Navn",
    "contact.form.email": "Email",
    "contact.form.subject": "Emne",
    "contact.form.message": "Besked",
    "contact.form.send": "Send besked",
    "contact.form.sending": "Sender...",
    "contact.form.namePlaceholder": "Indtast dit navn",
    "contact.form.emailPlaceholder": "Indtast din email",
    "contact.form.subjectPlaceholder": "Hvad handler det om?",
    "contact.form.messagePlaceholder": "Skriv din besked her...",
    "contact.form.success.title": "Tak for din besked!",
    "contact.form.success.message": "Jeg vender tilbage hurtigst muligt.",
    "contact.form.error.title": "Ups! Der opstod en fejl",
    "contact.form.error.message": "Der opstod en fejl ved afsendelse af din besked. Prøv venligst igen.",
    "contact.form.error.close": "Luk",
    "contact.form.errors.name": "Navn er påkrævet",
    "contact.form.errors.emailRequired": "Email er påkrævet",
    "contact.form.errors.emailInvalid": "Ugyldig email adresse",
    "contact.form.errors.subject": "Emne er påkrævet",
    "contact.form.errors.message": "Besked er påkrævet",
    "contact.form.errors.messageLength": `Beskeden må maksimalt være 500 tegn`,
    "contact.socials.title": "Find mig på",
    "contact.location": "København, Danmark",
    "contact.availability": "Jeg er altid interesseret i spændende projekter og nye muligheder. Send mig en besked, og lad os se hvordan vi kan samarbejde!",
    
    // Footer translations
    "footer.logo.alt": "LNA Logo",
    "footer.role": "Frontend Developer & UI/UX Designer",
    "footer.tech": "Udviklet i React & Next.js",
    "footer.rights": "Alle rettigheder forbeholdes.",
    "footer.social.email": "Send mig en email",
    "footer.social.github": "Besøg min GitHub profil",
    "footer.social.linkedin": "Forbind med mig på LinkedIn",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero section
    "hero.greeting": "Hi, I'm",
    "hero.role": "Frontend Developer & UI/UX Designer",
    "hero.learnMore": "Get to know me",

    // Profile/About section
    "profile.title": "Profile",
    "profile.subtitle": "Frontend Developer focusing on modern web technologies",
    "profile.description": "I specialize in developing modern web applications with React and Next.js. After exploring photography at GF2, I chose to pursue my interest in web development. In August 2023, I started my web development education, where I now combine my creative background with technical development.",
    "education.title": "Education",
    "skills.title": "Skills",
    "programs.title": "Software",
    "skills.levels.expert": "Expert",
    "skills.levels.intermediate": "Intermediate",
    "skills.levels.beginner": "Beginner",
    "programs.categories.design": "Design & Photo",
    "programs.categories.video": "Video",
    "programs.categories.other": "Other",

    // Projects section
    "projects.title": "Projects",
    "projects.subtitle": "A selection of my recent projects",
    "projects.viewProject": "View project",
    "projects.technologies": "Technologies",
    "projects.liveDemo": "Live Demo",
    "projects.sourceCode": "Source Code",

    // Spotify Project
    "projects.spotify.title": "Spatify - Spotify Clone",
    "projects.spotify.description": "A modern Spotify clone built with Next.js and Tailwind CSS. The project includes features like music playback, playlists, and a responsive design inspired by Spotify's interface.",
    "projects.spotify.tech": "Next.js, React, Tailwind CSS, TypeScript",

    // Journey section
    "journey.title": "My Journey",

    // Contact section
    "contact.title": "Contact",
    "contact.subtitle": "Let's talk!",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send message",
    "contact.form.sending": "Sending...",
    "contact.form.namePlaceholder": "Enter your name",
    "contact.form.emailPlaceholder": "Enter your email",
    "contact.form.subjectPlaceholder": "What's this about?",
    "contact.form.messagePlaceholder": "Write your message here...",
    "contact.form.success.title": "Thank you for your message!",
    "contact.form.success.message": "I'll get back to you as soon as possible.",
    "contact.form.error.title": "Oops! Something went wrong",
    "contact.form.error.message": "There was an error sending your message. Please try again.",
    "contact.form.error.close": "Close",
    "contact.form.errors.name": "Name is required",
    "contact.form.errors.emailRequired": "Email is required",
    "contact.form.errors.emailInvalid": "Invalid email address",
    "contact.form.errors.subject": "Subject is required",
    "contact.form.errors.message": "Message is required",
    "contact.form.errors.messageLength": `Message cannot exceed 500 characters`,
    "contact.socials.title": "Find me on",
    "contact.location": "Copenhagen, Denmark",
    "contact.availability": "I'm always interested in exciting projects and new opportunities. Send me a message and let's see how we can collaborate!",
    
    // Footer translations
    "footer.logo.alt": "LNA Logo",
    "footer.role": "Frontend Developer & UI/UX Designer",
    "footer.tech": "Built with React & Next.js",
    "footer.rights": "All rights reserved.",
    "footer.social.email": "Send me an email",
    "footer.social.github": "Visit my GitHub profile",
    "footer.social.linkedin": "Connect with me on LinkedIn",
  },
}; 