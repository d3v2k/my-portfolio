import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import OptimizedImage from '../ui/OptimizedImage';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { projects } from '../../utils/dataLoader';
import type { Project } from '../../types';

// Project categories for filtering
const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Applications' },
  { id: 'api', label: 'APIs & Services' },
  { id: 'desktop', label: 'Desktop Apps' },
  { id: 'mobile', label: 'Mobile Apps' },
];

// Technology filters
const TECHNOLOGY_FILTERS = [
  'All',
  '.NET Core',
  '.NET 8',
  'C#',
  'React',
  'Angular',
  'TypeScript',
  'SQL Server',
  'PostgreSQL',
  'Azure',
  'Docker',
];

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {/* Project Image */}
        <div className="relative h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
          {project.images.length > 0 ? (
            <OptimizedImage
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📁</div>
                <div className="text-sm">{project.title}</div>
              </div>
            </div>
          )}
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-4 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(project.startDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
            {project.endDate && (
              <>
                {' - '}
                {new Date(project.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => onViewDetails(project)}
              variant="primary"
              size="sm"
              className="flex-1"
            >
              View Details
            </Button>
            
            {project.liveUrl && (
              <Button
                onClick={() => window.open(project.liveUrl, '_blank')}
                variant="outline"
                size="sm"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            
            {project.githubUrl && (
              <Button
                onClick={() => window.open(project.githubUrl, '_blank')}
                variant="outline"
                size="sm"
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      size="xl"
    >
      <div className="space-y-6">
        {/* Image Gallery */}
        {project.images.length > 0 && (
          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <OptimizedImage
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={true}
              />
            </div>
            
            {/* Image Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  →
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Timeline */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h4>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(project.startDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
              {project.endDate && (
                <>
                  {' - '}
                  {new Date(project.endDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </>
              )}
              {!project.endDate && ' - Present'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {project.liveUrl && (
              <Button
                onClick={() => window.open(project.liveUrl, '_blank')}
                variant="primary"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Demo
              </Button>
            )}
            
            {project.githubUrl && (
              <Button
                onClick={() => window.open(project.githubUrl, '_blank')}
                variant="outline"
              >
                <Github className="h-4 w-4 mr-2" />
                View Source Code
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function Projects() {
  const [projectsData] = useState<Project[]>(projects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on selected category and technology
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const technologyMatch = selectedTechnology === 'All' || 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(selectedTechnology.toLowerCase())
        );
      
      return categoryMatch && technologyMatch;
    });
  }, [projectsData, selectedCategory, selectedTechnology]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of my recent work in full-stack development, 
              featuring modern web applications, APIs, and desktop solutions.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Technology:</span>
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {TECHNOLOGY_FILTERS.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                custom={index}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={fadeInUp}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more projects.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}