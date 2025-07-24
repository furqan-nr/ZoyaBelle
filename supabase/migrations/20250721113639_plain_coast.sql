/*
  # Insert Dummy Data for Zoya Belle

  1. Categories
    - Cosmetics
    - Skincare
    - Fashion
    - Accessories

  2. Products
    - At least 12 products across categories
    - Some with discounts for sale badges
    - Multiple images per product

  3. Sample Reviews
    - 5 approved reviews across different products
*/

-- Insert categories
INSERT INTO categories (name, slug, description, is_featured) VALUES
('Cosmetics', 'cosmetics', 'Premium makeup and beauty products', true),
('Skincare', 'skincare', 'Nourishing skincare essentials', true),
('Fashion', 'fashion', 'Trendy clothing and apparel', false),
('Accessories', 'accessories', 'Stylish accessories to complete your look', false)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for products
DO $$
DECLARE
    cosmetics_id uuid;
    skincare_id uuid;
    fashion_id uuid;
    accessories_id uuid;
BEGIN
    SELECT id INTO cosmetics_id FROM categories WHERE slug = 'cosmetics';
    SELECT id INTO skincare_id FROM categories WHERE slug = 'skincare';
    SELECT id INTO fashion_id FROM categories WHERE slug = 'fashion';
    SELECT id INTO accessories_id FROM categories WHERE slug = 'accessories';

    -- Insert products
    INSERT INTO products (title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
    ('Matte Liquid Lipstick - Rose Dust', 'matte-lipstick-rose-dust', 'Long-lasting, smudge-proof lipstick in an elegant rose shade. Perfect for all-day wear with a comfortable matte finish.', 39.99, 20, cosmetics_id, true, 50, true, 'Best Seller'),
    ('Velvet Foundation - Porcelain', 'velvet-foundation-porcelain', 'Full coverage liquid foundation with a natural velvet finish. Buildable coverage for flawless skin.', 55.00, 0, cosmetics_id, true, 30, false, 'New Arrival'),
    ('Shimmer Eyeshadow Palette', 'shimmer-eyeshadow-palette', '12-shade eyeshadow palette featuring warm, shimmery tones perfect for day and night looks.', 68.00, 15, cosmetics_id, true, 25, true, 'Nazish''s Pick'),
    ('Precision Eyeliner - Black', 'precision-eyeliner-black', 'Ultra-fine tip liquid eyeliner for precise application. Waterproof and long-wearing formula.', 28.00, 0, cosmetics_id, true, 75, false, 'Best Seller'),
    
    ('Hydrating Face Serum', 'hydrating-face-serum', 'Intensive hydrating serum with hyaluronic acid and vitamin E. Suitable for all skin types.', 89.00, 25, skincare_id, true, 40, true, 'Best Seller'),
    ('Gentle Cleansing Foam', 'gentle-cleansing-foam', 'Mild foaming cleanser that removes impurities without stripping natural oils. Perfect for daily use.', 35.00, 0, skincare_id, true, 60, false, 'New Arrival'),
    ('Anti-Aging Night Cream', 'anti-aging-night-cream', 'Rich night cream with retinol and peptides to reduce fine lines and improve skin texture.', 125.00, 30, skincare_id, true, 20, true, 'Nazish''s Pick'),
    ('Vitamin C Brightening Toner', 'vitamin-c-toner', 'Brightening toner with vitamin C and natural extracts to even skin tone and add radiance.', 45.00, 0, skincare_id, true, 55, false, 'New Arrival'),
    
    ('Silk Scarf - Blush Pink', 'silk-scarf-blush-pink', 'Luxurious 100% silk scarf in soft blush pink. Perfect accessory for any outfit.', 95.00, 20, fashion_id, true, 15, false, 'Best Seller'),
    ('Cashmere Wrap - Cream', 'cashmere-wrap-cream', 'Soft cashmere wrap in elegant cream color. Ideal for layering or evening wear.', 180.00, 0, fashion_id, true, 8, true, 'Nazish''s Pick'),
    
    ('Gold Statement Earrings', 'gold-statement-earrings', 'Elegant gold-plated statement earrings with geometric design. Hypoallergenic and lightweight.', 75.00, 15, accessories_id, true, 35, false, 'New Arrival'),
    ('Pearl Hair Pins Set', 'pearl-hair-pins-set', 'Set of 3 pearl hair pins perfect for special occasions or everyday elegance.', 42.00, 0, accessories_id, true, 50, true, 'Best Seller'),
    ('Designer Sunglasses', 'designer-sunglasses', 'Premium UV protection sunglasses with rose gold frames. Includes luxury case and cleaning cloth.', 220.00, 25, accessories_id, true, 12, true, 'Nazish''s Pick');

    -- Insert product images
    INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
    ((SELECT id FROM products WHERE slug = 'matte-lipstick-rose-dust'), 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg', 'Rose Dust Lipstick Main', 1),
    ((SELECT id FROM products WHERE slug = 'matte-lipstick-rose-dust'), 'https://images.pexels.com/photos/2533267/pexels-photo-2533267.jpeg', 'Rose Dust Lipstick Detail', 2),
    
    ((SELECT id FROM products WHERE slug = 'velvet-foundation-porcelain'), 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg', 'Velvet Foundation Bottle', 1),
    ((SELECT id FROM products WHERE slug = 'velvet-foundation-porcelain'), 'https://images.pexels.com/photos/3762880/pexels-photo-3762880.jpeg', 'Foundation Application', 2),
    
    ((SELECT id FROM products WHERE slug = 'shimmer-eyeshadow-palette'), 'https://images.pexels.com/photos/2533269/pexels-photo-2533269.jpeg', 'Eyeshadow Palette Open', 1),
    ((SELECT id FROM products WHERE slug = 'shimmer-eyeshadow-palette'), 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Palette Colors Detail', 2),
    
    ((SELECT id FROM products WHERE slug = 'precision-eyeliner-black'), 'https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg', 'Precision Eyeliner', 1),
    
    ((SELECT id FROM products WHERE slug = 'hydrating-face-serum'), 'https://images.pexels.com/photos/7428100/pexels-photo-7428100.jpeg', 'Face Serum Bottle', 1),
    ((SELECT id FROM products WHERE slug = 'hydrating-face-serum'), 'https://images.pexels.com/photos/7428101/pexels-photo-7428101.jpeg', 'Serum Application', 2),
    
    ((SELECT id FROM products WHERE slug = 'gentle-cleansing-foam'), 'https://images.pexels.com/photos/7428095/pexels-photo-7428095.jpeg', 'Cleansing Foam', 1),
    
    ((SELECT id FROM products WHERE slug = 'anti-aging-night-cream'), 'https://images.pexels.com/photos/7428102/pexels-photo-7428102.jpeg', 'Night Cream Jar', 1),
    ((SELECT id FROM products WHERE slug = 'anti-aging-night-cream'), 'https://images.pexels.com/photos/7428103/pexels-photo-7428103.jpeg', 'Cream Texture', 2),
    
    ((SELECT id FROM products WHERE slug = 'vitamin-c-toner'), 'https://images.pexels.com/photos/7428096/pexels-photo-7428096.jpeg', 'Vitamin C Toner', 1),
    
    ((SELECT id FROM products WHERE slug = 'silk-scarf-blush-pink'), 'https://images.pexels.com/photos/9558583/pexels-photo-9558583.jpeg', 'Silk Scarf Blush', 1),
    ((SELECT id FROM products WHERE slug = 'silk-scarf-blush-pink'), 'https://images.pexels.com/photos/9558584/pexels-photo-9558584.jpeg', 'Scarf Styling', 2),
    
    ((SELECT id FROM products WHERE slug = 'cashmere-wrap-cream'), 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg', 'Cashmere Wrap', 1),
    
    ((SELECT id FROM products WHERE slug = 'gold-statement-earrings'), 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg', 'Gold Statement Earrings', 1),
    ((SELECT id FROM products WHERE slug = 'gold-statement-earrings'), 'https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg', 'Earrings Detail', 2),
    
    ((SELECT id FROM products WHERE slug = 'pearl-hair-pins-set'), 'https://images.pexels.com/photos/6663493/pexels-photo-6663493.jpeg', 'Pearl Hair Pins', 1),
    
    ((SELECT id FROM products WHERE slug = 'designer-sunglasses'), 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg', 'Designer Sunglasses', 1),
    ((SELECT id FROM products WHERE slug = 'designer-sunglasses'), 'https://images.pexels.com/photos/701878/pexels-photo-701878.jpeg', 'Sunglasses Case', 2);

END $$;

-- Insert sample reviews (will be created after user signup via the app)