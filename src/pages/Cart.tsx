import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight, X } from 'lucide-react';
import { useStore, COUPONS } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, appliedCoupon, setAppliedCoupon, showToast } = useStore();
  const [couponInput, setCouponInput] = useState(appliedCoupon || '');

  const items = cart.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  })).filter((item) => item.product);

  const subtotal = items.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const discount = appliedCoupon && COUPONS[appliedCoupon] ? Math.round(subtotal * COUPONS[appliedCoupon] / 100) : 0;
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      showToast(`Coupon ${code} applied! ${COUPONS[code]}% off`, 'success');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    showToast('Coupon removed', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-28 h-28 rounded-full bg-blush flex items-center justify-center mb-6 mx-auto">
            <ShoppingBag size={48} className="text-plum" />
          </div>
          <h1 className="font-display text-3xl font-bold text-plum mb-3">Your Cart is Empty</h1>
          <p className="text-deep-mauve mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn-primary rounded-lg">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cart' }]} />
          <h1 className="font-display text-3xl font-bold text-plum mt-3">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId + (item.size || '') + (item.color || '')} className="flex gap-4 bg-white rounded-2xl p-4 card-shadow">
              <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                <img src={item.product!.image} alt={item.product!.name} className="w-24 h-24 lg:w-28 lg:h-28 rounded-xl object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs text-deep-mauve uppercase font-semibold">{item.product!.subType}</p>
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-semibold text-charcoal hover:text-plum transition-colors">{item.product!.name}</h3>
                    </Link>
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' · '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-gray-400 hover:text-burgundy transition-colors flex-shrink-0" aria-label="Remove">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-blush rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-7 h-7 rounded-md bg-white text-plum flex items-center justify-center hover:bg-rose transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-charcoal text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 rounded-md bg-white text-plum flex items-center justify-center hover:bg-rose transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-plum text-lg">₹{item.product!.price * item.quantity}</p>
                    <p className="text-xs text-gray-400 line-through">₹{item.product!.originalPrice * item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-plum transition-colors">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 card-shadow sticky top-28">
            <h2 className="font-display text-xl font-bold text-plum mb-5">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-green-700" />
                    <span className="text-sm font-semibold text-green-700">{appliedCoupon} applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-green-700 hover:text-red-600">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2.5 rounded-lg border-2 border-blush focus:border-plum text-charcoal text-sm focus:outline-none"
                  />
                  <button onClick={applyCoupon} className="bg-plum text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-burgundy transition-colors">
                    Apply
                  </button>
                </div>
              )}
              <p className="text-xs text-deep-mauve mt-2">Try: WELCOME10 for 10% off</p>
            </div>

            <div className="space-y-3 pb-4 border-b border-blush">
              <div className="flex justify-between text-sm text-charcoal">
                <span>Subtotal ({items.length} items)</span>
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
              {subtotal < 999 && (
                <p className="text-xs text-burgundy">Add ₹{999 - subtotal} more for free shipping!</p>
              )}
            </div>

            <div className="flex justify-between text-lg font-bold text-plum pt-4 mb-5">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link to="/checkout" className="btn-primary rounded-lg w-full">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
