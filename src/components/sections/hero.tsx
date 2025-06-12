import type { ProfileData, TechStackItem } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import TechCloud from '@/components/ui/tech-cloud';

interface HeroSectionProps {
  profile: ProfileData;
  techStack: Pick<TechStackItem, 'name' | 'iconName'>[];
}

export default function HeroSection({ profile, techStack }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-background to-primary/5 section-fade-in pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-fade-in">
            {profile.name}
          </span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {profile.tagline}
        </p>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <TechCloud items={techStack.slice(0, 10)} /> {/* Show a subset for visual balance */}
        </div>
        <div className="mt-12 space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button asChild size="lg" className="font-semibold shadow-lg hover:shadow-primary/50 transition-shadow">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg hover:shadow-primary/30 transition-shadow">
            <Link href="#contact">Get In Touch <ArrowDown className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
