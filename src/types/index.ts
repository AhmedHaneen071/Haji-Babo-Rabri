export interface Product {
  id: string;
  name: string;
  nameUrdu?: string;
  slug: string;
  category: ProductCategory;
  price: number | null;
  priceDisplay: string;
  unit: string;
  description: string;
  shortDescription: string;
  ingredients?: string[];
  servingInfo?: string;
  storageInfo?: string;
  image: string;
  images?: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  badge?: string;
  tags: string[];
  rating?: number;
  reviews?: number;
}

export type ProductCategory =
  | 'all'
  | 'rabri'
  | 'kheer'
  | 'milk-desserts'
  | 'traditional-sweets'
  | 'dairy-products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  paymentMethod: 'cod' | 'bank-transfer' | 'online';
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CheckoutForm;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  createdAt: Date;
}

export interface CategoryFilter {
  id: ProductCategory;
  label: string;
  labelUrdu?: string;
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc';
