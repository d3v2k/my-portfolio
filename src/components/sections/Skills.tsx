import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainer, fadeInUp, scaleIn } from '../../utils/animations';
import { groupSkillsByCategory } from '../../utils/validation';
import { loadSkillsData } from '../../utils/dataLoader';
import type { Skill } from '../../types';
import { useState, useEffect } from 'react';

// Skill level colors and indicators
const skillLevelConfig = {
  beginner: { color: 'bg-yellow-400', label: 'Beginner', percentage: 25 },
  intermediate: { color: 'bg-blue-400', label: 'Intermediate', percentage: 50 },
  advanced: { color: 'bg-green-400', label: 'Advanced', percentage: 75 },
  expert: { color: 'bg-purple-400', label: 'Expert', percentage: 100 },
};

// Category display configuration
const categoryConfig = {
  frontend: { title: 'Frontend', icon: '🎨', color: 'border-blue-200 bg-blue-50' },
  backend: { title: 'Backend', icon: '⚙️', color: 'border-green-200 bg-green-50' },
  database: { title: 'Database', icon: '🗄️', color: 'border-purple-200 bg-purple-50' },
  tools: { title: 'Tools & DevOps', icon: '🛠️', color: 'border-orange-200 bg-orange-50' },
  other: { title: 'Other', icon: '📚', color: 'border-gray-200 bg-gray-50' },
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const levelConfig = skill.level ? skillLevelConfig[skill.level] : null;
  
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm">{skill.name}</h4>
        {levelConfig && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${levelConfig.color}`}>
            {levelConfig.label}
          </span>
        )}
      </div>
      
      {/* Skill level indicator bar */}
      {levelConfig && (
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${levelConfig.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${levelConfig.percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </div>
      )}
      
      {/* Years of experience */}
      {skill.yearsOfExperience && (
        <p className="text-xs text-gray-600">
          {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
        </p>
      )}
    </motion.div>
  );
}

interface SkillCategoryProps {
  category: string;
  skills: Skill[];
  index: number;
}

function SkillCategory({ category, skills, index }: SkillCategoryProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.other;
  
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className={`rounded-xl p-6 border-2 ${config.color}`}
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3" role="img" aria-label={config.title}>
          {config.icon}
        </span>
        <h3 className="text-xl font-bold text-gray-900">{config.title}</h3>
        <span className="ml-auto text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
          {skills.length} skill{skills.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill, skillIndex) => (
          <SkillCard key={skill.name} skill={skill} index={skillIndex} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const skillsData = await loadSkillsData();
        setSkills(skillsData);
      } catch (err) {
        setError('Failed to load skills data');
        console.error('Error loading skills:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const groupedSkills = groupSkillsByCategory(skills);
  const categoryOrder = ['frontend', 'backend', 'database', 'tools', 'other'];
  const orderedCategories = categoryOrder.filter(cat => groupedSkills[cat]?.length > 0);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A comprehensive overview of my technical expertise across different domains,
            from frontend development to backend systems and DevOps tools.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {orderedCategories.map((category, index) => (
            <SkillCategory
              key={category}
              category={category}
              skills={groupedSkills[category]}
              index={index}
            />
          ))}
        </motion.div>

        {/* Skills summary */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Skills Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(skillLevelConfig).map(([level, config]) => {
                const count = skills.filter(skill => skill.level === level).length;
                return (
                  <div key={level} className="text-center">
                    <div className={`w-12 h-12 ${config.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                      <span className="text-white font-bold">{count}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{config.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}