import type { ProfileData } from '@/types/portfolio';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Twitter, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface AboutSectionProps {
  profile: ProfileData;
}

const SocialLink = ({ href, icon: Icon, label }: { href?: string, icon: React.ElementType, label: string }) => {
  if (!href) return null;
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="text-muted-foreground hover:text-primary transition-colors">
      <Icon className="w-6 h-6" />
    </Link>
  );
};

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          About <span className="text-primary">Me</span>
        </h2>
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/3 relative min-h-[300px] md:min-h-0">
              <Image
                src={profile.profilePicture}
                alt={profile.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
                data-ai-hint={profile.profilePictureAiHint}
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {profile.aboutMe}
                </p>
                <div className="flex space-x-4">
                  <SocialLink href={profile.socialLinks.github} icon={Github} label="GitHub Profile" />
                  <SocialLink href={profile.socialLinks.linkedin} icon={Linkedin} label="LinkedIn Profile" />
                  <SocialLink href={profile.socialLinks.twitter} icon={Twitter} label="Twitter Profile" />
                  <SocialLink href={profile.socialLinks.portfolio} icon={Briefcase} label="Personal Website" />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
