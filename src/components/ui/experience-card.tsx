import type { Experience } from '@/types/portfolio';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start space-x-4 pb-3">
        {experience.logo && (
          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              layout="fill"
              objectFit="contain"
              data-ai-hint={experience.logoAiHint || 'company logo'}
            />
          </div>
        )}
        <div className="flex-grow">
          <CardTitle className="font-headline text-xl">{experience.role}</CardTitle>
          <CardDescription className="text-primary font-semibold">{experience.company}</CardDescription>
          <p className="text-xs text-muted-foreground mt-1">{experience.duration}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {experience.responsibilities.map((resp, index) => (
            <li key={index} className="flex items-start text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
