import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, Clock, Search } from 'lucide-react';
import { mockOrders } from '@/data/products';
import Breadcrumbs from '@/components/Breadcrumbs';

const stages = [
  { id: 'Confirmed', label: 'Order Confirmed', desc: 'We have received your order', icon: CheckCircle },
  { id: 'Packed', label: 'Packed', desc: 'Your order has been packed', icon: Package },
  { id: 'Shipped', label: 'Shipped', desc: 'On its way to you', icon: Truck },
  { id: 'Out for Delivery', label: 'Out for Delivery', desc: 'Arriving today', icon: Truck },
  { id: 'Delivered', label: 'Delivered', desc: 'Order delivered successfully', icon: Home },
];

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<typeof mockOrders[0] | null>(mockOrders[1]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockOrders.find((o) => o.id.toLowerCase().includes(orderId.toLowerCase()));
    if (found) {
      setTrackedOrder(found);
    } else if (orderId) {
      setTrackedOrder(mockOrders[0]);
    }
  };

  const currentStageIndex = trackedOrder ? stages.findIndex((s) => s.id === trackedOrder.status) : -1;

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Order Tracking' }]} />
          <h1 className="font-display text-3xl font-bold text-plum mt-3">Track Your Order</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
        {/* Search */}
        <form onSubmit={handleTrack} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-mauve" />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID (e.g. LNL-2024-1407)"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-primary rounded-lg">Track</button>
        </form>

        {trackedOrder && (
          <div className="bg-white rounded-2xl p-6 lg:p-8 card-shadow">
            {/* Order info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-blush">
              <div>
                <p className="font-bold text-plum text-lg">{trackedOrder.id}</p>
                <p className="text-xs text-deep-mauve">Placed on {trackedOrder.date}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase ${
                trackedOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {trackedOrder.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-6">
              {trackedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-cream rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-charcoal line-clamp-1">{item.name}</p>
                    <p className="text-xs text-deep-mauve">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-plum text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              {stages.map((stage, i) => {
                const isComplete = i <= currentStageIndex;
                const isCurrent = i === currentStageIndex;
                return (
                  <div key={stage.id} className="flex gap-4 pb-8 last:pb-0 relative">
                    {i < stages.length - 1 && (
                      <div className={`absolute left-5 top-11 bottom-0 w-0.5 ${i < currentStageIndex ? 'bg-plum' : 'bg-blush'}`} />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                      isComplete ? 'bg-plum text-white' : 'bg-blush text-deep-mauve'
                    } ${isCurrent ? 'ring-4 ring-blush' : ''}`}>
                      <stage.icon size={20} />
                    </div>
                    <div className={`pt-1.5 ${isComplete ? '' : 'opacity-50'}`}>
                      <p className={`font-semibold text-sm ${isComplete ? 'text-plum' : 'text-deep-mauve'}`}>{stage.label}</p>
                      <p className="text-xs text-deep-mauve">{stage.desc}</p>
                      {isCurrent && (
                        <p className="text-xs text-burgundy font-semibold mt-1 flex items-center gap-1">
                          <Clock size={12} /> Current status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery address */}
            <div className="mt-6 pt-5 border-t border-blush">
              <p className="text-xs font-bold uppercase tracking-wide text-deep-mauve mb-1">Delivery Address</p>
              <p className="text-sm text-charcoal">{trackedOrder.address}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <Link to="/account" className="text-sm font-semibold text-burgundy hover:text-plun transition-colors">
            ← Back to My Account
          </Link>
        </div>
      </div>
    </div>
  );
}
