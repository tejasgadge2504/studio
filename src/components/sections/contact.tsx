import ContactForm from '@/components/contact-form';
import type { ProfileData } from '@/types/portfolio';
import { Mail, Phone, MapPin } from 'lucide-react'; // Example icons

interface ContactSectionProps {
  profile: Pick<ProfileData, 'email'>;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-primary/5 section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-semibold text-foreground">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. 
              Feel free to reach out using the form or through my email.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-primary" />
                <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {profile.email}
                </a>
              </div>
              {/* Example additional contact info - can be added to profile-data.json if needed */}
              {/* <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">Tech Hub, Innovation City</span>
              </div> */}
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
