import { motion } from 'framer-motion';
import { Download, Award, Code, Users, Coffee } from 'lucide-react';
import { personalInfo, getDataStats } from '../../utils/dataLoader';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function About() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const stats = getDataStats();

  const achievements = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Years of Experience',
      value: '12+',
      description: 'Building scalable web applications'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Projects Completed',
      value: stats.totalProjects.toString(),
      description: 'From concept to deployment'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Technologies Mastered',
      value: stats.totalSkills.toString(),
      description: 'Across full-stack development'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Current Role',
      value: stats.currentRole.split(' ').slice(0, 2).join(' '),
      description: 'A team contributor'
    }
  ];

  const highlights = [
    'Expert in .NET Core/8, C#, and modern web technologies',
    'Proficient in Angular, React, TypeScript, and responsive design',
    'Experience with cloud platforms (Azure) and DevOps practices',
    'Strong background in database design and optimization',
    'Passionate about clean code and test-driven development',
    'Excellent problem-solving and team collaboration skills'
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max-width">
        <motion.div
          ref={ref as any}
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div>
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
              >
                About Me
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6"
              />
            </div>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {personalInfo?.summary}
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-xl font-semibold text-secondary mb-3">
                What I Bring to the Table
              </h3>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resume Download */}
            {personalInfo?.resumeUrl && (
              <motion.div variants={fadeInUp} className="pt-4">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 btn-primary hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Professional Photo Placeholder */}
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent p-1 mb-4">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-bold text-primary">
                        {personalInfo?.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">
                      {personalInfo?.name}
                    </h3>
                    <p className="text-gray-600">
                      {personalInfo?.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {personalInfo?.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="text-primary mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {achievement.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6"
            >
              <h4 className="font-semibold text-secondary mb-3">
                Let's Connect
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <a 
                    href={`mailto:${personalInfo?.email}`}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {personalInfo?.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{personalInfo?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <span>Available for new opportunities</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}