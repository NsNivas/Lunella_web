import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, CreditCard, Smartphone, Banknote, Package, CheckCircle2 } from 'lucide-react';
import { useStore, COUPONS } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import Breadcrumbs from '@/components/Breadcrumbs';

type Step = 'customer' | 'delivery' | 'payment' | 'review' | 'confirmation';

const steps: { id: Step; label: string }[] = [
  { id: 'customer', label: 'Customer Details' },
  { id: 'delivery', label: 'Delivery Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Order Review' },
  { id: 'confirmation', label: 'Confirmation' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, appliedCoupon } = useStore();
  const [step, setStep] = useState<Step>('customer');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [delivery, setDelivery] = useState({ address: '', city: '', state: '', pincode: '' });
  const [orderId] = useState('LNL-2024-' + Math.floor(1000 + Math.random() * 9000));

  const items = cart.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  })).filter((item) => item.product);

  const subtotal = items.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const discount = appliedCoupon && COUPONS[appliedCoupon] ? Math.round(subtotal * COUPONS[appliedCoupon] / 100) : 0;
  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal - discount + shipping;

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[60vh] bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-plum mb-3">Your Cart is Empty</h1>
          <p className="text-deep-mauve mb-6">Add items to your cart before checking out.</p>
          <Link to="/shop" className="btn-primary rounded-lg">Browse Products</Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const nextStep = () => {
    const next = steps[currentStepIndex + 1];
    if (next) setStep(next.id);
  };

  const prevStep = () => {
    const prev = steps[currentStepIndex - 1];
    if (prev) setStep(prev.id);
  };

  const placeOrder = () => {
    clearCart();
    setStep('confirmation');
    window.scrollTo(0, 0);
  };

  const paymentMethods = [
    { id: 'upi', label: 'UPI', desc: 'Pay via any UPI app', icon: Smartphone },
    { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive', icon: Banknote },
  ];

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />
          <h1 className="font-display text-3xl font-bold text-plum mt-3">Checkout</h1>
        </div>
      </div>

      {/* Progress */}
      {step !== 'confirmation' && (
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.slice(0, 4).map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    i <= currentStepIndex ? 'bg-plum text-white' : 'bg-blush text-deep-mauve'
                  }`}>
                    {i < currentStepIndex ? <Check size={18} /> : i + 1}
                  </div>
                  <p className={`text-xs mt-2 font-semibold hidden sm:block ${i <= currentStepIndex ? 'text-plum' : 'text-deep-mauve'}`}>
                    {s.label}
                  </p>
                </div>
                {i < 3 && <div className={`h-0.5 flex-1 mx-2 ${i < currentStepIndex ? 'bg-plum' : 'bg-blush'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {step === 'confirmation' ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={56} className="text-green-600" />
            </div>
            <h1 className="font-display text-4xl font-bold text-plum mb-3">Order Confirmed!</h1>
            <p className="text-lg text-charcoal mb-2">Thank you for shopping with LUNELLE.</p>
            <p className="text-deep-mauve mb-6">Your order <span className="font-bold text-plum">{orderId}</span> has been placed successfully.</p>

            <div className="bg-white rounded-2xl p-6 card-shadow max-w-md mx-auto text-left mb-6">
              <h3 className="font-semibold text-charcoal mb-3">Delivery Details</h3>
              <p className="text-sm text-charcoal">{customer.name}</p>
              <p className="text-sm text-deep-mauve">{delivery.address}</p>
              <p className="text-sm text-deep-mauve">{delivery.city}, {delivery.state} - {delivery.pincode}</p>
              <p className="text-sm text-deep-mauve mt-2">{customer.phone} · {customer.email}</p>
              <div className="mt-3 pt-3 border-t border-blush flex justify-between font-bold text-plum">
                <span>Total Paid</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/track" className="btn-primary rounded-lg">Track Order</Link>
              <Link to="/shop" className="btn-outline rounded-lg">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 card-shadow">
                {step === 'customer' && (
                  <>
                    <h2 className="font-display text-xl font-bold text-plum mb-5">Customer Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-charcoal block mb-1.5">Full Name</label>
                        <input
                          type="text" required value={customer.name}
                          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-charcoal block mb-1.5">Email</label>
                        <input
                          type="email" required value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-charcoal block mb-1.5">Phone Number</label>
                        <input
                          type="tel" required value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>
                    <button onClick={nextStep} disabled={!customer.name || !customer.email || !customer.phone}
                      className="btn-primary rounded-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                      Continue to Delivery <ArrowRight size={18} />
                    </button>
                  </>
                )}

                {step === 'delivery' && (
                  <>
                    <h2 className="font-display text-xl font-bold text-plum mb-5">Delivery Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-charcoal block mb-1.5">Address</label>
                        <textarea
                          required value={delivery.address} rows={3}
                          onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none resize-none"
                          placeholder="House number, street, area"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-charcoal block mb-1.5">City</label>
                          <input type="text" required value={delivery.city}
                            onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                            placeholder="City" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-charcoal block mb-1.5">State</label>
                          <input type="text" required value={delivery.state}
                            onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                            placeholder="State" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-charcoal block mb-1.5">Pincode</label>
                        <input type="text" required value={delivery.pincode} maxLength={6}
                          onChange={(e) => setDelivery({ ...delivery, pincode: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                          placeholder="6-digit pincode" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={prevStep} className="btn-outline rounded-lg">
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button onClick={nextStep} disabled={!delivery.address || !delivery.city || !delivery.state || !delivery.pincode}
                        className="btn-primary rounded-lg flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        Continue to Payment <ArrowRight size={18} />
                      </button>
                    </div>
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <h2 className="font-display text-xl font-bold text-plum mb-5">Payment Method</h2>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            paymentMethod === method.id ? 'border-plum bg-blush' : 'border-blush hover:border-mauve'
                          }`}
                        >
                          <method.icon size={24} className={paymentMethod === method.id ? 'text-plum' : 'text-deep-mauve'} />
                          <div className="flex-1">
                            <p className="font-semibold text-charcoal">{method.label}</p>
                            <p className="text-sm text-deep-mauve">{method.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === method.id ? 'border-plum bg-plum' : 'border-mauve'}`}>
                            {paymentMethod === method.id && <Check size={12} className="text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-deep-mauve mt-4 bg-cream p-3 rounded-lg">
                      This is a demo checkout. No real payment will be processed.
                    </p>
                    <div className="flex gap-3 mt-6">
                      <button onClick={prevStep} className="btn-outline rounded-lg">
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button onClick={nextStep} className="btn-primary rounded-lg flex-1">
                        Review Order <ArrowRight size={18} />
                      </button>
                    </div>
                  </>
                )}

                {step === 'review' && (
                  <>
                    <h2 className="font-display text-xl font-bold text-plum mb-5">Review Your Order</h2>

                    <div className="space-y-4 mb-6">
                      <div className="bg-cream rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-plum text-sm">Customer</h3>
                          <button onClick={() => setStep('customer')} className="text-xs text-burgundy font-semibold">Edit</button>
                        </div>
                        <p className="text-sm text-charcoal">{customer.name}</p>
                        <p className="text-sm text-deep-mauve">{customer.email} · {customer.phone}</p>
                      </div>

                      <div className="bg-cream rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-plum text-sm">Delivery Address</h3>
                          <button onClick={() => setStep('delivery')} className="text-xs text-burgundy font-semibold">Edit</button>
                        </div>
                        <p className="text-sm text-charcoal">{delivery.address}</p>
                        <p className="text-sm text-deep-mauve">{delivery.city}, {delivery.state} - {delivery.pincode}</p>
                      </div>

                      <div className="bg-cream rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-plum text-sm">Payment</h3>
                          <button onClick={() => setStep('payment')} className="text-xs text-burgundy font-semibold">Edit</button>
                        </div>
                        <p className="text-sm text-charcoal">{paymentMethods.find((m) => m.id === paymentMethod)?.label}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-plum text-sm mb-3">Items ({items.length})</h3>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div key={item.productId} className="flex items-center gap-3 bg-white rounded-lg p-2 border border-blush">
                              <img src={item.product!.image} alt={item.product!.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-charcoal line-clamp-1">{item.product!.name}</p>
                                <p className="text-xs text-deep-mauve">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-plum text-sm">₹{item.product!.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={prevStep} className="btn-outline rounded-lg">
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button onClick={placeOrder} className="btn-primary rounded-lg flex-1">
                        <Package size={18} /> Place Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 card-shadow sticky top-28">
                <h3 className="font-display text-lg font-bold text-plum mb-4">Summary</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-charcoal">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-charcoal">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-plum pt-3 border-t border-blush text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
