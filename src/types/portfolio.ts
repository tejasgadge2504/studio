import type { LucideIcon } from 'lucide-react';

export interface ProfileData {
  name: string;
  tagline: string;
  email: string;
  aboutMe: string;
  profilePicture: string;
  profilePictureAiHint: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string; 
  };
}

export interface Project {
  id: string;
  title: string;
  image: string;
  imageAiHint: string;
  domain: string;
  duration: string;
  client?: string;
  service: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveLink?: string;
  repoLink?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  logo?: string;
  logoAiHint?: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  iconName: keyof typeof import('lucide-react'); // Assuming Lucide icons
  category: string;
  proficiency?: number; // Optional: 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number | string;
  iconName?: keyof typeof import('lucide-react'); 
  link?: string;
}

export interface SectionNavItem {
  id: string;
  label: string;
  href: string;
}

export interface AllData {
  profile: ProfileData;
  projects: Project[];
  experiences: Experience[];
  techStack: TechStackItem[];
  achievements: Achievement[];
}
