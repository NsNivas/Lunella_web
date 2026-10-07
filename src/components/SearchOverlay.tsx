import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { products, categories } from '@/data/products';

const popularSearches = ['Lipstick', 'Dress', 'Heels', 'Handbag', 'Earrings', 'Scrunchie'];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('lunelle_recent_searches') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.subType.toLowerCase().includes(q) ||
          categories.find((c) => c.id === p.category)?.name.toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : [];

  const handleSearch = (term: string) => {
    setQuery(term);
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem('lunelle_recent_searches', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
      <div className="absolute top-0 left-0 right-0 bg-cream shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-down">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-plum">Search</h2>
            <button onClick={() => setSearchOpen(false)} className="text-plum hover:text-burgundy" aria-label="Close search">
              <X size={24} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-mauve" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) handleSearch(query.trim()); }}
              placeholder="Search for products, categories..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-blush focus:border-plum text-charcoal text-lg focus:outline-none"
            />
          </div>

          {!query && (
            <div className="space-y-6">
              {recent.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-deep-mauve mb-3">Recent Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-4 py-2 bg-white rounded-full text-sm font-medium text-charcoal border border-blush hover:border-plum transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-deep-mauve mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-4 py-2 bg-blush rounded-full text-sm font-medium text-plum hover:bg-rose transition-colors flex items-center gap-1.5"
                    >
                      <TrendingUp size={14} /> {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={() => { handleSearch(query); setSearchOpen(false); }}
                  className="group bg-white rounded-xl overflow-hidden card-shadow hover:card-shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-deep-mauve uppercase font-semibold mb-0.5">{p.subType}</p>
                    <p className="text-sm font-semibold text-charcoal line-clamp-1">{p.name}</p>
                    <p className="text-sm font-bold text-plum mt-1">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <p className="text-center text-deep-mauve py-8">No products found for "{query}". Try a different search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
