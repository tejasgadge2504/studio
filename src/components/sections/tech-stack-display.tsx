import type { TechStackItem } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import * as LucideIcons from 'lucide-react';

interface TechStackDisplaySectionProps {
  techStack: TechStackItem[];
}

export default function TechStackDisplaySection({ techStack }: TechStackDisplaySectionProps) {
  const categories = Array.from(new Set(techStack.map(item => item.category)));

  return (
    <section id="tech-stack" className="section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          Technical <span className="text-primary">Skills</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => {
            const itemsInCategory = techStack.filter(item => item.category === category);
            return (
              <Card key={category} className="shadow-lg hover:shadow-primary/20 transition-shadow">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary">{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {itemsInCategory.map(item => {
                    const IconComponent = LucideIcons[item.iconName as keyof typeof LucideIcons] || LucideIcons.Cog;
                    return (
                      <div key={item.id}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="w-5 h-5 text-muted-foreground" />
                            <span className="text-md font-medium text-foreground">{item.name}</span>
                          </div>
                          {item.proficiency && (
                            <span className="text-sm text-muted-foreground">{item.proficiency}%</span>
                          )}
                        </div>
                        {item.proficiency && (
                          <Progress value={item.proficiency} className="h-2" />
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
