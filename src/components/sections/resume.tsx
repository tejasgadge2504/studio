import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';
import type { ProfileData } from '@/types/portfolio';

interface ResumeSectionProps {
  profile: Pick<ProfileData, 'resumeUrl'>;
}

export default function ResumeSection({ profile }: ResumeSectionProps) {
  return (
    <section id="resume" className="text-center section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">
          My <span className="text-primary">Resume</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Interested in learning more about my professional background and skills? Download my resume for a detailed overview.
        </p>
        <Button asChild size="lg" className="font-semibold shadow-lg hover:shadow-primary/50 transition-shadow">
          <Link href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="mr-2 h-5 w-5" /> Download Resume
          </Link>
        </Button>
      </div>
    </section>
  );
}
