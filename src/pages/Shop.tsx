import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import Breadcrumbs from '@/components/Breadcrumbs';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const sortParam = (searchParams.get('sort') as SortOption) || 'featured';

  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState<SortOption>(sortParam);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCategory(categoryParam);
    setSort(sortParam);
  }, [categoryParam, sortParam]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (s: SortOption) => {
    setSort(s);
    searchParams.set('sort', s);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.subType.toLowerCase().includes(q));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = result.filter((p) => p.rating >= minRating);
    result = result.filter((p) => p.discount >= minDiscount);
    if (inStockOnly) result = result.filter((p) => p.inStock);

    switch (sort) {
      case 'newest': result.sort((a, b) => Number(b.isNew) - Number(a.isNew)); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [category, search, priceRange, minRating, minDiscount, inStockOnly, sort]);

  const clearFilters = () => {
    setPriceRange([0, 2500]);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSearch('');
  };

  const activeFilterCount = (priceRange[0] > 0 || priceRange[1] < 2500 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (minDiscount > 0 ? 1 : 0) + (inStockOnly ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-plum mb-3">Price Range</h3>
        <div className="flex items-center gap-2 text-sm">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-20 px-2 py-1.5 rounded-lg border border-blush text-charcoal focus:outline-none focus:border-plum"
            placeholder="Min"
          />
          <span className="text-deep-mauve">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-20 px-2 py-1.5 rounded-lg border border-blush text-charcoal focus:outline-none focus:border-plum"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min={0}
          max={2500}
          step={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full mt-3 accent-burgundy"
        />
      </div>

      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-plum mb-3">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                minRating === r ? 'bg-plum text-white' : 'bg-blush text-charcoal hover:bg-rose'
              }`}
            >
              {r === 0 ? 'All' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-plum mb-3">Minimum Discount</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 10, 20, 30].map((d) => (
            <button
              key={d}
              onClick={() => setMinDiscount(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                minDiscount === d ? 'bg-plum text-white' : 'bg-blush text-charcoal hover:bg-rose'
              }`}
            >
              {d === 0 ? 'All' : `${d}%+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-plum mb-3">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-burgundy"
          />
          <span className="text-sm text-charcoal">In stock only</span>
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-sm font-semibold text-burgundy hover:text-plum transition-colors">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-blush py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Shop' }]} />
          <h1 className="font-display text-4xl font-bold text-plum mt-3">
            {category === 'all' ? 'Shop All' : categories.find((c) => c.id === category)?.name}
          </h1>
          <p className="text-deep-mauve mt-1">{filtered.length} products available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-4">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              category === 'all' ? 'bg-plum text-white' : 'bg-white text-charcoal border border-blush hover:border-plum'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                category === cat.id ? 'bg-plum text-white' : 'bg-white text-charcoal border border-blush hover:border-plum'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search + sort + filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-mauve" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-white border-2 border-blush focus:border-plum text-charcoal font-medium text-sm focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-mauve pointer-events-none" />
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-blush text-charcoal font-medium text-sm"
            >
              <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop filters sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 card-shadow sticky top-28">
              <h2 className="font-display text-xl font-bold text-plum mb-5 flex items-center gap-2">
                <SlidersHorizontal size={18} /> Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-display font-bold text-plum mb-2">No products found</p>
                <p className="text-deep-mauve mb-4">Try adjusting your filters or search.</p>
                <button onClick={() => { clearFilters(); handleCategoryChange('all'); }} className="btn-primary rounded-lg">
                  Reset All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
                {filtered.map((p, i) => (
                  <ScrollReveal key={p.id} delay={Math.min(i * 30, 300)}>
                    <ProductCard product={p} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[65] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-cream shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-blush bg-white">
              <h2 className="font-display text-xl font-bold text-plum">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-plum"><X size={22} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterContent />
            </div>
            <div className="p-5 border-t border-blush bg-white">
              <button onClick={() => setShowFilters(false)} className="btn-primary rounded-lg w-full">
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
