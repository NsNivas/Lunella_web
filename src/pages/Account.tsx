import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, Clock, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById, mockOrders } from '@/data/products';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'recent' | 'settings';

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'recent', label: 'Recently Viewed', icon: Clock },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Account() {
  const { user, logout, wishlist, recentlyViewed } = useStore();
  const [tab, setTab] = useState<Tab>('profile');

  if (!user) {
    return (
      <div className="min-h-[60vh] bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-blush flex items-center justify-center mb-6 mx-auto">
            <User size={40} className="text-plum" />
          </div>
          <h1 className="font-display text-3xl font-bold text-plum mb-3">Sign In to Continue</h1>
          <p className="text-deep-mauve mb-6">Access your orders, wishlist and more.</p>
          <Link to="/login" className="btn-primary rounded-lg">Login / Sign Up</Link>
        </div>
      </div>
    );
  }

  const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean);
  const recentProducts = recentlyViewed.map((id) => getProductById(id)).filter(Boolean).slice(0, 8);

  return (
    <div className="bg-ivory min-h-screen pb-16">
      <div className="bg-blush py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'My Account' }]} />
          <h1 className="font-display text-3xl font-bold text-plum mt-3">My Account</h1>
          <p className="text-deep-mauve mt-1">Welcome back, {user.name}!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 card-shadow sticky top-28">
            <div className="flex items-center gap-3 p-3 mb-3 bg-blush rounded-xl">
              <div className="w-11 h-11 rounded-full bg-plum text-white flex items-center justify-center font-bold text-lg">
                {user.name[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-charcoal text-sm truncate">{user.name}</p>
                <p className="text-xs text-deep-mauve truncate">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    tab === t.id ? 'bg-plum text-white' : 'text-charcoal hover:bg-blush'
                  }`}
                >
                  <t.icon size={18} /> {t.label}
                </button>
              ))}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-burgundy hover:bg-blush transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'profile' && (
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h2 className="font-display text-2xl font-bold text-plum mb-5">Profile Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Email</label>
                  <input type="email" defaultValue={user.email} className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Phone</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-1.5">Date of Birth</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none" />
                </div>
              </div>
              <button className="btn-primary rounded-lg mt-5">Save Changes</button>
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-plum mb-2">My Orders</h2>
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-5 card-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-blush">
                    <div>
                      <p className="font-bold text-plum">{order.id}</p>
                      <p className="text-xs text-deep-mauve">Placed on {order.date}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-charcoal line-clamp-1">{item.name}</p>
                          <p className="text-xs text-deep-mauve">Qty: {item.quantity} · ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-blush">
                    <p className="font-bold text-plum">Total: ₹{order.total}</p>
                    <Link to="/track" className="text-sm font-semibold text-burgundy hover:text-plum flex items-center gap-1">
                      Track Order <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'wishlist' && (
            <div>
              <h2 className="font-display text-2xl font-bold text-plum mb-5">My Wishlist ({wishlistProducts.length})</h2>
              {wishlistProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 card-shadow text-center">
                  <Heart size={36} className="text-mauve mx-auto mb-3" />
                  <p className="text-deep-mauve mb-4">Your wishlist is empty.</p>
                  <Link to="/shop" className="btn-primary rounded-lg">Browse Products</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => <ProductCard key={p!.id} product={p!} />)}
                </div>
              )}
            </div>
          )}

          {tab === 'addresses' && (
            <div>
              <h2 className="font-display text-2xl font-bold text-plum mb-5">Saved Addresses</h2>
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-5 card-shadow border-2 border-plum">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-plum bg-blush px-3 py-1 rounded-lg">Default</span>
                    <button className="text-sm text-burgundy font-semibold">Edit</button>
                  </div>
                  <p className="font-semibold text-charcoal">{user.name}</p>
                  <p className="text-sm text-deep-mauve">14, MG Road, Bengaluru, Karnataka 560001</p>
                  <p className="text-sm text-deep-mauve">Phone: +91 98765 43210</p>
                </div>
                <div className="bg-white rounded-2xl p-5 card-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-deep-mauve">Office</span>
                    <button className="text-sm text-burgundy font-semibold">Edit</button>
                  </div>
                  <p className="font-semibold text-charcoal">{user.name}</p>
                  <p className="text-sm text-deep-mauve">5th Floor, Tech Park, Whitefield, Bengaluru, KA 560066</p>
                  <p className="text-sm text-deep-mauve">Phone: +91 98765 43210</p>
                </div>
                <button className="w-full bg-white rounded-2xl p-5 card-shadow border-2 border-dashed border-mauve text-deep-mauve hover:border-plum hover:text-plum transition-colors font-semibold">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {tab === 'recent' && (
            <div>
              <h2 className="font-display text-2xl font-bold text-plum mb-5">Recently Viewed</h2>
              {recentProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 card-shadow text-center">
                  <Clock size={36} className="text-mauve mx-auto mb-3" />
                  <p className="text-deep-mauve">No recently viewed products yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recentProducts.map((p) => <ProductCard key={p!.id} product={p!} />)}
                </div>
              )}
            </div>
          )}

          {tab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h2 className="font-display text-2xl font-bold text-plum mb-5">Settings</h2>
              <div className="space-y-4">
                {['Email notifications for new arrivals', 'SMS alerts for order updates', 'Promotional offers and deals', 'Personalized recommendations'].map((setting, i) => (
                  <label key={setting} className="flex items-center justify-between p-3 bg-cream rounded-xl cursor-pointer">
                    <span className="text-sm font-medium text-charcoal">{setting}</span>
                    <input type="checkbox" defaultChecked={i < 2} className="w-5 h-5 accent-burgundy" />
                  </label>
                ))}
              </div>
              <button className="btn-primary rounded-lg mt-5">Save Settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
