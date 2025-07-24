/*
  # Comprehensive Dummy Data for Zoya Belle E-commerce

  1. Categories
    - Cosmetics, Skincare, Fashion, Accessories

  2. Products (35 total)
    - 3 New Arrivals
    - 5 Best Sellers  
    - 12 Cosmetics
    - 5 Skincare
    - 10 Fashion
    - 5 Accessories

  3. Product Images
    - Multiple high-quality images per product

  4. Demo Users
    - Admin and customer accounts

  5. Sample Reviews
    - Realistic customer feedback
*/

-- Clear existing data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM reviews;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM profiles;
DELETE FROM store_info;
DELETE FROM homepage_content;

-- Insert Categories
INSERT INTO categories (id, name, slug, description, is_featured, sort_order) VALUES
('cat_cosmetics', 'Cosmetics', 'cosmetics', 'Premium makeup and beauty products', true, 1),
('cat_skincare', 'Skincare', 'skincare', 'Nourishing skincare essentials', true, 2),
('cat_fashion', 'Fashion', 'fashion', 'Elegant fashion and accessories', true, 3),
('cat_accessories', 'Accessories', 'accessories', 'Beautiful jewelry and accessories', true, 4);

-- Insert Products
-- NEW ARRIVALS (3 items)
INSERT INTO products (id, title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
('prod_001', 'Radiant Glow Foundation SPF 30', 'radiant-glow-foundation', 'Full coverage foundation with SPF protection and luminous finish. Perfect for all-day wear with buildable coverage.', 65.00, 15, 'cat_cosmetics', true, 25, true, 'New Arrival'),
('prod_002', 'Luxury Silk Hair Scrunchie Set', 'luxury-silk-scrunchie-set', 'Set of 3 premium mulberry silk scrunchies in elegant colors. Gentle on hair and prevents breakage.', 28.00, 0, 'cat_accessories', true, 40, true, 'New Arrival'),
('prod_003', 'Botanical Face Mist Toner', 'botanical-face-mist-toner', 'Refreshing rose and chamomile face mist that hydrates and preps skin. Natural botanical extracts for sensitive skin.', 42.00, 20, 'cat_skincare', true, 30, true, 'New Arrival');

-- BEST SELLERS (5 items)
INSERT INTO products (id, title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
('prod_004', 'Velvet Matte Lipstick - Ruby Red', 'velvet-matte-lipstick-ruby', 'Long-lasting matte lipstick with intense color payoff. Comfortable formula that doesn''t dry out lips.', 38.00, 25, 'cat_cosmetics', true, 50, true, 'Best Seller'),
('prod_005', 'Anti-Aging Retinol Night Serum', 'anti-aging-retinol-serum', 'Powerful retinol serum that reduces fine lines and improves skin texture. Gentle formula for nightly use.', 89.00, 30, 'cat_skincare', true, 20, true, 'Best Seller'),
('prod_006', 'Designer Crossbody Bag - Camel', 'designer-crossbody-bag-camel', 'Genuine leather crossbody bag with gold hardware. Perfect size for daily essentials with adjustable strap.', 185.00, 20, 'cat_fashion', true, 15, true, 'Best Seller'),
('prod_007', 'Waterproof Mascara - Black', 'waterproof-mascara-black', 'Volumizing waterproof mascara that lasts all day. Creates dramatic lashes without clumping or flaking.', 32.00, 0, 'cat_cosmetics', true, 60, true, 'Best Seller'),
('prod_008', 'Pearl Drop Earrings', 'pearl-drop-earrings', 'Elegant freshwater pearl earrings with sterling silver posts. Classic design perfect for any occasion.', 75.00, 15, 'cat_accessories', true, 25, true, 'Best Seller');

-- COSMETICS (12 items total - including 2 from above collections)
INSERT INTO products (id, title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
('prod_009', 'Eyeshadow Palette - Sunset Dreams', 'eyeshadow-palette-sunset', '12-shade eyeshadow palette with warm sunset tones. Highly pigmented with matte and shimmer finishes.', 58.00, 30, 'cat_cosmetics', true, 35, true, null),
('prod_010', 'Cream Blush - Peachy Keen', 'cream-blush-peachy-keen', 'Buildable cream blush that gives a natural flush. Blends seamlessly for a healthy glow.', 35.00, 0, 'cat_cosmetics', true, 45, false, null),
('prod_011', 'Liquid Eyeliner - Jet Black', 'liquid-eyeliner-jet-black', 'Precision liquid eyeliner with felt tip applicator. Smudge-proof formula for perfect winged liner.', 28.00, 20, 'cat_cosmetics', true, 55, false, null),
('prod_012', 'Highlighter Compact - Golden Hour', 'highlighter-compact-golden', 'Luminous highlighter that creates a radiant glow. Finely milled powder for smooth application.', 45.00, 0, 'cat_cosmetics', true, 30, false, null),
('prod_013', 'Lip Gloss Set - Nude Collection', 'lip-gloss-set-nude', 'Set of 4 nude lip glosses with non-sticky formula. Perfect for everyday wear with subtle shine.', 52.00, 25, 'cat_cosmetics', true, 40, false, null),
('prod_014', 'Bronzer Palette - Sun Kissed', 'bronzer-palette-sun-kissed', '3-shade bronzer palette for contouring and warming. Includes matte and shimmer shades.', 48.00, 15, 'cat_cosmetics', true, 25, false, null),
('prod_015', 'Setting Spray - All Day Lock', 'setting-spray-all-day', 'Long-lasting setting spray that keeps makeup fresh for 12+ hours. Lightweight mist with natural finish.', 38.00, 0, 'cat_cosmetics', true, 50, false, null),
('prod_016', 'Concealer Stick - Medium', 'concealer-stick-medium', 'Full coverage concealer stick for spot concealing. Creamy formula that doesn''t cake or crease.', 32.00, 20, 'cat_cosmetics', true, 40, false, null),
('prod_017', 'Eyebrow Pencil - Ash Brown', 'eyebrow-pencil-ash-brown', 'Precision eyebrow pencil with spoolie brush. Creates natural-looking hair strokes.', 25.00, 0, 'cat_cosmetics', true, 65, false, null),
('prod_018', 'Lip Liner Set - Essential Nudes', 'lip-liner-set-nudes', 'Set of 3 nude lip liners that complement any lip color. Long-wearing and creamy formula.', 42.00, 30, 'cat_cosmetics', true, 35, false, null);

-- SKINCARE (5 items total - including 2 from above collections)
INSERT INTO products (id, title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
('prod_019', 'Vitamin C Brightening Serum', 'vitamin-c-brightening-serum', '20% Vitamin C serum that brightens and evens skin tone. Antioxidant protection with hyaluronic acid.', 78.00, 25, 'cat_skincare', true, 30, false, null),
('prod_020', 'Gentle Foaming Cleanser', 'gentle-foaming-cleanser', 'pH-balanced foaming cleanser that removes makeup and impurities. Suitable for all skin types.', 35.00, 0, 'cat_skincare', true, 45, false, null),
('prod_021', 'Hydrating Night Cream', 'hydrating-night-cream', 'Rich night cream with peptides and ceramides. Repairs and hydrates skin while you sleep.', 68.00, 20, 'cat_skincare', true, 25, false, null);

-- FASHION (10 items total - including 1 from above collections)
INSERT INTO products (id, title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
('prod_022', 'Cashmere Blend Scarf - Blush', 'cashmere-scarf-blush', 'Luxurious cashmere blend scarf in soft blush pink. Oversized design perfect for layering.', 125.00, 20, 'cat_fashion', true, 20, false, null),
('prod_023', 'Silk Camisole - Ivory', 'silk-camisole-ivory', 'Pure silk camisole with delicate lace trim. Versatile piece for layering or wearing alone.', 95.00, 0, 'cat_fashion', true, 30, false, null),
('prod_024', 'Wide Leg Trousers - Navy', 'wide-leg-trousers-navy', 'High-waisted wide leg trousers in premium crepe fabric. Elegant silhouette for work or evening.', 145.00, 25, 'cat_fashion', true, 18, false, null),
('prod_025', 'Knit Cardigan - Cream', 'knit-cardigan-cream', 'Soft knit cardigan with pearl buttons. Perfect layering piece in neutral cream color.', 88.00, 15, 'cat_fashion', true, 25, false, null),
('prod_026', 'Midi Wrap Dress - Floral', 'midi-wrap-dress-floral', 'Feminine wrap dress in delicate floral print. Flattering silhouette with 3/4 sleeves.', 135.00, 30, 'cat_fashion', true, 22, false, null),
('prod_027', 'Blazer - Tailored Black', 'blazer-tailored-black', 'Classic tailored blazer in premium wool blend. Structured shoulders with modern fit.', 195.00, 0, 'cat_fashion', true, 15, false, null),
('prod_028', 'Pleated Midi Skirt - Camel', 'pleated-midi-skirt-camel', 'Elegant pleated midi skirt in rich camel tone. High-waisted with hidden zip closure.', 98.00, 20, 'cat_fashion', true, 28, false, null),
('prod_029', 'Silk Blouse - White', 'silk-blouse-white', 'Classic white silk blouse with covered buttons. Timeless piece for professional wardrobe.', 115.00, 0, 'cat_fashion', true, 20, false, null),
('prod_030', 'Cashmere Sweater - Grey', 'cashmere-sweater-grey', '100% cashmere crew neck sweater in soft grey. Luxurious feel with relaxed fit.', 225.00, 25, 'cat_fashion', true, 12, false, null);

-- ACCESSORIES (remaining items to reach good variety)
INSERT INTO products (id, title, slug, description, price, discount_percentage, category_id, in_stock, stock_quantity, is_featured, collection_tag) VALUES
('prod_031', 'Gold Chain Necklace - Delicate', 'gold-chain-necklace-delicate', '14k gold filled delicate chain necklace. Perfect for layering or wearing alone.', 85.00, 10, 'cat_accessories', true, 35, false, null),
('prod_032', 'Designer Sunglasses - Tortoise', 'designer-sunglasses-tortoise', 'Classic tortoise shell sunglasses with UV protection. Timeless style with modern comfort.', 165.00, 25, 'cat_accessories', true, 20, false, null),
('prod_033', 'Leather Wallet - Black', 'leather-wallet-black', 'Genuine leather wallet with multiple card slots. Compact design with RFID protection.', 75.00, 0, 'cat_accessories', true, 40, false, null),
('prod_034', 'Statement Ring - Rose Gold', 'statement-ring-rose-gold', 'Bold statement ring in rose gold with cubic zirconia. Eye-catching design for special occasions.', 55.00, 15, 'cat_accessories', true, 25, false, null),
('prod_035', 'Silk Hair Ribbon - Champagne', 'silk-hair-ribbon-champagne', 'Luxurious silk hair ribbon in champagne color. Versatile accessory for hair or as a scarf accent.', 32.00, 0, 'cat_accessories', true, 50, false, null);

-- Insert Product Images (2-3 images per product)
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
-- New Arrivals
('prod_001', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Radiant Glow Foundation bottle', 1),
('prod_001', 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', 'Foundation application', 2),
('prod_002', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Silk scrunchie set', 1),
('prod_003', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 'Botanical face mist', 1),

-- Best Sellers
('prod_004', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Ruby red lipstick', 1),
('prod_004', 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', 'Lipstick swatch', 2),
('prod_005', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 'Retinol serum bottle', 1),
('prod_006', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Camel crossbody bag', 1),
('prod_007', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Waterproof mascara', 1),
('prod_008', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Pearl drop earrings', 1),

-- Cosmetics
('prod_009', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Sunset eyeshadow palette', 1),
('prod_010', 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', 'Peachy cream blush', 1),
('prod_011', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Liquid eyeliner', 1),
('prod_012', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 'Golden highlighter', 1),
('prod_013', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Nude lip gloss set', 1),
('prod_014', 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', 'Bronzer palette', 1),
('prod_015', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 'Setting spray bottle', 1),
('prod_016', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Concealer stick', 1),
('prod_017', 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', 'Eyebrow pencil', 1),
('prod_018', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Lip liner set', 1),

-- Skincare
('prod_019', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 'Vitamin C serum', 1),
('prod_020', 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', 'Foaming cleanser', 1),
('prod_021', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 'Night cream jar', 1),

-- Fashion
('prod_022', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Cashmere scarf', 1),
('prod_023', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Silk camisole', 1),
('prod_024', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Wide leg trousers', 1),
('prod_025', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Knit cardigan', 1),
('prod_026', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Floral wrap dress', 1),
('prod_027', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Black blazer', 1),
('prod_028', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Pleated midi skirt', 1),
('prod_029', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'White silk blouse', 1),
('prod_030', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Grey cashmere sweater', 1),

-- Accessories
('prod_031', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Gold chain necklace', 1),
('prod_032', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Tortoise sunglasses', 1),
('prod_033', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Black leather wallet', 1),
('prod_034', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Rose gold statement ring', 1),
('prod_035', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'Champagne silk ribbon', 1);

-- Insert Demo Users
INSERT INTO profiles (id, full_name, email, is_admin) VALUES
('admin-user-id', 'Zoya Belle Admin', 'admin@zoyabelle.com.au', true),
('customer-user-id', 'Sarah Johnson', 'testuser@zoya.com', false);

-- Insert Sample Reviews
INSERT INTO reviews (product_id, user_id, rating, comment, is_approved) VALUES
('prod_004', 'customer-user-id', 5, 'Absolutely love this lipstick! The color is gorgeous and it lasts all day without drying out my lips. Will definitely repurchase!', true),
('prod_005', 'customer-user-id', 5, 'This retinol serum has transformed my skin! I''ve been using it for 6 weeks and can see a real difference in fine lines. Highly recommend!', true),
('prod_006', 'customer-user-id', 4, 'Beautiful bag with excellent quality leather. The size is perfect for daily use and the camel color goes with everything.', true),
('prod_001', 'customer-user-id', 5, 'Best foundation I''ve ever used! Great coverage and the SPF is a bonus. My skin looks flawless all day.', true),
('prod_009', 'customer-user-id', 4, 'Stunning eyeshadow palette with amazing pigmentation. The sunset colors are perfect for creating beautiful looks.', true);

-- Insert Store Information
INSERT INTO store_info (id, address, phone, email, whatsapp_number, business_hours, social_links) VALUES
('store-info-1', 'Suite 123, Collins Street, Melbourne VIC 3000, Australia', '+61 3 9876 5432', 'hello@zoyabelle.com.au', '+61411632317', 
'{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Closed"}',
'{"instagram": "@zoyabelle", "facebook": "ZoyaBelleAU", "twitter": "@zoyabelle"}');

-- Insert Homepage Content
INSERT INTO homepage_content (id, hero_title, hero_subtitle, hero_image_url) VALUES
('homepage-1', 'BEYOND SHOPPING, IT''S A LIFESTYLE', 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg');