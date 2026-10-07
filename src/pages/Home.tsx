import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { categories, getTrending, getNewArrivals, reviews, offers, galleryImages, heroImage, editorialImage, editorialImage2 } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const trending = getTrending();
  const newArrivals = getNewArrivals();
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    reviewTimer.current = window.setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(reviewTimer.current);
  }, []);

  const visibleReviews = [
    reviews[reviewIndex],
    reviews[(reviewIndex + 1) % reviews.length],
    reviews[(reviewIndex + 2) % reviews.length],
  ].slice(0, window.innerWidth >= 768 ? 3 : 1);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blush via-cream to-lavender overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 reveal revealed">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-burgundy mb-4 animate-fade-in">
              New Season Collection
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-plum leading-[1.05] mb-6">
              Discover Your<br />Signature Style.
            </h1>
            <p className="text-lg text-charcoal mb-8 max-w-md">
              Fashion, cosmetics and everyday essentials curated for the woman you are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary rounded-lg">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/shop" className="btn-outline rounded-lg">
                Explore Collection
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div>
                <p className="text-3xl font-bold text-plum font-display">150+</p>
                <p className="text-xs uppercase tracking-wide text-deep-mauve">Products</p>
              </div>
              <div className="w-px h-12 bg-mauve" />
              <div>
                <p className="text-3xl font-bold text-plum font-display">6</p>
                <p className="text-xs uppercase tracking-wide text-deep-mauve">Categories</p>
              </div>
              <div className="w-px h-12 bg-mauve" />
              <div>
                <p className="text-3xl font-bold text-plum font-display">4.8★</p>
                <p className="text-xs uppercase tracking-wide text-deep-mauve">Rated</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative reveal revealed">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="LUNELLE fashion model"
                className="w-full h-[400px] lg:h-[560px] object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <p className="text-xs uppercase tracking-wide text-deep-mauve font-semibold">Featured Look</p>
                <p className="font-display text-xl font-bold text-plum">Autumn Edit '24</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-4 lg:-right-6 bg-burgundy text-white rounded-2xl p-4 shadow-xl rotate-3 hidden sm:block">
              <p className="text-2xl font-bold font-display">10% OFF</p>
              <p className="text-xs">First Order</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Explore"
            title="Shop by Category"
            subtitle="From cosmetics essentials to fashion must-haves, find everything in one place."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 80}>
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group block relative rounded-2xl overflow-hidden card-shadow hover:card-shadow-lg transition-all duration-500 aspect-[4/5]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{cat.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{cat.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Hot Right Now"
            title="Trending Now"
            subtitle="The styles everyone is loving this week."
            link={{ label: 'View All', path: '/shop?sort=trending' }}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {trending.slice(0, 8).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS BANNER */}
      <section className="py-16 lg:py-20 bg-blush">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden bg-plum text-white">
              <div className="grid lg:grid-cols-2 items-center">
                <div className="p-8 lg:p-14">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose mb-3">Special Offer</p>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">A Little More You.</h2>
                  <p className="text-white/80 text-lg mb-6">Get 10% OFF your first order. Because you deserve a little extra.</p>
                  <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3 mb-6">
                    <span className="text-sm text-white/70">Use code</span>
                    <span className="font-display text-2xl font-bold tracking-wider">WELCOME10</span>
                  </div>
                  <div>
                    <Link to="/offers" className="inline-flex items-center gap-2 bg-white text-plum font-semibold px-6 py-3 rounded-lg hover:bg-blush transition-colors">
                      Shop the Offer <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
                <div className="h-64 lg:h-96 relative">
                  <img src={offers[0].image} alt="Special offer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-plum via-plum/30 to-transparent" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Mini offer cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {offers.slice(1, 5).map((offer, i) => (
              <ScrollReveal key={offer.id} delay={i * 80}>
                <Link to="/offers" className="group block bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-lg transition-all">
                  <div className="relative h-32 overflow-hidden">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-burgundy text-white text-xs font-bold px-2 py-1 rounded">{offer.discount}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-burgundy font-semibold">{offer.subtitle}</p>
                    <h3 className="font-display text-lg font-bold text-plum">{offer.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-16 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Just In"
            title="New Arrivals"
            subtitle="Fresh styles dropping every week. Be the first to own them."
            link={{ label: 'View All', path: '/shop?sort=newest' }}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.slice(0, 8).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="py-16 lg:py-20 bg-lavender">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={editorialImage} alt="Editorial fashion" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-4 -right-4 w-40 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-cream hidden sm:block">
                <img src={editorialImage2} alt="Editorial" className="w-full h-full object-cover" />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy mb-3">The LUNELLE Story</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-plum mb-6 leading-tight">
                Made for Every<br />Version of You.
              </h2>
              <p className="text-charcoal text-lg mb-4 leading-relaxed">
                From the boardroom to the brunch table, from quiet mornings to radiant evenings — LUNELLE is designed for the woman who does it all.
              </p>
              <p className="text-deep-mauve mb-8 leading-relaxed">
                Every piece in our collection is thoughtfully curated to blend comfort with elegance, quality with accessibility, and trend with timelessness.
              </p>
              <Link to="/about" className="btn-primary rounded-lg">
                Discover LUNELLE <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Loved by Thousands"
            title="What Our Customers Say"
            subtitle="Real stories from women who shop with LUNELLE."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <ScrollReveal key={review.id + reviewIndex}>
                <div className="bg-white rounded-2xl p-6 card-shadow h-full flex flex-col">
                  <Quote size={28} className="text-rose mb-3" />
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-charcoal text-sm leading-relaxed flex-1 mb-4">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-blush">
                    <img src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm text-charcoal">{review.name}</p>
                      <p className="text-xs text-deep-mauve">Purchased: {review.product}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`h-2 rounded-full transition-all ${i === reviewIndex ? 'w-8 bg-plum' : 'w-2 bg-mauve'}`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL GALLERY */}
      <section className="py-16 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="@lunelle.in"
            title="Follow the LUNELLE Edit"
            subtitle="Tag us @lunelle.in to be featured on our page."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <a
                  href="#"
                  className="group relative block rounded-xl overflow-hidden aspect-square card-shadow"
                >
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-plum/0 group-hover:bg-plum/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
