import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ProjectsSection from '@/components/sections/projects';
import AchievementsSection from '@/components/sections/achievements';
import TechStackDisplaySection from '@/components/sections/tech-stack-display';
import ExperienceSection from '@/components/sections/experience';
import ResumeSection from '@/components/sections/resume';
import ContactSection from '@/components/sections/contact';
import { getAllPortfolioData } from '@/lib/data-loader';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const { profile, projects, experiences, techStack, achievements } = await getAllPortfolioData();

  // Create a slimmed down tech stack for the hero cloud
  const heroTechStack = techStack.map(item => ({ name: item.name, iconName: item.iconName }));

  return (
    <div className="flex flex-col">
      <HeroSection profile={profile} techStack={heroTechStack} />
      <AboutSection profile={profile} />
      <Separator className="my-8 md:my-12" />
      <ProjectsSection projects={projects} />
      <Separator className="my-8 md:my-12" />
      <ExperienceSection experiences={experiences} />
      <Separator className="my-8 md:my-12" />
      <TechStackDisplaySection techStack={techStack} />
      <Separator className="my-8 md:my-12" />
      <AchievementsSection achievements={achievements} />
      <Separator className="my-8 md:my-12" />
      <ResumeSection profile={profile} />
      <Separator className="my-8 md:my-12" />
      <ContactSection profile={profile} />
    </div>
  );
}
