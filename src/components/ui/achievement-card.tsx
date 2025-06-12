import type { Achievement } from '@/types/portfolio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const IconComponent = achievement.iconName ? LucideIcons[achievement.iconName as keyof typeof LucideIcons] || LucideIcons.Award : LucideIcons.Award;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <IconComponent className="w-10 h-10 text-primary" />
        <div>
          <CardTitle className="font-headline text-lg line-clamp-2">{achievement.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{achievement.year}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
        {achievement.link && achievement.link !== "#" && (
          <Link href={achievement.link} target="_blank" rel="noopener noreferrer" 
                className="text-xs text-primary hover:underline inline-flex items-center">
            Learn More <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
