'use client';

import type { Project } from '@/types/portfolio';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Calendar, Users, Briefcase, Settings } from 'lucide-react';
import Link from 'next/link';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-primary">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{project.domain}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={project.imageAiHint}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {project.duration && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground"><strong>Duration:</strong> {project.duration}</span>
              </div>
            )}
            {project.client && (
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground"><strong>Client:</strong> {project.client}</span>
              </div>
            )}
             <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground"><strong>Service:</strong> {project.service}</span>
              </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-foreground">Description</h4>
            <p className="text-muted-foreground leading-relaxed">{project.longDescription || project.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-foreground">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6 sm:justify-start space-x-2">
          {project.liveLink && project.liveLink !== "#" && (
            <Button asChild>
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoLink && project.repoLink !== "#" && (
            <Button asChild variant="outline">
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Code
              </Link>
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
