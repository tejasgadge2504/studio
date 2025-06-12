import type { Project } from '@/types/portfolio';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={project.imageAiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="text-primary font-semibold">{project.domain}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={() => onViewDetails(project)}>
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
