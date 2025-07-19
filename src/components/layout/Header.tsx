import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import { personalInfo } from '../../utils/dataLoader';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max-width">
        <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a
              href="#home"
              className="text-xl font-bold text-secondary hover:text-primary transition-colors duration-200"
            >
              {personalInfo?.name}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-secondary" />
            ) : (
              <Menu className="w-6 h-6 text-secondary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 px-4 sm:px-6">
              <Navigation 
                isMobile={true} 
                onItemClick={() => setIsMobileMenuOpen(false)} 
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}