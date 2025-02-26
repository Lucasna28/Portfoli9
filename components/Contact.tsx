"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { useTranslation } from "@/components/LanguageSwitch";
import { MAX_MESSAGE_LENGTH } from "@/translations";

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const SuccessAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Centrale stråler */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "2px",
            height: "100px",
            background: "linear-gradient(to top, transparent, #22c55e)",
            transform: `rotate(${i * 30}deg)`,
            transformOrigin: "bottom",
          }}
        />
      ))}

      {/* Ekspanderende ringe */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute inset-0 border-2 border-green-500 rounded-full"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.2, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}

      {/* Partikler */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-green-500 rounded-full"
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            left: "50%",
            top: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default function Contact() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    if (nameInput) {
      nameInput.focus();
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = t("contact.form.errors.name");
    }

    if (!formState.email.trim()) {
      newErrors.email = t("contact.form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = t("contact.form.errors.emailInvalid");
    }

    if (!formState.subject.trim()) {
      newErrors.subject = t("contact.form.errors.subject");
    }

    if (!formState.message.trim()) {
      newErrors.message = t("contact.form.errors.message");
    } else if (formState.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = t("contact.form.errors.messageLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Der opstod en fejl");
      }

      setFormStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Fejl ved afsendelse:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Der opstod en uventet fejl"
      );
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:lucas.n.a@icloud.com",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/lucasna28",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/lucas-n-anderson-446072307",
      color: "from-blue-500/20 to-cyan-500/20",
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <Sparkles className="w-7 h-7 text-primary animate-pulse" />
            <h2 className="text-5xl font-bold text-gradient">
              {t("contact.title")}
            </h2>
            <Sparkles className="w-7 h-7 text-primary animate-pulse" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Venstre side - Kontaktformular */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl shadow-lg shadow-primary/5 relative overflow-hidden">
              {/* Success overlay med animation */}
              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <SuccessAnimation />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="text-center p-6 relative z-20"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      </motion.div>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-medium text-white"
                      >
                        {t("contact.form.success.title")}
                      </motion.p>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 mt-2"
                      >
                        {t("contact.form.success.message")}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}

                {/* Error overlay */}
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.5 }}
                      className="text-center p-6"
                    >
                      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <p className="text-xl font-medium text-white">
                        {t("contact.form.error.title")}
                      </p>
                      <p className="text-gray-300 mt-2">
                        {errorMessage || t("contact.form.error.message")}
                      </p>
                      <motion.button
                        onClick={() => setFormStatus("idle")}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg
                                 flex items-center gap-2 mx-auto transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-4 h-4" />
                        <span>{t("contact.form.error.close")}</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-300 mb-1">
                    {t("contact.form.name")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.namePlaceholder")}
                      className={`w-full bg-white/5 border ${
                        errors.name ? "border-red-500/50" : "border-white/10"
                      } rounded-xl px-5 py-3
                               focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                               transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm mt-1 block"
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-300 mb-1">
                    {t("contact.form.email")}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.emailPlaceholder")}
                      className={`w-full bg-white/5 border ${
                        errors.email ? "border-red-500/50" : "border-white/10"
                      } rounded-xl px-5 py-3
                               focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                               transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm mt-1 block"
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-300 mb-1">
                    {t("contact.form.subject")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subjectPlaceholder")}
                      className={`w-full bg-white/5 border ${
                        errors.subject ? "border-red-500/50" : "border-white/10"
                      } rounded-xl px-5 py-3
                               focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                               transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm mt-1 block"
                        >
                          {errors.subject}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-300 mb-1">
                    {t("contact.form.message")}
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={4}
                      maxLength={MAX_MESSAGE_LENGTH}
                      className={`w-full bg-white/5 border ${
                        errors.message ? "border-red-500/50" : "border-white/10"
                      } rounded-xl px-5 py-3
                               focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                               transition-all duration-300 resize-none`}
                    />
                    <div className="flex justify-end mt-1">
                      <span
                        className={`text-sm ${
                          formState.message.length > MAX_MESSAGE_LENGTH * 0.9
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {formState.message.length}/{MAX_MESSAGE_LENGTH}
                      </span>
                    </div>
                    <AnimatePresence>
                      {errors.message && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm mt-1 block"
                        >
                          {errors.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={`w-full bg-gradient-to-r relative overflow-hidden
                           ${
                             formStatus === "submitting"
                               ? "from-primary/70 to-primary/60"
                               : "from-primary/90 to-primary hover:from-primary hover:to-primary/90"
                           }
                           text-white rounded-xl px-8 py-3
                           flex items-center justify-center gap-3 
                           transition-all duration-300 hover:shadow-glow
                           disabled:cursor-not-allowed`}
                  whileHover={{ scale: formStatus === "submitting" ? 1 : 1.02 }}
                  whileTap={{ scale: formStatus === "submitting" ? 1 : 0.98 }}
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t("contact.form.sending")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("contact.form.send")}</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Højre side - Social links og info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-gradient-primary">
                {t("contact.subtitle")}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {t("contact.availability")}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 min-w-[120px] glass-hover rounded-lg p-3
                             flex items-center justify-center gap-2 relative
                             overflow-hidden group`}
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered(null)}
                    whileHover={{ y: -2 }}
                  >
                    {/* Animated background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0
                                group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <link.icon className="w-5 h-5 relative z-10" />
                    <span className="text-sm relative z-10">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
