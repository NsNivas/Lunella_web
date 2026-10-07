import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Wishlist() {
  const { wishlist, moveToCart, toggleWishlist } = useStore();

  const products = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-28 h-28 rounded-full bg-blush flex items-center justify-center mb-6 mx-auto">
            <Heart size={48} className="text-plum" />
          </div>
          <h1 className="font-display text-3xl font-bold text-plum mb-3">Your Wishlist is Empty</h1>
          <p className="text-deep-mauve mb-6">Save items you love by tapping the heart icon.</p>
          <Link to="/shop" className="btn-primary rounded-lg">Discover Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Wishlist' }]} />
          <h1 className="font-display text-3xl font-bold text-plum mt-3">My Wishlist</h1>
          <p className="text-deep-mauve mt-1">{products.length} items saved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product!.id} product={product!} />
          ))}
        </div>
      </div>
    </div>
  );
}
