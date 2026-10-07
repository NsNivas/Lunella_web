import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '@/store/StoreContext';

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Subscribed! Check your inbox for a welcome offer.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-plum text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 text-center">
          <h2 className="font-display text-3xl font-bold mb-2">Join the LUNELLE Edit</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">Subscribe for early access to new arrivals, exclusive offers and style inspiration.</p>
          <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
            />
            <button type="submit" className="bg-white text-plum px-6 py-3 rounded-lg font-semibold hover:bg-blush transition-colors flex items-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Logo variant="light" />
          <p className="text-white/60 text-sm mt-4 max-w-xs">
            Fashion, cosmetics and everyday essentials curated for the woman you are.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Pinterest">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Shop</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/shop?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
            <li><Link to="/shop?category=beauty" className="hover:text-white transition-colors">Cosmetics</Link></li>
            <li><Link to="/shop?category=footwear" className="hover:text-white transition-colors">Footwear</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link to="/shop?category=bags" className="hover:text-white transition-colors">Bags</Link></li>
            <li><Link to="/shop?category=lifestyle" className="hover:text-white transition-colors">Lifestyle</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Help</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Shipping</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Returns</Link></li>
            <li><Link to="/track" className="hover:text-white transition-colors">Order Tracking</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <p className="flex items-center gap-2"><Mail size={14} /> support@lunelle.in</p>
            <p className="flex items-center gap-2"><Phone size={14} /> 1800-123-4567</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-white/50">
        © 2024 LUNELLE. All rights reserved. · Style. Cosmetics. You.
      </div>
    </footer>
  );
}
