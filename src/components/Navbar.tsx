import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '@/store/StoreContext';
import { categories } from '@/data/products';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Offers', path: '/offers' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlist, setCartOpen, setSearchOpen, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-plum text-white text-center text-xs py-2 font-medium tracking-wide">
        Free shipping on orders above ₹999 · Use code WELCOME10 for 10% off your first order
      </div>

      <header className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md transition-all duration-300 ${scrolled ? 'py-2 shadow-md' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          <button className="lg:hidden text-plum" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>

          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors relative group ${
                  isActive(link.path) ? 'text-plum' : 'text-charcoal hover:text-plum'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-burgundy transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button className="text-sm font-semibold uppercase tracking-wide text-charcoal hover:text-plum transition-colors flex items-center gap-1">
                Categories <ChevronDown size={14} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-white rounded-xl shadow-xl border border-blush p-2 w-56">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blush transition-colors"
                      >
                        <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-charcoal">{cat.name}</p>
                          <p className="text-xs text-deep-mauve">{cat.subTypes.length} items</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3 lg:gap-4">
            <button onClick={() => setSearchOpen(true)} className="text-plum hover:text-burgundy transition-colors" aria-label="Search">
              <Search size={22} />
            </button>
            <Link to="/wishlist" className="text-plum hover:text-burgundy transition-colors relative" aria-label="Wishlist">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-burgundy text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} className="text-plum hover:text-burgundy transition-colors relative" aria-label="Cart">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-burgundy text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to={user ? '/account' : '/login'} className="text-plum hover:text-burgundy transition-colors hidden sm:block" aria-label="Account">
              <User size={22} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-cream shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-blush">
              <Logo />
              <button onClick={() => setMobileOpen(false)} className="text-plum"><X size={22} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-semibold uppercase tracking-wide text-sm ${isActive(link.path) ? 'bg-plum text-white' : 'text-charcoal hover:bg-blush'}`}
                >
                  {link.label}
                </Link>
              ))}
              <p className="px-4 pt-4 pb-2 text-xs font-bold uppercase text-deep-mauve tracking-wide">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blush transition-colors"
                >
                  <img src={cat.image} alt={cat.name} className="w-9 h-9 rounded-lg object-cover" />
                  <span className="text-sm font-semibold text-charcoal">{cat.name}</span>
                </Link>
              ))}
              <Link to={user ? '/account' : '/login'} className="block px-4 py-3 rounded-lg font-semibold uppercase tracking-wide text-sm text-charcoal hover:bg-blush">
                {user ? 'My Account' : 'Login / Signup'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
