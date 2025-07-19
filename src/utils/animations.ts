import type { Variants } from 'framer-motion';

// Common animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
};

export const hoverLift = {
  y: -5,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

// Typing animation utility
export const createTypingAnimation = (text: string, speed: number = 100) => {
  return {
    hidden: { width: 0 },
    visible: {
      width: 'auto',
      transition: {
        duration: (text.length * speed) / 1000,
        ease: 'linear',
      },
    },
  };
};

// Loading animations
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Card animations
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Button animations
export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: 'easeInOut',
  },
};

// Progress bar animation
export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      delay: 0.5,
    },
  }),
};

// Reveal animations for sections
export const revealSection: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Skills-specific animations
export const skillCardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export const skillProgressBar: Variants = {
  hidden: { width: 0 },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      delay: 0.3,
    },
  }),
};