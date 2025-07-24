-- =====================================================
-- ZOYA BELLE E-COMMERCE DATABASE SCHEMA
-- Execute this entire script in your Supabase SQL Editor
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store info table
CREATE TABLE IF NOT EXISTS store_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT DEFAULT 'BEYOND SHOPPING, IT''S A LIFESTYLE',
  hero_subtitle TEXT DEFAULT 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.',
  hero_image_url TEXT DEFAULT 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. CREATE RLS POLICIES
-- =====================================================

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can modify categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Products policies (public read)
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Only admins can modify products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Product images policies (public read)
CREATE POLICY "Product images are viewable by everyone" ON product_images FOR SELECT USING (true);
CREATE POLICY "Only admins can modify product images" ON product_images FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Order items policies
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create order items for own orders" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Admins can view all order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Reviews policies
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own reviews" ON reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews" ON reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Store info policies (public read)
CREATE POLICY "Store info is viewable by everyone" ON store_info FOR SELECT USING (true);
CREATE POLICY "Only admins can modify store info" ON store_info FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Homepage content policies (public read)
CREATE POLICY "Homepage content is viewable by everyone" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Only admins can modify homepage content" ON homepage_content FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- =====================================================
-- 4. INSERT CATEGORIES
-- =====================================================

INSERT INTO categories (name, description, sort_order) VALUES
('Cosmetics', 'Premium makeup and beauty products', 1),
('Skincare', 'Nourishing skincare essentials', 2),
('Fashion', 'Elegant fashion and accessories', 3),
('Accessories', 'Stylish accessories and jewelry', 4)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 5. INSERT PRODUCTS
-- =====================================================

-- Get category IDs for reference
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

    -- NEW ARRIVALS (3 items)
    INSERT INTO products (title, description, price, discount_percentage, category_id, in_stock, stock_quantity, collection_tag) VALUES
    ('Radiant Glow Foundation SPF 30', 'Full coverage foundation with sun protection for a flawless, radiant complexion', 65.00, 15, cosmetics_id, true, 25, 'New Arrivals'),
    ('Luxury Silk Hair Scrunchie Set', 'Set of 3 premium silk scrunchies in elegant neutral tones', 35.00, 0, accessories_id, true, 40, 'New Arrivals'),
    ('Botanical Face Mist Toner', 'Refreshing botanical mist with rose water and hyaluronic acid', 45.00, 20, skincare_id, true, 30, 'New Arrivals');

    -- BEST SELLERS (5 items)
    INSERT INTO products (title, description, price, discount_percentage, category_id, in_stock, stock_quantity, collection_tag) VALUES
    ('Velvet Matte Lipstick - Ruby Red', 'Long-lasting matte lipstick in a stunning ruby red shade', 42.00, 25, cosmetics_id, true, 50, 'Best Sellers'),
    ('Anti-Aging Retinol Night Serum', 'Powerful retinol serum for smoother, younger-looking skin', 85.00, 30, skincare_id, true, 20, 'Best Sellers'),
    ('Designer Crossbody Bag - Camel', 'Luxurious leather crossbody bag in sophisticated camel tone', 185.00, 20, fashion_id, true, 15, 'Best Sellers'),
    ('Waterproof Mascara - Black', 'Smudge-proof, long-lasting mascara for dramatic lashes', 38.00, 0, cosmetics_id, true, 60, 'Best Sellers'),
    ('Pearl Drop Earrings', 'Elegant freshwater pearl earrings with gold-plated settings', 125.00, 15, accessories_id, true, 25, 'Best Sellers');

    -- COSMETICS (12 items total - including 2 from above collections)
    INSERT INTO products (title, description, price, discount_percentage, category_id, in_stock, stock_quantity, collection_tag) VALUES
    ('Cream Blush - Coral Sunset', 'Buildable cream blush for a natural, healthy glow', 32.00, 0, cosmetics_id, true, 35, NULL),
    ('Liquid Eyeliner - Midnight Black', 'Precision liquid eyeliner with ultra-fine tip', 28.00, 10, cosmetics_id, true, 45, NULL),
    ('Highlighter Palette - Golden Hour', 'Multi-shade highlighter palette for luminous skin', 55.00, 0, cosmetics_id, true, 30, NULL),
    ('Lip Gloss Set - Nude Collection', 'Set of 4 nude lip glosses in versatile shades', 48.00, 15, cosmetics_id, true, 25, NULL),
    ('Bronzer Palette - Sun Kissed', 'Matte and shimmer bronzers for natural contouring', 52.00, 0, cosmetics_id, true, 20, NULL),
    ('Setting Spray - All Day Hold', 'Long-lasting makeup setting spray with dewy finish', 35.00, 0, cosmetics_id, true, 40, NULL),
    ('Concealer Stick - Medium', 'Full coverage concealer stick for blemishes and dark circles', 29.00, 0, cosmetics_id, true, 50, NULL),
    ('Eyebrow Pencil - Ash Brown', 'Precision eyebrow pencil with spoolie brush', 25.00, 0, cosmetics_id, true, 55, NULL),
    ('Lip Liner Set - Essential Nudes', 'Set of 3 nude lip liners for perfect lip definition', 38.00, 20, cosmetics_id, true, 30, NULL),
    ('Eyeshadow Palette - Autumn Vibes', '12-shade eyeshadow palette in warm autumn tones', 68.00, 25, cosmetics_id, true, 18, 'Nazish''s Picks');

    -- SKINCARE (5 items total - including 2 from above collections)
    INSERT INTO products (title, description, price, discount_percentage, category_id, in_stock, stock_quantity, collection_tag) VALUES
    ('Vitamin C Brightening Serum', 'Potent vitamin C serum for radiant, even-toned skin', 72.00, 0, skincare_id, true, 25, NULL),
    ('Gentle Foaming Cleanser', 'Mild foaming cleanser suitable for all skin types', 38.00, 0, skincare_id, true, 40, NULL),
    ('Hydrating Night Cream', 'Rich night cream with peptides and ceramides', 95.00, 15, skincare_id, true, 20, 'Nazish''s Picks');

    -- FASHION (10 items total - including 1 from above collections)
    INSERT INTO products (title, description, price, discount_percentage, category_id, in_stock, stock_quantity, collection_tag) VALUES
    ('Cashmere Scarf - Blush Pink', 'Luxurious cashmere scarf in soft blush pink', 145.00, 0, fashion_id, true, 12, NULL),
    ('Silk Camisole - Ivory', 'Premium silk camisole with delicate lace trim', 85.00, 10, fashion_id, true, 20, NULL),
    ('Wide Leg Trousers - Navy', 'High-waisted wide leg trousers in premium fabric', 125.00, 0, fashion_id, true, 15, NULL),
    ('Knit Cardigan - Cream', 'Soft knit cardigan perfect for layering', 95.00, 20, fashion_id, true, 18, NULL),
    ('Midi Wrap Dress - Floral', 'Elegant wrap dress in delicate floral print', 155.00, 0, fashion_id, true, 10, NULL),
    ('Tailored Blazer - Black', 'Classic tailored blazer for professional elegance', 185.00, 15, fashion_id, true, 8, NULL),
    ('Pleated Skirt - Burgundy', 'A-line pleated skirt in rich burgundy tone', 75.00, 0, fashion_id, true, 22, NULL),
    ('Silk Blouse - White', 'Classic silk blouse with mother-of-pearl buttons', 115.00, 0, fashion_id, true, 16, NULL),
    ('Cashmere Sweater - Grey', 'Luxurious cashmere pullover sweater', 225.00, 25, fashion_id, true, 6, 'Nazish''s Picks');

END $$;

-- =====================================================
-- 6. INSERT PRODUCT IMAGES
-- =====================================================

-- Insert images for all products
DO $$
DECLARE
    product_record RECORD;
BEGIN
    FOR product_record IN SELECT id, title FROM products LOOP
        -- Insert primary image for each product
        INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
        (product_record.id, 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', product_record.title, 1);
        
        -- Insert secondary image for each product
        INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
        (product_record.id, 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', product_record.title || ' - Alternative view', 2);
    END LOOP;
END $$;

-- =====================================================
-- 7. INSERT DEMO USERS AND DATA
-- =====================================================

-- Insert store info
INSERT INTO store_info (business_name, address, phone, email, whatsapp_number) VALUES
('Zoya Belle', '123 Collins Street, Melbourne VIC 3000, Australia', '+61 3 9123 4567', 'hello@zoyabelle.com.au', '+61411632317')
ON CONFLICT DO NOTHING;

-- Insert homepage content
INSERT INTO homepage_content (hero_title, hero_subtitle, hero_image_url) VALUES
('BEYOND SHOPPING, IT''S A LIFESTYLE', 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. CREATE FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- After running this script, you can create demo users:
-- 1. Sign up with email: admin@zoyabelle.com.au, password: Admin@123
-- 2. Sign up with email: testuser@zoya.com, password: Test@123
-- 3. Then manually update the admin user's is_admin field to true
-- =====================================================