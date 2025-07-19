// Core data interfaces for the portfolio application

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'web' | 'api' | 'desktop' | 'mobile';
  startDate: string;
  endDate?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
  current: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
  yearsOfExperience?: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  summary: string;
  avatar?: string;
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Utility types for form validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}