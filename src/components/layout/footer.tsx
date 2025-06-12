import Link from 'next/link';
import { Github, Linkedin, Twitter, Briefcase } from 'lucide-react';
import type { ProfileData } from '@/types/portfolio';
import { getProfileData } from '@/lib/data-loader';

const SocialIcon = ({ platform, href }: { platform?: string; href?: string }) => {
  if (!href) return null;
  const Icon = platform === 'github' ? Github :
               platform === 'linkedin' ? Linkedin :
               platform === 'twitter' ? Twitter : Briefcase; // Default for portfolio or other
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
      <Icon size={24} />
      <span className="sr-only">{platform}</span>
    </Link>
  );
};

export default async function Footer() {
  const profileData = await getProfileData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 py-8">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {profileData.socialLinks.github && <SocialIcon platform="github" href={profileData.socialLinks.github} />}
          {profileData.socialLinks.linkedin && <SocialIcon platform="linkedin" href={profileData.socialLinks.linkedin} />}
          {profileData.socialLinks.twitter && <SocialIcon platform="twitter" href={profileData.socialLinks.twitter} />}
          {profileData.socialLinks.portfolio && <SocialIcon platform="portfolio" href={profileData.socialLinks.portfolio} />}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {profileData.name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Built with Next.js and Tailwind CSS. Designed by InnoFolio.
        </p>
      </div>
    </footer>
  );
}
