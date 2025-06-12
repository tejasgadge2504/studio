'use client';

import type { Project } from '@/types/portfolio';
import ProjectCard from '@/components/ui/project-card';
import ProjectModal from '@/components/ui/project-modal';
import { useState } from 'react';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing project to allow modal to animate out
    setTimeout(() => setSelectedProject(null), 300); 
  };

  return (
    <section id="projects" className="section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          My <span className="text-primary">Projects</span>
        </h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No projects to display yet. Check back soon!</p>
        )}
      </div>
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
