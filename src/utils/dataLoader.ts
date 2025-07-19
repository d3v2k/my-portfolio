import type { 
  Project, 
  Experience, 
  Skill, 
  PersonalInfo, 
  SocialLink 
} from '../types';
import {
  validateProjectsData,
  validateExperienceData,
  validateSkillsData,
  validatePersonalData,
  validateSocialData,
  sortProjectsByDate,
  sortExperienceByDate
} from './validation';

// Import JSON data
import projectsData from '../data/projects.json';
import experienceData from '../data/experience.json';
import skillsData from '../data/skills.json';
import personalData from '../data/personal.json';
import socialData from '../data/social.json';

// Validated and processed data
export const projects: Project[] = sortProjectsByDate(validateProjectsData(projectsData));
export const experience: Experience[] = sortExperienceByDate(validateExperienceData(experienceData));
export const skills: Skill[] = validateSkillsData(skillsData);
export const personalInfo: PersonalInfo | null = validatePersonalData(personalData);
export const socialLinks: SocialLink[] = validateSocialData(socialData);

// Utility functions for accessing specific data
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getExperienceById(id: string): Experience | undefined {
  return experience.find(exp => exp.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getCurrentExperience(): Experience | undefined {
  return experience.find(exp => exp.current);
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter(skill => skill.category === category);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category);
}

// Data statistics
export function getDataStats() {
  return {
    totalProjects: projects.length,
    featuredProjects: getFeaturedProjects().length,
    totalExperience: experience.length,
    currentRole: getCurrentExperience()?.role || 'Not specified',
    totalSkills: skills.length,
    skillCategories: [...new Set(skills.map(skill => skill.category))].length,
    socialPlatforms: socialLinks.length
  };
}