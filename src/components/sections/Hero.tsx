import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { personalInfo } from '../../utils/dataLoader';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  const roles = [
    'Full Stack .NET Developer',
    'Angular Developer',
    'Software Engineer',
    'API Developer',
    'Problem Solver'
  ];

  const currentRole = roles[currentIndex];

  // Typing animation effect
  useEffect(() => {
    if (!isIntersecting) return;

    const typeText = async () => {
      // Type out the current role
      for (let i = 0; i <= currentRole.length; i++) {
        setDisplayedText(currentRole.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Wait before starting to delete
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Delete the current role
      for (let i = currentRole.length; i >= 0; i--) {
        setDisplayedText(currentRole.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Move to next role
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    };

    typeText();
  }, [currentIndex, currentRole, isIntersecting]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max-width relative z-10">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isIntersecting ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent p-1">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-primary">
                {personalInfo?.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-4">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {personalInfo?.name.split(' ')[0]}
              </span>
            </h1>
            
            <div className="text-xl sm:text-2xl lg:text-3xl text-gray-600 h-12 flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="text-primary font-semibold min-w-[300px] text-left">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {personalInfo?.summary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={scrollToProjects}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              View My Work
            </button>
            
            <button
              onClick={scrollToContact}
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </button>

            {personalInfo?.resumeUrl && (
              <a
                href={personalInfo.resumeUrl}
                download
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200 text-lg font-medium"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400 hover:text-primary transition-colors duration-200" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}