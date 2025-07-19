import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '../../utils/animations';
import { loadExperienceData } from '../../utils/dataLoader';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ExperienceCard({ experience, index, isExpanded, onToggle }: ExperienceCardProps) {
  const isEven = index % 2 === 0;
  const cardVariant = isEven ? fadeInLeft : fadeInRight;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  return (
    <motion.div
      variants={cardVariant}
      custom={index}
      className={`relative flex items-center mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 md:block hidden"></div>
      
      {/* Card content */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ y: -2 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{experience.role}</h3>
              <p className="text-lg font-semibold text-blue-600 mb-2">{experience.company}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span>{formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}</span>
                <span className="text-gray-400">•</span>
                <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
                {experience.current && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Current</span>
                  </>
                )}
              </div>
              <p className="text-gray-600 mt-2">{experience.location}</p>
            </div>
            {experience.companyLogo && (
              <div className="ml-4 flex-shrink-0">
                <img 
                  src={experience.companyLogo} 
                  alt={`${experience.company} logo`}
                  className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed">{experience.description}</p>

          {/* Expand/Collapse button */}
          <button
            onClick={onToggle}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
            <motion.svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          {/* Expandable content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="text-gray-700 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const { ref } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const experienceData = await loadExperienceData();
        setExperiences(experienceData);
      } catch (err) {
        setError('Failed to load experience data');
        console.error('Error loading experience:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleCard = (experienceId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(experienceId)) {
        newSet.delete(experienceId);
      } else {
        newSet.add(experienceId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600">Loading experience data...</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full hidden md:block"></div>
            <div className="space-y-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-gray-600">No experience data found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A journey through my professional career, highlighting key roles, achievements, 
            and the technologies I've worked with to deliver impactful solutions.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden md:block"></div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isExpanded={expandedCards.has(experience.id)}
                onToggle={() => toggleCard(experience.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-16 bg-white rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Career Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{experiences.length}</div>
              <p className="text-gray-600">Positions Held</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.max(...experiences.map(exp => {
                  const start = new Date(exp.startDate);
                  const end = exp.endDate ? new Date(exp.endDate) : new Date();
                  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
                }))}+
              </div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {[...new Set(experiences.flatMap(exp => exp.technologies))].length}
              </div>
              <p className="text-gray-600">Technologies Used</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}