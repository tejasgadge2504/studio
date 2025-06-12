import type { Achievement } from '@/types/portfolio';
import AchievementCard from '@/components/ui/achievement-card';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="bg-primary/5 section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          My <span className="text-primary">Achievements</span>
        </h2>
        {achievements.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {achievements.map((achievement) => (
             <AchievementCard key={achievement.id} achievement={achievement} />
           ))}
         </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">Key achievements will be highlighted here soon.</p>
        )}
      </div>
    </section>
  );
}
