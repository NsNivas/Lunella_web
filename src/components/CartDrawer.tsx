import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore, COUPONS } from '@/store/StoreContext';
import { getProductById } from '@/data/products';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, appliedCoupon, cartCount } = useStore();

  if (!cartOpen) return null;

  const items = cart.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  })).filter((item) => item.product);

  const subtotal = items.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const discount = appliedCoupon && COUPONS[appliedCoupon] ? Math.round(subtotal * COUPONS[appliedCoupon] / 100) : 0;
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  return (
    <div className="fixed inset-0 z-[65]">
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-blush bg-white">
          <h2 className="font-display text-xl font-bold text-plum flex items-center gap-2">
            <ShoppingBag size={20} /> Your Cart ({cartCount})
          </h2>
          <button onClick={() => setCartOpen(false)} className="text-plum hover:text-burgundy" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-blush flex items-center justify-center mb-4">
              <ShoppingBag size={36} className="text-plum" />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-2">Your cart is empty</h3>
            <p className="text-deep-mauve text-sm mb-6">Discover something you love and add it here.</p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary rounded-lg">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.productId + (item.size || '') + (item.color || '')} className="flex gap-3 bg-white rounded-xl p-3 card-shadow">
                  <Link to={`/product/${item.productId}`} onClick={() => setCartOpen(false)} className="flex-shrink-0">
                    <img src={item.product!.image} alt={item.product!.name} className="w-20 h-20 rounded-lg object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-charcoal line-clamp-1">{item.product!.name}</h4>
                    <p className="text-xs text-deep-mauve">{item.product!.subType}</p>
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' · '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-7 h-7 rounded-full bg-blush text-plum flex items-center justify-center hover:bg-rose transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 rounded-full bg-blush text-plum flex items-center justify-center hover:bg-rose transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-plum text-sm">₹{item.product!.price * item.quantity}</span>
                        <button onClick={() => removeFromCart(item.productId)} className="text-gray-400 hover:text-burgundy transition-colors" aria-label="Remove">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-blush bg-white p-5 space-y-3">
              <div className="flex justify-between text-sm text-charcoal">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-700">
                  <span>Discount ({appliedCoupon})</span>
                  <span className="font-semibold">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-charcoal">
                <span>Shipping</span>
                <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-plum pt-2 border-t border-blush">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Link to="/cart" onClick={() => setCartOpen(false)} className="btn-outline rounded-lg w-full">
                View Full Cart
              </Link>
              <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-primary rounded-lg w-full">
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
