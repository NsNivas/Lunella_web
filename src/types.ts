export type CategoryId =
  | 'beauty'
  | 'fashion'
  | 'footwear'
  | 'accessories'
  | 'bags'
  | 'lifestyle';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  subTypes: string[];
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  subType: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  colors: string[];
  sizes?: string[];
  inStock: boolean;
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  details: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coupon: string;
  discount: string;
  image: string;
  cta: string;
  badge: string;
}

export interface MockOrder {
  id: string;
  date: string;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: { name: string; image: string; quantity: number; price: number }[];
  total: number;
  address: string;
}
