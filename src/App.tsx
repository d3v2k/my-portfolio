import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

// Lazy load section components
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Skeleton loader for sections
function SectionSkeleton() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use actual asset loading instead of timeout
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
      return () => {}; // Return empty cleanup function for consistency
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Animation variants for page loading
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
      }
    }
  };

  // Loading animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.5
            }
          }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-10 h-10 rounded-full border-t-2 border-r-2 border-primary"
            />
          </motion.div>
          <p className="text-secondary font-medium">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-gray-50"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Header />
        <main>
          <motion.section 
            id="home"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <Hero />
            </Suspense>
          </motion.section>
          
          <motion.section 
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <About />
            </Suspense>
          </motion.section>
          
          <motion.section 
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <Skills />
            </Suspense>
          </motion.section>
          
          <motion.section 
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <Experience />
            </Suspense>
          </motion.section>
          
          <motion.section 
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <Projects />
            </Suspense>
          </motion.section>
          
          <motion.section 
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <Contact />
            </Suspense>
          </motion.section>
        </main>
        <Footer />
        <ScrollToTop showBelow={300} />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
