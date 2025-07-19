import {
  projects,
  experience,
  skills,
  personalInfo,
  socialLinks,
  getProjectById,
  getFeaturedProjects,
  getCurrentExperience,
  getSkillsByCategory,
  getDataStats
} from '../dataLoader';

describe('Data Loader', () => {
  describe('Data Import', () => {
    it('should load projects data', () => {
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it('should load experience data', () => {
      expect(Array.isArray(experience)).toBe(true);
      expect(experience.length).toBeGreaterThan(0);
    });

    it('should load skills data', () => {
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
    });

    it('should load personal info', () => {
      expect(personalInfo).toBeTruthy();
      expect(personalInfo?.name).toBeTruthy();
    });

    it('should load social links', () => {
      expect(Array.isArray(socialLinks)).toBe(true);
      expect(socialLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Utility Functions', () => {
    it('should find project by id', () => {
      const firstProject = projects[0];
      const foundProject = getProjectById(firstProject.id);
      expect(foundProject).toEqual(firstProject);
    });

    it('should return undefined for non-existent project id', () => {
      const foundProject = getProjectById('non-existent-id');
      expect(foundProject).toBeUndefined();
    });

    it('should get featured projects', () => {
      const featured = getFeaturedProjects();
      expect(Array.isArray(featured)).toBe(true);
      featured.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });

    it('should get current experience', () => {
      const current = getCurrentExperience();
      if (current) {
        expect(current.current).toBe(true);
      }
    });

    it('should get skills by category', () => {
      const frontendSkills = getSkillsByCategory('frontend');
      expect(Array.isArray(frontendSkills)).toBe(true);
      frontendSkills.forEach(skill => {
        expect(skill.category).toBe('frontend');
      });
    });

    it('should generate data statistics', () => {
      const stats = getDataStats();
      expect(typeof stats.totalProjects).toBe('number');
      expect(typeof stats.featuredProjects).toBe('number');
      expect(typeof stats.totalExperience).toBe('number');
      expect(typeof stats.currentRole).toBe('string');
      expect(typeof stats.totalSkills).toBe('number');
      expect(typeof stats.skillCategories).toBe('number');
      expect(typeof stats.socialPlatforms).toBe('number');
    });
  });

  describe('Data Integrity', () => {
    it('should have projects sorted by date (newest first)', () => {
      for (let i = 0; i < projects.length - 1; i++) {
        const currentDate = new Date(projects[i].startDate);
        const nextDate = new Date(projects[i + 1].startDate);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should have experience sorted by date (newest first)', () => {
      for (let i = 0; i < experience.length - 1; i++) {
        const currentDate = new Date(experience[i].startDate);
        const nextDate = new Date(experience[i + 1].startDate);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should have valid project categories', () => {
      const validCategories = ['web', 'api', 'desktop', 'mobile'];
      projects.forEach(project => {
        expect(validCategories).toContain(project.category);
      });
    });

    it('should have valid skill categories', () => {
      const validCategories = ['frontend', 'backend', 'database', 'tools', 'other'];
      skills.forEach(skill => {
        expect(validCategories).toContain(skill.category);
      });
    });
  });
});