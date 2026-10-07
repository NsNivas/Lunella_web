import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  link?: { label: string; path: string };
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, link, center = true }: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div className={`mb-8 ${center ? 'text-center' : ''}`}>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy mb-2">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-plum">{title}</h2>
        {subtitle && (
          <p className="text-deep-mauve mt-2 max-w-xl mx-auto">{subtitle}</p>
        )}
        {link && (
          <Link to={link.path} className={`inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-burgundy hover:text-plum transition-colors group ${center ? '' : ''}`}>
            {link.label}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </ScrollReveal>
  );
}
