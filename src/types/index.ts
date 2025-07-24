export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  discount_percentage: number;
  category_id: string;
  in_stock: boolean;
  stock_quantity: number;
  is_featured: boolean;
  collection_tag?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  product_images?: ProductImage[];
  reviews?: Review[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  created_at: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  shipping_address?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  profiles?: User;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  products?: Product;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  is_approved: boolean;
  created_at: string;
  profiles?: User;
}

export interface StoreInfo {
  id: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp_number?: string;
  business_hours?: any;
  social_links?: any;
  updated_at: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url?: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}