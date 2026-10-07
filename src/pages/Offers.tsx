import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Clock, Gift, Sparkles } from 'lucide-react';
import { offers } from '@/data/products';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollReveal from '@/components/ScrollReveal';
import { useStore } from '@/store/StoreContext';

export default function Offers() {
  const { showToast } = useStore();

  const copyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Coupon ${code} copied!`, 'success');
  };

  const offerIcons = [Gift, Clock, Sparkles, Sparkles, Sparkles, Sparkles];

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-gradient-to-br from-blush via-cream to-lavender py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Offers' }]} />
          <h1 className="font-display text-4xl font-bold text-plum mt-3">Special Offers</h1>
          <p className="text-deep-mauve mt-2 text-lg">Exclusive deals and discounts curated just for you.</p>
        </div>
      </div>

      {/* Hero offer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-plum text-white">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose mb-3">First Order Offer</p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">A Little More You.</h2>
                <p className="text-white/80 text-lg mb-6">Get 10% OFF your first order. Because you deserve a little extra.</p>
                <button
                  onClick={() => copyCoupon('WELCOME10')}
                  className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3 mb-6 hover:bg-white/20 transition-colors"
                >
                  <Tag size={18} />
                  <span className="font-display text-2xl font-bold tracking-wider">WELCOME10</span>
                </button>
                <div>
                  <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-plum font-semibold px-6 py-3 rounded-lg hover:bg-blush transition-colors">
                    Shop the Offer <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
              <div className="h-64 lg:h-96 relative">
                <img src={offers[0].image} alt="Welcome offer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-plum via-plum/30 to-transparent" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* All offers grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, i) => {
            const Icon = offerIcons[i] || Gift;
            return (
              <ScrollReveal key={offer.id} delay={i * 80}>
                <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-lg transition-all duration-500 group flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-burgundy text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                      {offer.badge}
                    </span>
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Icon size={18} className="text-plum" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs uppercase tracking-wide text-burgundy font-semibold mb-1">{offer.subtitle}</p>
                    <h3 className="font-display text-2xl font-bold text-plum mb-2">{offer.title}</h3>
                    <p className="text-sm text-deep-mauve flex-1 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="bg-blush text-plum font-bold text-sm px-3 py-1.5 rounded-lg">{offer.discount}</span>
                      <button
                        onClick={() => copyCoupon(offer.coupon)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-plum border-2 border-plum rounded-lg px-3 py-1.5 hover:bg-plum hover:text-white transition-colors"
                      >
                        <Tag size={14} /> {offer.coupon}
                      </button>
                    </div>
                    <Link to="/shop" className="btn-primary rounded-lg w-full text-xs">
                      {offer.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
