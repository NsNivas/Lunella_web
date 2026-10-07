import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const wished = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden card-shadow transition-all duration-500 hover:card-shadow-lg hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <img
          src={product.images[1] || product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-burgundy text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-plum text-white text-[0.65rem] font-bold px-2 py-1 rounded-md shadow-md uppercase tracking-wide">
            New
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-charcoal text-white text-sm font-semibold px-4 py-2 rounded-lg">Out of Stock</span>
          </div>
        )}
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          wished ? 'bg-burgundy text-white' : 'bg-white/90 text-plum hover:bg-burgundy hover:text-white'
        } ${product.isNew ? 'top-12' : ''} ${wished ? 'heart-pop' : ''}`}
        aria-label="Toggle wishlist"
      >
        <Heart size={16} className={wished ? 'fill-white' : ''} />
      </button>

      <div className="p-3.5">
        <p className="text-[0.65rem] uppercase tracking-wider text-deep-mauve font-semibold mb-1">
          {product.subType}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-charcoal text-sm leading-snug mb-1.5 line-clamp-1 hover:text-plum transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mb-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} />
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-plum">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (product.inStock) addToCart(product.id, 1, product.sizes?.[0], product.colors?.[0]);
          }}
          disabled={!product.inStock}
          className="w-full bg-plum text-white text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition-all duration-300 hover:bg-burgundy flex items-center justify-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
