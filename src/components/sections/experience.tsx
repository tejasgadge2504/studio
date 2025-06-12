import type { Experience } from '@/types/portfolio';
import ExperienceCard from '@/components/ui/experience-card';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="bg-primary/5 section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          Work <span className="text-primary">Experience</span>
        </h2>
        {experiences.length > 0 ? (
          <div className="space-y-8 relative">
            {/* Optional: Timeline line decorator */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block transform -translate-x-1/2"></div>
            
            {experiences.map((experience, index) => (
              <div key={experience.id} className="md:flex items-center md:space-x-8 relative">
                {/* Optional: Timeline dot decorator */}
                <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className={index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}>
                     <ExperienceCard experience={experience} />
                </div>
              </div>
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground text-lg">Professional experiences will be listed here soon.</p>
        )}
      </div>
    </section>
  );
}
