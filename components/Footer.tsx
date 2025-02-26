"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/components/LanguageSwitch";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:lucas.n.a@icloud.com",
      color: "hover:bg-green-500/20",
      ariaLabel: t("footer.social.email"),
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/lucasna28",
      color: "hover:bg-purple-500/20",
      ariaLabel: t("footer.social.github"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/lucas-anderson-446072307",
      color: "hover:bg-blue-500/20",
      ariaLabel: t("footer.social.linkedin"),
    },
  ];

  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Baggrundsgradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "0",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center justify-center md:justify-start gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/logo.png"
                alt={t("footer.logo.alt")}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary">
                  Lucas Anderson
                </h3>
                <p className="text-gray-400 text-sm">{t("footer.role")}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full bg-white/5 backdrop-blur-sm 
                          ${link.color} transition-all duration-300
                          border border-white/10 hover:border-white/20
                          shadow-lg shadow-black/5 hover:shadow-xl`}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center md:text-right text-gray-400"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="flex items-center justify-center md:justify-end gap-2 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              {t("footer.tech")}
            </motion.p>
            <p className="mt-2 text-xs text-gray-500">
              © {new Date().getFullYear()} Lucas Anderson. {t("footer.rights")}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
