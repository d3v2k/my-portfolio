import type { 
  Project, 
  Experience, 
  Skill, 
  PersonalInfo, 
  SocialLink, 
  ContactForm, 
  ValidationError 
} from '../types';

// Type guards for runtime type checking
export function isProject(obj: any): obj is Project {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.longDescription === 'string' &&
    Array.isArray(obj.technologies) &&
    Array.isArray(obj.images) &&
    typeof obj.featured === 'boolean' &&
    ['web', 'api', 'desktop', 'mobile'].includes(obj.category) &&
    typeof obj.startDate === 'string'
  );
}

export function isExperience(obj: any): obj is Experience {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.company === 'string' &&
    typeof obj.role === 'string' &&
    typeof obj.startDate === 'string' &&
    typeof obj.location === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.achievements) &&
    Array.isArray(obj.technologies) &&
    typeof obj.current === 'boolean'
  );
}

export function isSkill(obj: any): obj is Skill {
  return (
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    ['frontend', 'backend', 'database', 'tools', 'other'].includes(obj.category)
  );
}

export function isPersonalInfo(obj: any): obj is PersonalInfo {
  return (
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.location === 'string' &&
    typeof obj.summary === 'string'
  );
}

export function isSocialLink(obj: any): obj is SocialLink {
  return (
    typeof obj === 'object' &&
    typeof obj.platform === 'string' &&
    typeof obj.url === 'string' &&
    typeof obj.icon === 'string'
  );
}

// Validation functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactForm(form: ContactForm): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!form.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (form.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!form.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(form.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!form.subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (form.subject.trim().length < 5) {
    errors.push({ field: 'subject', message: 'Subject must be at least 5 characters' });
  }

  if (!form.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (form.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return errors;
}

// Data validation for JSON imports
export function validateProjectsData(data: any[]): Project[] {
  return data.filter(isProject);
}

export function validateExperienceData(data: any[]): Experience[] {
  return data.filter(isExperience);
}

export function validateSkillsData(data: any[]): Skill[] {
  return data.filter(isSkill);
}

export function validatePersonalData(data: any): PersonalInfo | null {
  return isPersonalInfo(data) ? data : null;
}

export function validateSocialData(data: any[]): SocialLink[] {
  return data.filter(isSocialLink);
}

// Utility functions for data processing
export function sortProjectsByDate(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortExperienceByDate(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}

export function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(project => project.featured);
}