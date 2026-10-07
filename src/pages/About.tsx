import { Link } from 'react-router-dom';
import { Heart, Sparkles, Shield, Leaf, Users, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { editorialImage, editorialImage2 } from '@/data/products';

const values = [
  { icon: Heart, title: 'Women First', desc: 'Every product is chosen with her needs, preferences and lifestyle in mind.' },
  { icon: Sparkles, title: 'Quality Matters', desc: 'We partner only with trusted brands to deliver products that truly last.' },
  { icon: Shield, title: 'Authentic Always', desc: '100% genuine products, every time. No compromises, no knock-offs.' },
  { icon: Leaf, title: 'Thoughtful Sourcing', desc: 'We care about where our products come from and their impact on the planet.' },
  { icon: Users, title: 'Community Driven', desc: 'Our community shapes what we stock. Your feedback drives our curation.' },
  { icon: ArrowRight, title: 'Always Evolving', desc: 'We constantly refresh our collection to keep up with what she loves next.' },
];

export default function About() {
  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-lavender py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
          <h1 className="font-display text-4xl font-bold text-plum mt-3">About LUNELLE</h1>
        </div>
      </div>

      {/* Brand story */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={editorialImage} alt="LUNELLE brand" className="w-full h-[480px] object-cover" />
            <div className="absolute -bottom-4 -right-4 w-40 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-cream hidden sm:block">
              <img src={editorialImage2} alt="LUNELLE lifestyle" className="w-full h-full object-cover" />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy mb-3">Our Story</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-plum mb-6 leading-tight">
              Made for the Woman You Are.
            </h2>
            <p className="text-charcoal text-lg leading-relaxed mb-4">
              LUNELLE was created to make everyday shopping easier, stylish and enjoyable for women. From cosmetics essentials to fashion and accessories, LUNELLE brings everything she loves together in one place.
            </p>
            <p className="text-deep-mauve leading-relaxed mb-4">
              What started as a small idea — that a woman should not have to visit ten different stores to find what she needs — has grown into a curated marketplace serving thousands of women across the country.
            </p>
            <p className="text-deep-mauve leading-relaxed mb-6">
              We believe that style is personal, cosmetics is diverse, and lifestyle is whatever makes you feel like the best version of yourself. That belief shapes every product we stock and every experience we design.
            </p>
            <Link to="/shop" className="btn-primary rounded-lg">
              Explore Our Collection <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Philosophy */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy mb-3">Our Philosophy</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-plum mb-6">Style. Cosmetics. You.</h2>
            <p className="text-lg text-charcoal leading-relaxed">
              Three words that guide everything we do. Style — because what you wear is how you tell the world who you are. Cosmetics — because feeling beautiful is a right, not a luxury. You — because at the center of it all is the woman who makes LUNELLE possible.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading eyebrow="What We Stand For" title="Our Values" subtitle="The principles that guide every decision at LUNELLE." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center mb-4">
                  <value.icon size={22} className="text-plum" />
                </div>
                <h3 className="font-display text-xl font-bold text-plum mb-2">{value.title}</h3>
                <p className="text-sm text-deep-mauve leading-relaxed">{value.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why LUNELLE */}
      <section className="bg-blush py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy mb-3">Why LUNELLE</p>
              <h2 className="font-display text-3xl font-bold text-plum mb-6">Everything She Loves, One Place.</h2>
              <ul className="space-y-4">
                {[
                  '150+ curated products across 6 categories',
                  'Quality-checked, authentic products only',
                  'Affordable pricing with regular offers',
                  'Fast, reliable delivery across India',
                  'Easy 7-day returns, no questions asked',
                  'A community that grows with you',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-charcoal">
                    <span className="w-6 h-6 rounded-full bg-plum text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '150+', label: 'Products' },
                { num: '10K+', label: 'Happy Customers' },
                { num: '6', label: 'Categories' },
                { num: '4.8★', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-8 text-center card-shadow">
                  <p className="font-display text-4xl font-bold text-plum">{stat.num}</p>
                  <p className="text-sm text-deep-mauve uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center max-w-2xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-plum mb-4">Ready to Discover Your Style?</h2>
          <p className="text-deep-mauve mb-6">Join thousands of women who shop with LUNELLE every day.</p>
          <Link to="/shop" className="btn-primary rounded-lg">Start Shopping <ArrowRight size={18} /></Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
