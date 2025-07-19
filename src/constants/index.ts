import type { NavItem } from '../types';

// Navigation configuration
export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

// Animation configurations
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8
};

export const ANIMATION_EASING = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Contact form configuration
export const CONTACT_FORM_CONFIG = {
  maxNameLength: 100,
  maxSubjectLength: 200,
  maxMessageLength: 1000,
  minNameLength: 2,
  minSubjectLength: 5,
  minMessageLength: 10
};

// Project categories
export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Applications' },
  { value: 'api', label: 'APIs & Services' },
  { value: 'desktop', label: 'Desktop Apps' },
  { value: 'mobile', label: 'Mobile Apps' }
];

// Skill categories with display names
export const SKILL_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & DevOps',
  other: 'Other'
};

// Social platform configurations
export const SOCIAL_PLATFORMS = {
  github: { name: 'GitHub', color: '#333' },
  linkedin: { name: 'LinkedIn', color: '#0077B5' },
  twitter: { name: 'Twitter', color: '#1DA1F2' },
  stackoverflow: { name: 'Stack Overflow', color: '#FF7A00' },
  devto: { name: 'Dev.to', color: '#0A0A0A' }
};

// SEO and meta information
export const SEO_CONFIG = {
  siteName: 'John Developer - Full Stack .NET Developer',
  siteDescription: 'Experienced full stack .NET developer specializing in C#, React, and cloud technologies. View my portfolio of web applications, APIs, and software solutions.',
  siteUrl: 'https://johndeveloper.dev',
  author: 'John Developer',
  keywords: [
    '.NET Developer',
    'Full Stack Developer',
    'C# Developer',
    'React Developer',
    'Web Development',
    'API Development',
    'Software Engineer'
  ]
};

// Performance and optimization settings
export const PERFORMANCE_CONFIG = {
  imageOptimization: {
    quality: 85,
    formats: ['webp', 'jpg'],
    sizes: [400, 800, 1200, 1600]
  },
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1
  }
};