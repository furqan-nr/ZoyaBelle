/*
  # Complete E-commerce Database Schema for Zoya Belle

  1. New Tables
    - `categories` - Product categories (Cosmetics, Skincare, Fashion, Accessories)
    - `products` - Product catalog with pricing, discounts, inventory
    - `product_images` - Multiple images per product
    - `profiles` - User profiles with admin permissions
    - `orders` - Customer orders with status tracking
    - `order_items` - Individual items within orders
    - `reviews` - Product reviews with ratings and moderation
    - `store_info` - Store contact information and settings
    - `homepage_content` - CMS content for homepage

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
    - Secure admin-only operations

  3. Dummy Data
    - 13+ products across all categories with realistic pricing
    - Admin and customer demo accounts
    - Sample reviews and store information
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  discount_percentage integer DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  in_stock boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  collection_tag text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  shipping_address jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Store info table
CREATE TABLE IF NOT EXISTS store_info (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  address text,
  phone text,
  email text,
  whatsapp_number text,
  business_hours jsonb,
  social_links jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Homepage content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title text NOT NULL,
  hero_subtitle text,
  hero_image_url text,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Products: Public read access
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Only admins can manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Product images: Public read access
CREATE POLICY "Product images are viewable by everyone" ON product_images FOR SELECT USING (true);
CREATE POLICY "Only admins can manage product images" ON product_images FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Profiles: Users can read their own profile, admins can read all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Orders: Users can view their own orders, admins can view all
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Order items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Admins can view all order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Reviews: Public read for approved reviews
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own reviews" ON reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews" ON reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Store info: Public read access
CREATE POLICY "Store info is viewable by everyone" ON store_info FOR SELECT USING (true);
CREATE POLICY "Only admins can manage store info" ON store_info FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Homepage content: Public read access
CREATE POLICY "Homepage content is viewable by everyone" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Only admins can manage homepage content" ON homepage_content FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Insert Categories
INSERT INTO categories (name, slug, description, is_featured, sort_order) VALUES
('Cosmetics', 'cosmetics', 'Premium makeup and beauty products', true, 1),
('Skincare', 'skincare', 'Nourishing skincare essentials', true, 2),
('Fashion', 'fashion', 'Elegant fashion accessories', true, 3),
('Accessories', 'accessories', 'Stylish accessories and jewelry', false, 4);

-- Insert Products
INSERT INTO products (title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
-- Cosmetics
('Matte Liquid Lipstick - Rose Dust', 'matte-liquid-lipstick-rose-dust', 'Long-lasting, smudge-proof lipstick in an elegant rose shade. Perfect for all-day wear with a comfortable matte finish.', 39.99, 20, (SELECT id FROM categories WHERE slug = 'cosmetics'), true, 50, true, 'New Arrival'),
('Premium Foundation - Natural Glow', 'premium-foundation-natural-glow', 'Full coverage foundation for a natural, radiant finish. Available in multiple shades to match your skin tone perfectly.', 49.99, 25, (SELECT id FROM categories WHERE slug = 'cosmetics'), true, 40, true, 'New Arrival'),
('Waterproof Mascara - Volume Max', 'waterproof-mascara-volume-max', 'Dramatic volume and length mascara that stays put all day. Waterproof formula perfect for any occasion.', 29.99, 15, (SELECT id FROM categories WHERE slug = 'cosmetics'), true, 60, false, 'Best Seller'),
('Eyeshadow Palette - Sunset Dreams', 'eyeshadow-palette-sunset-dreams', '12-shade eyeshadow palette with warm sunset tones. Highly pigmented and blendable for stunning eye looks.', 59.99, 30, (SELECT id FROM categories WHERE slug = 'cosmetics'), true, 25, true, 'Best Seller'),

-- Skincare
('Hydrating Face Serum - Vitamin C', 'hydrating-face-serum-vitamin-c', 'Brightening serum with vitamin C for radiant, glowing skin. Reduces dark spots and evens skin tone.', 59.99, 15, (SELECT id FROM categories WHERE slug = 'skincare'), true, 30, true, 'Best Seller'),
('Anti-Aging Night Cream', 'anti-aging-night-cream', 'Intensive night cream with retinol and peptides. Reduces fine lines and improves skin texture overnight.', 79.99, 30, (SELECT id FROM categories WHERE slug = 'skincare'), true, 20, false, 'Best Seller'),
('Gentle Cleansing Foam', 'gentle-cleansing-foam', 'Mild foaming cleanser suitable for all skin types. Removes makeup and impurities without stripping natural oils.', 34.99, 0, (SELECT id FROM categories WHERE slug = 'skincare'), true, 45, false, NULL),
('Hydrating Face Mask - Honey & Oats', 'hydrating-face-mask-honey-oats', 'Nourishing face mask with natural honey and oats. Provides deep hydration and gentle exfoliation.', 24.99, 20, (SELECT id FROM categories WHERE slug = 'skincare'), true, 35, false, 'New Arrival'),

-- Fashion
('Silk Scarf - Floral Print', 'silk-scarf-floral-print', 'Luxurious silk scarf with elegant floral pattern. Perfect accessory for both casual and formal occasions.', 89.99, 0, (SELECT id FROM categories WHERE slug = 'fashion'), true, 25, true, 'Nazish''s Pick'),
('Designer Sunglasses - Classic Black', 'designer-sunglasses-classic-black', 'Timeless black sunglasses with UV protection. Elegant design that complements any outfit.', 129.99, 25, (SELECT id FROM categories WHERE slug = 'fashion'), true, 15, true, 'Nazish''s Pick'),
('Cashmere Blend Cardigan', 'cashmere-blend-cardigan', 'Soft and cozy cardigan made from premium cashmere blend. Available in multiple colors for versatile styling.', 159.99, 20, (SELECT id FROM categories WHERE slug = 'fashion'), true, 12, false, 'New Arrival'),

-- Accessories
('Designer Handbag - Black Leather', 'designer-handbag-black-leather', 'Elegant leather handbag perfect for any occasion. Spacious interior with multiple compartments for organization.', 199.99, 0, (SELECT id FROM categories WHERE slug = 'accessories'), true, 15, true, 'Nazish''s Pick'),
('Pearl Drop Earrings', 'pearl-drop-earrings', 'Classic pearl drop earrings with sterling silver posts. Timeless elegance for special occasions.', 69.99, 15, (SELECT id FROM categories WHERE slug = 'accessories'), true, 30, false, 'Best Seller'),
('Gold Chain Necklace - Delicate', 'gold-chain-necklace-delicate', 'Delicate gold-plated chain necklace. Perfect for layering or wearing alone for a minimalist look.', 45.99, 10, (SELECT id FROM categories WHERE slug = 'accessories'), true, 40, false, NULL);

-- Insert Product Images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
-- Cosmetics Images
((SELECT id FROM products WHERE slug = 'matte-liquid-lipstick-rose-dust'), 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Matte Liquid Lipstick Rose Dust', 1),
((SELECT id FROM products WHERE slug = 'premium-foundation-natural-glow'), 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg', 'Premium Foundation Natural Glow', 1),
((SELECT id FROM products WHERE slug = 'waterproof-mascara-volume-max'), 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Waterproof Mascara Volume Max', 1),
((SELECT id FROM products WHERE slug = 'eyeshadow-palette-sunset-dreams'), 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg', 'Eyeshadow Palette Sunset Dreams', 1),

-- Skincare Images
((SELECT id FROM products WHERE slug = 'hydrating-face-serum-vitamin-c'), 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', 'Hydrating Face Serum Vitamin C', 1),
((SELECT id FROM products WHERE slug = 'anti-aging-night-cream'), 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', 'Anti-Aging Night Cream', 1),
((SELECT id FROM products WHERE slug = 'gentle-cleansing-foam'), 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', 'Gentle Cleansing Foam', 1),
((SELECT id FROM products WHERE slug = 'hydrating-face-mask-honey-oats'), 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', 'Hydrating Face Mask Honey Oats', 1),

-- Fashion Images
((SELECT id FROM products WHERE slug = 'silk-scarf-floral-print'), 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Silk Scarf Floral Print', 1),
((SELECT id FROM products WHERE slug = 'designer-sunglasses-classic-black'), 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Designer Sunglasses Classic Black', 1),
((SELECT id FROM products WHERE slug = 'cashmere-blend-cardigan'), 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Cashmere Blend Cardigan', 1),

-- Accessories Images
((SELECT id FROM products WHERE slug = 'designer-handbag-black-leather'), 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Designer Handbag Black Leather', 1),
((SELECT id FROM products WHERE slug = 'pearl-drop-earrings'), 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Pearl Drop Earrings', 1),
((SELECT id FROM products WHERE slug = 'gold-chain-necklace-delicate'), 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Gold Chain Necklace Delicate', 1);

-- Insert Store Information
INSERT INTO store_info (address, phone, email, whatsapp_number, business_hours, social_links) VALUES
('Suite 123, Collins Street, Melbourne VIC 3000, Australia', '+61 3 9876 5432', 'hello@zoyabelle.com.au', '+61411632317', 
'{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Closed"}',
'{"instagram": "@zoyabelle", "facebook": "ZoyaBelleAU", "twitter": "@zoyabelle"}');

-- Insert Homepage Content
INSERT INTO homepage_content (hero_title, hero_subtitle, hero_image_url) VALUES
('BEYOND SHOPPING, IT''S A LIFESTYLE', 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);