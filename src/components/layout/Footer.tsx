import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { socialLinks, personalInfo } from '../../utils/dataLoader';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container-max-width">
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <Mail className="w-4 h-4 inline mr-2" />
                  {personalInfo?.email}
                </p>
                <p className="text-gray-300">
                  📍 {personalInfo?.location}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About Me
                </a>
                <a
                  href="#projects"
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 rounded-lg hover:bg-primary transition-colors duration-200"
                    aria-label={`Visit my ${social.platform} profile`}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300 flex items-center justify-center">
              © {currentYear} {personalInfo?.name}. Made with{' '}
              <Heart className="w-4 h-4 mx-1 text-red-500" /> using React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}