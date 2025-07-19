import { useState, useEffect } from 'react';
import { NAVIGATION_ITEMS } from '../../constants';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({ isMobile = false, onItemClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      onItemClick?.();
    }
  };

  const navItemClass = (isActive: boolean) => {
    const baseClass = isMobile
      ? 'block py-2 px-4 text-base font-medium rounded-lg transition-colors duration-200'
      : 'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200';
    
    return isActive
      ? `${baseClass} text-primary bg-primary/10`
      : `${baseClass} text-secondary hover:text-primary hover:bg-gray-100`;
  };

  return (
    <nav>
      <ul className={isMobile ? 'space-y-2' : 'flex space-x-2'}>
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleNavClick(item.id)}
              className={navItemClass(activeSection === item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}