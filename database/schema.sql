-- =====================================================
-- ZOYA BELLE E-COMMERCE DATABASE SCHEMA FOR POSTGRESQL
-- Execute this script in your PostgreSQL database
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  collection_tag TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table (includes authentication data)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- hashed password
  phone TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  shipping_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store info table
CREATE TABLE IF NOT EXISTS store_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT DEFAULT 'Zoya Belle',
  address TEXT,
  phone TEXT,
  email TEXT,
  whatsapp_number TEXT DEFAULT '+61411632317',
  business_hours JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT DEFAULT 'BEYOND SHOPPING, IT''S A LIFESTYLE',
  hero_subtitle TEXT DEFAULT 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.',
  hero_image_url TEXT DEFAULT 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. INSERT INITIAL DATA
-- =====================================================

-- Insert categories
INSERT INTO categories (name, description, sort_order) VALUES
('Cosmetics', 'Premium makeup and beauty products', 1),
('Skincare', 'Nourishing skincare essentials', 2),
('Fashion', 'Elegant fashion and accessories', 3),
('Accessories', 'Stylish accessories and jewelry', 4)
ON CONFLICT (name) DO NOTHING;

-- Insert store info
INSERT INTO store_info (business_name, address, phone, email, whatsapp_number) VALUES
('Zoya Belle', '123 Collins Street, Melbourne VIC 3000, Australia', '+61 3 9123 4567', 'hello@zoyabelle.com.au', '+61411632317')
ON CONFLICT DO NOTHING;

-- Insert homepage content
INSERT INTO homepage_content (hero_title, hero_subtitle, hero_image_url) VALUES
('BEYOND SHOPPING, IT''S A LIFESTYLE', 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg')
ON CONFLICT DO NOTHING;

-- Insert sample products
DO $$
DECLARE
    cosmetics_id UUID;
    skincare_id UUID;
    fashion_id UUID;
    accessories_id UUID;
BEGIN
    SELECT id INTO cosmetics_id FROM categories WHERE name = 'Cosmetics';
    SELECT id INTO skincare_id FROM categories WHERE name = 'Skincare';
    SELECT id INTO fashion_id FROM categories WHERE name = 'Fashion';
    SELECT id INTO accessories_id FROM categories WHERE name = 'Accessories';

    -- Insert products
    INSERT INTO products (title, description, price, discount_percentage, category_id, in_stock, stock_quantity, collection_tag) VALUES
    ('Velvet Matte Lipstick - Ruby Red', 'Long-lasting matte finish lipstick with rich color payoff', 35.00, 25, cosmetics_id, true, 50, 'Best Sellers'),
    ('Radiant Foundation SPF 30', 'Full coverage foundation with sun protection and natural finish', 55.00, 15, cosmetics_id, true, 30, 'New Arrivals'),
    ('Eyeshadow Palette - Sunset Dreams', '12-shade eyeshadow palette with warm and cool tones', 75.00, 20, cosmetics_id, true, 25, 'Limited Edition'),
    ('Hydrating Face Serum', 'Vitamin C and hyaluronic acid serum for glowing skin', 85.00, 10, skincare_id, true, 40, 'Skincare Essentials'),
    ('Silk Scarf - Floral Print', 'Premium silk scarf with elegant floral design', 65.00, 0, fashion_id, true, 15, 'Fashion Forward'),
    ('Pearl Drop Earrings', 'Elegant pearl earrings with gold setting', 120.00, 0, accessories_id, true, 20, 'Luxury Collection'),
    ('Moisturizing Night Cream', 'Rich night cream with anti-aging properties', 95.00, 15, skincare_id, true, 35, 'Anti-Aging'),
    ('Lip Gloss Set - Nude Collection', 'Set of 4 nude lip glosses in versatile shades', 48.00, 0, cosmetics_id, true, 25, NULL),
    ('Designer Handbag - Classic Black', 'Timeless black leather handbag with gold hardware', 290.00, 20, fashion_id, true, 8, 'Designer Collection'),
    ('Setting Spray - All Day Hold', 'Long-lasting makeup setting spray with dewy finish', 35.00, 0, cosmetics_id, true, 40, NULL)
    ON CONFLICT DO NOTHING;
END $$;

-- =====================================================
-- 3. CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- After running this script, you can create users through the application
-- The first user with email ending in "@admin" or "@zoyabelle.com" 
-- should be manually updated to have is_admin = true
-- =====================================================
