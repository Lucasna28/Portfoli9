/* eslint-disable */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "@/components/LanguageSwitch";

// Tilføj particle effekt ligesom i Hero
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

export default function About() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const stars = useMemo(() => createStars(50), []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("intro");
  const { t } = useTranslation();

  // Funktion til at håndtere kategori toggle
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const skills = {
    god: {
      title: t("skills.levels.expert"),
      color: "from-green-400 to-emerald-500",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "HTML/CSS",
        "Tailwind CSS",
        "SCSS/SASS",
        "Git",
      ],
    },
    oevet: {
      title: t("skills.levels.intermediate"),
      color: "from-blue-400 to-purple-500",
      items: ["Node.js", "PHP", "REST API", "MySQL", "Express.js", "Jest"],
    },
    begynder: {
      title: t("skills.levels.beginner"),
      color: "from-purple-400 to-pink-500",
      items: ["Docker", "Firebase", "Three.js", "Prisma"],
    },
  };

  const programs = {
    design: {
      title: t("programs.categories.design"),
      items: [
        "Photoshop",
        "Lightroom",
        "Capture One",
        "Figma",
        "Adobe XD",
        "Canva",
      ],
    },
    video: {
      title: t("programs.categories.video"),
      items: ["Premiere Pro"],
    },
    andet: {
      title: t("programs.categories.other"),
      items: [
        "Filhåndtering",
        "Microsoft Office",
        "VS Code",
        "GitHub Desktop",
        "Insomnia",
        "x-code",
      ],
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Animerede baggrundsstjerner */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [star.opacity, 0.2, star.opacity],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent pb-4">
            {t("profile.title")}
          </motion.h2>
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full my-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("profile.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Venstre side - Billede */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group md:sticky md:top-24"
          >
            <div className="relative aspect-square w-[80%] mx-auto">
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-orange-500/10 mix-blend-overlay" />
                <Image
                  src="/profile.jpeg"
                  alt="Portrait"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                  priority
                />
                {/* Tilføj interaktiv hover effekt */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-pink-500/30 to-orange-500/30"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Forbedret glow effekt */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-2xl -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.1, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>

          {/* Højre side - Tekst og Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Tabs Navigation */}
            <div className="flex gap-2 p-1.5 bg-white/5 backdrop-blur-xl rounded-2xl relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {[
                {
                  id: "intro",
                  title: t("nav.about"),
                  icon: "👋",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  id: "education",
                  title: t("education.title"),
                  icon: "🎓",
                  color: "from-blue-500 to-purple-500",
                },
                {
                  id: "skills",
                  title: t("skills.title"),
                  icon: "💻",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  id: "programs",
                  title: t("programs.title"),
                  icon: "🛠",
                  color: "from-orange-500 to-red-500",
                },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-all relative ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10 text-lg"
                    animate={
                      activeTab === tab.id
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {tab.icon}
                  </motion.span>
                  <span className="relative z-10">{tab.title}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                      layoutId="activeTab"
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-50 mix-blend-overlay"
                        animate={{
                          background: [
                            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 100%)",
                            "radial-gradient(circle at 100% 100%, transparent 0%, transparent 100%)",
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* Intro Tab */}
                {activeTab === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-morphism p-8 rounded-2xl border border-white/10 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.p
                      className="text-lg leading-relaxed text-gray-300 relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t("profile.description")}
                    </motion.p>
                  </motion.div>
                )}

                {/* Uddannelse Tab */}
                {activeTab === "education" && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-morphism p-8 rounded-2xl border border-white/10 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="space-y-4 relative z-10">
                      {[
                        { period: "2023-nu", title: "Webudvikler" },
                        {
                          period: "2021",
                          title: "Next Nørrebro, GF2, Fotograf",
                        },
                        {
                          period: "2020-2021",
                          title: "Next Nørrebro, GF1, Medie og Design",
                        },
                        { period: "2019-2020", title: "Allikelund gymnasium" },
                      ].map((edu, index) => (
                        <motion.div
                          key={edu.period}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 relative overflow-hidden group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                          <div className="relative flex items-center gap-4 z-10">
                            <motion.div
                              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2,
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-primary font-medium">
                                {edu.period}
                              </span>
                              <span className="text-gray-300">{edu.title}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-morphism p-8 rounded-2xl border border-white/10 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="space-y-8 relative z-10">
                      {Object.entries(skills).map(
                        ([level, { title, color, items }], categoryIndex) => (
                          <motion.div
                            key={level}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.2 }}
                            className="relative"
                          >
                            <motion.h4
                              className={`text-lg font-medium bg-gradient-to-r ${color} bg-clip-text text-transparent mb-4`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: categoryIndex * 0.2 + 0.1 }}
                            >
                              {title}
                            </motion.h4>
                            <div className="grid grid-cols-2 gap-3">
                              {items.map((skill, index) => (
                                <motion.div
                                  key={skill}
                                  className="flex items-center gap-3 text-gray-300 bg-white/5 px-4 py-3 rounded-xl relative overflow-hidden group"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{
                                    scale: 1.02,
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                  }}
                                >
                                  <motion.div
                                    className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10`}
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  <motion.div
                                    className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: index * 0.1,
                                    }}
                                  />
                                  <span className="relative z-10">{skill}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Programmer Tab */}
                {activeTab === "programs" && (
                  <motion.div
                    key="programs"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-morphism p-8 rounded-2xl border border-white/10 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="space-y-4 relative z-10">
                      {Object.entries(programs).map(
                        ([category, { title, items }], categoryIndex) => (
                          <motion.div
                            key={category}
                            className="rounded-xl overflow-hidden bg-white/5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                          >
                            <motion.button
                              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 relative overflow-hidden group"
                              onClick={() => toggleCategory(category)}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                                <span className="font-medium text-gray-300 relative z-10">
                                  {title}
                                </span>
                              </div>
                              <motion.div
                                animate={{
                                  rotate: openCategory === category ? 180 : 0,
                                }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              </motion.div>
                            </motion.button>
                            <AnimatePresence>
                              {openCategory === category && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                  }}
                                >
                                  <div className="grid grid-cols-2 gap-3 p-4">
                                    {items.map((item, index) => (
                                      <motion.div
                                        key={item}
                                        className="flex items-center gap-3 text-gray-300 bg-black/20 px-4 py-3 rounded-xl relative overflow-hidden group"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{
                                          scale: 1.02,
                                          backgroundColor: "rgba(0,0,0,0.3)",
                                        }}
                                      >
                                        <motion.div
                                          className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                                          animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5],
                                          }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.1,
                                          }}
                                        />
                                        <span className="relative z-10">
                                          {item}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
