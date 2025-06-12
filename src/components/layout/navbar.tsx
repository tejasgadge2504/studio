'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SectionNavItem } from '@/types/portfolio';

const navItems: SectionNavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'tech-stack', label: 'Skills', href: '#tech-stack' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      let currentSection = 'hero';
      navItems.forEach(item => {
        const sectionElement = document.getElementById(item.id.replace('#', ''));
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = item.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="#hero" className="text-2xl font-headline font-bold text-primary hover:opacity-80 transition-opacity" onClick={handleLinkClick}>
          InnoFolio
        </Link>
        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} passHref legacyBehavior>
              <a
                onClick={handleLinkClick}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary",
                  activeSection === item.id ? "text-primary bg-primary/10" : "text-foreground"
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm pb-4">
          <nav className="flex flex-col items-center space-y-2">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href} passHref legacyBehavior>
                <a
                  onClick={handleLinkClick}
                  className={cn(
                    "block px-4 py-3 rounded-md text-base font-medium w-full text-center transition-colors hover:text-primary",
                     activeSection === item.id ? "text-primary bg-primary/10" : "text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
