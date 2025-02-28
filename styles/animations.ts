export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      bounce: 0.3,
    },
  },
};

export const buttonHoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.5)",
  },
  tap: { scale: 0.95 },
};

export const commonTransitions = {
  spring: { type: "spring", stiffness: 400 },
  smooth: { duration: 0.3 },
  smoothSpring: { type: "spring", stiffness: 100 },
};

export const commonAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
}; 