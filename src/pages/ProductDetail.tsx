import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, Star, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import { getProductById, getRelatedProducts, products } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import StarRating from '@/components/StarRating';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, recentlyViewed, setCartOpen } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [tab, setTab] = useState<'description' | 'details' | 'reviews'>('description');

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setQuantity(1);
      setSelectedSize(product.sizes?.[0]);
      setSelectedColor(product.colors?.[0]);
      addRecentlyViewed(product.id);
      window.scrollTo(0, 0);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-plum mb-3">Product not found</h1>
          <Link to="/shop" className="btn-primary rounded-lg">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const related = getRelatedProducts(product, 4);
  const recentlyViewedProducts = recentlyViewed
    .filter((rid) => rid !== product.id)
    .map((rid) => getProductById(rid))
    .filter(Boolean)
    .slice(0, 4) as typeof products;

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, selectedSize, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: product.categoryLabel, path: `/shop?category=${product.category}` },
            { label: product.name },
          ]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === i ? 'border-plum' : 'border-blush hover:border-mauve'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden card-shadow-lg">
              <img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-[400px] lg:h-[560px] object-cover animate-fade-in"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-burgundy text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm uppercase tracking-wide text-burgundy font-semibold mb-2">{product.categoryLabel} · {product.subType}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-plum mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} showNumber size={16} />
              <span className="text-sm text-deep-mauve">{product.reviewCount} reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-plum">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-sm font-semibold text-green-700">Save ₹{product.originalPrice - product.price}</span>
            </div>

            <p className="text-charcoal leading-relaxed mb-6">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-charcoal mb-2">Color: <span className="text-deep-mauve">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        selectedColor === color ? 'border-plum bg-plum text-white' : 'border-blush text-charcoal hover:border-mauve'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-charcoal mb-2">Size: <span className="text-deep-mauve">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        selectedSize === size ? 'border-plum bg-plum text-white' : 'border-blush text-charcoal hover:border-mauve'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-charcoal mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-blush p-1">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-blush text-plum flex items-center justify-center hover:bg-rose transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-semibold text-charcoal">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="w-8 h-8 rounded-lg bg-blush text-plum flex items-center justify-center hover:bg-rose transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                {product.inStock ? (
                  <span className="text-sm font-semibold text-green-700 flex items-center gap-1">
                    <Check size={16} /> In Stock
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-primary rounded-lg flex-1 min-w-[180px] disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="btn-outline rounded-lg flex-1 min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                  wished ? 'bg-burgundy border-burgundy text-white' : 'border-plum text-plum hover:bg-plum hover:text-white'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} className={wished ? 'fill-white heart-pop' : ''} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-cream rounded-xl">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck size={20} className="text-plum" />
                <p className="text-xs font-semibold text-charcoal">Free Shipping</p>
                <p className="text-[0.65rem] text-deep-mauve">Orders above ₹999</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RefreshCw size={20} className="text-plum" />
                <p className="text-xs font-semibold text-charcoal">Easy Returns</p>
                <p className="text-[0.65rem] text-deep-mauve">7-day return</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Shield size={20} className="text-plum" />
                <p className="text-xs font-semibold text-charcoal">Secure</p>
                <p className="text-[0.65rem] text-deep-mauve">Quality assured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-blush mb-6">
            {(['description', 'details', 'reviews'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 font-semibold text-sm uppercase tracking-wide transition-colors relative ${
                  tab === t ? 'text-plum' : 'text-deep-mauve hover:text-charcoal'
                }`}
              >
                {t === 'reviews' ? `Reviews (${product.reviewCount})` : t}
                {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-plum" />}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow">
            {tab === 'description' && (
              <p className="text-charcoal leading-relaxed">{product.description}</p>
            )}
            {tab === 'details' && (
              <ul className="space-y-2 text-charcoal">
                <li><strong className="text-plum">Type:</strong> {product.subType}</li>
                <li><strong className="text-plum">Category:</strong> {product.categoryLabel}</li>
                <li><strong className="text-plum">Colors:</strong> {product.colors.join(', ')}</li>
                {product.sizes && <li><strong className="text-plum">Sizes:</strong> {product.sizes.join(', ')}</li>}
                <li><strong className="text-plum">Details:</strong> {product.details}</li>
              </ul>
            )}
            {tab === 'reviews' && (
              <div className="space-y-4">
                {[
                  { name: 'Ananya R.', rating: 5, text: 'Absolutely love this! Great quality and fast delivery.', date: '1 week ago' },
                  { name: 'Kavya M.', rating: 4, text: 'Good product, matches the description. Would recommend.', date: '2 weeks ago' },
                  { name: 'Pooja S.', rating: 5, text: 'Exceeded my expectations. Will buy again from LUNELLE.', date: '1 month ago' },
                ].map((rev, i) => (
                  <div key={i} className="pb-4 border-b border-blush last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-plum text-white flex items-center justify-center text-sm font-bold">
                          {rev.name[0]}
                        </div>
                        <span className="font-semibold text-sm text-charcoal">{rev.name}</span>
                      </div>
                      <span className="text-xs text-deep-mauve">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: rev.rating }).map((_, j) => (
                        <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-charcoal">{rev.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-plum mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-plum mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recentlyViewedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
