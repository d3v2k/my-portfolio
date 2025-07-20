import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { validateContactForm } from '../../utils/validation';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import type { ContactForm, ValidationError } from '../../types';

// Contact information data
const contactInfo = {
  email: 'april.galea@live.com.ph',
  phone: '+639175614213',
  location: 'Philippines',
  availability: 'Available for new opportunities'
};

const socialLinks = [
  {
    platform: 'GitHub',
    url: "https://github.com/d3v2k",
    icon: '🔗',
    label: 'View my code repositories'
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/april-galea-4452233b/',
    icon: '💼',
    label: 'Connect on LinkedIn'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific errors when user starts typing
    if (errors.some(error => error.field === name)) {
      setErrors(prev => prev.filter(error => error.field !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Ready to discuss your next project or opportunity? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📧</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                      aria-label={`Send email to ${contactInfo.email}`}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📱</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                      aria-label={`Call ${contactInfo.phone}`}
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{contactInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">✅</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-green-600 font-medium">{contactInfo.availability}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Connect on Social
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label={link.label}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      getFieldError('name') 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Your full name"
                    aria-describedby={getFieldError('name') ? 'name-error' : undefined}
                    aria-invalid={!!getFieldError('name')}
                  />
                  {getFieldError('name') && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {getFieldError('name')}
                    </p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      getFieldError('email') 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="your.email@example.com"
                    aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                    aria-invalid={!!getFieldError('email')}
                  />
                  {getFieldError('email') && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {getFieldError('email')}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    getFieldError('subject') 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="What would you like to discuss?"
                  aria-describedby={getFieldError('subject') ? 'subject-error' : undefined}
                  aria-invalid={!!getFieldError('subject')}
                />
                {getFieldError('subject') && (
                  <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                    {getFieldError('subject')}
                  </p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                    getFieldError('message') 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Tell me about your project or opportunity..."
                  aria-describedby={getFieldError('message') ? 'message-error' : undefined}
                  aria-invalid={!!getFieldError('message')}
                />
                {getFieldError('message') && (
                  <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                    {getFieldError('message')}
                  </p>
                )}
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg" role="alert">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <p className="text-green-800">
                      Thank you for your message! I'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-2">❌</span>
                    <p className="text-red-800">
                      Sorry, there was an error sending your message. Please try again or contact me directly.
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}