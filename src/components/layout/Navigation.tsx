import { motion } from 'framer-motion';
import { NAVIGATION_ITEMS } from '../../constants';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useScrollSpy } from '../../hooks/useScrollSpy';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({ isMobile = false, onItemClick }: NavigationProps) {
  // Use the scrollSpy hook to track active section
  const sectionIds = NAVIGATION_ITEMS.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds);
  
  // Use the smooth scroll hook for better scrolling experience
  const { scrollToElement } = useSmoothScroll();

  const handleNavClick = (id: string) => {
    // Use our custom smooth scroll instead of native scrollIntoView
    scrollToElement(id, { 
      offset: 80,
      duration: 800
    });
    
    // Call the onItemClick callback if provided (for mobile menu closing)
    onItemClick?.();
  };

  const navItemClass = (isActive: boolean) => {
    const baseClass = isMobile
      ? 'block py-2 px-4 text-base font-medium rounded-lg transition-colors duration-200'
      : 'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200';
    
    return isActive
      ? `${baseClass} text-primary bg-primary/10`
      : `${baseClass} text-secondary hover:text-primary hover:bg-gray-100`;
  };

  // Animation variants for navigation items
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Animation for the active indicator
  const activeIndicatorVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: '100%', opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <nav>
      <motion.ul 
        className={isMobile ? 'space-y-2' : 'flex space-x-2'}
        initial="hidden"
        animate="visible"
        variants={isMobile ? {
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        } : {}}
      >
        {NAVIGATION_ITEMS.map((item, index) => (
          <motion.li 
            key={item.id}
            custom={index}
            variants={navItemVariants}
          >
            <button
              onClick={() => handleNavClick(item.id)}
              className={navItemClass(activeSection === item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <div className="relative">
                {item.label}
                {activeSection === item.id && !isMobile && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                    initial="initial"
                    animate="animate"
                    variants={activeIndicatorVariants}
                  />
                )}
              </div>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
}