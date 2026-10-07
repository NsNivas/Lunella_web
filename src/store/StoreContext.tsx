import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { CartItem } from '@/types';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  user: { name: string; email: string } | null;
  appliedCoupon: string | null;
  cartOpen: boolean;
  searchOpen: boolean;
  toasts: Toast[];
}

interface StoreContextType extends StoreState {
  addToCart: (productId: string, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  setAppliedCoupon: (code: string | null) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('lunelle_cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => loadFromStorage('lunelle_wishlist', []));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => loadFromStorage('lunelle_recent', []));
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => loadFromStorage('lunelle_user', null));
  const [appliedCoupon, setAppliedCouponState] = useState<string | null>(() => loadFromStorage('lunelle_coupon', null));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => saveToStorage('lunelle_cart', cart), [cart]);
  useEffect(() => saveToStorage('lunelle_wishlist', wishlist), [wishlist]);
  useEffect(() => saveToStorage('lunelle_recent', recentlyViewed), [recentlyViewed]);
  useEffect(() => saveToStorage('lunelle_user', user), [user]);
  useEffect(() => saveToStorage('lunelle_coupon', appliedCoupon), [appliedCoupon]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback((productId: string, quantity = 1, size?: string, color?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId && item.size === size && item.color === color);
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId, quantity, size, color }];
    });
    showToast('Added to cart', 'success');
  }, [showToast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Removed from cart', 'info');
  }, [showToast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) => prev.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCouponState(null);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      }
      showToast('Added to wishlist', 'success');
      return [...prev, productId];
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const moveToCart = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    addToCart(productId, 1);
  }, [addToCart]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  }, []);

  const setAppliedCoupon = useCallback((code: string | null) => {
    setAppliedCouponState(code);
  }, []);

  const login = useCallback((name: string, email: string) => {
    setUser({ name, email });
    showToast(`Welcome, ${name}!`, 'success');
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('You have been logged out', 'info');
  }, [showToast]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value: StoreContextType = {
    cart,
    wishlist,
    recentlyViewed,
    user,
    appliedCoupon,
    cartOpen,
    searchOpen,
    toasts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    moveToCart,
    addRecentlyViewed,
    setAppliedCoupon,
    setCartOpen,
    setSearchOpen,
    showToast,
    removeToast,
    login,
    logout,
    cartCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export const COUPONS: Record<string, number> = {
  WELCOME10: 10,
  FLASH40: 40,
  COMBO3: 15,
  FESTIVE15: 15,
  GLOW20: 20,
  STYLE25: 25,
};
