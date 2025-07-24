/*
  # Insert Demo Users and Reviews

  1. Demo Users
    - Admin user: admin@zoyabelle.com.au / Admin@123
    - Customer user: testuser@zoya.com / Test@123

  2. Sample Reviews
    - 5 realistic customer reviews across different products
    - Mix of ratings from 4-5 stars
    - Approved reviews ready for display

  Note: This migration should be run after user accounts are created through the auth system
*/

-- Insert demo user profiles (these will be created when users sign up through the auth system)
-- The actual user creation happens through Supabase Auth, these are just the profile records

-- Insert sample reviews (using placeholder user IDs that will be updated when real users are created)
DO $$
DECLARE
    lipstick_id uuid;
    serum_id uuid;
    scarf_id uuid;
    foundation_id uuid;
    night_cream_id uuid;
BEGIN
    -- Get product IDs
    SELECT id INTO lipstick_id FROM products WHERE slug = 'matte-liquid-lipstick-rose-dust';
    SELECT id INTO serum_id FROM products WHERE slug = 'hydrating-face-serum-vitamin-c';
    SELECT id INTO scarf_id FROM products WHERE slug = 'silk-scarf-floral-print';
    SELECT id INTO foundation_id FROM products WHERE slug = 'premium-foundation-natural-glow';
    SELECT id INTO night_cream_id FROM products WHERE slug = 'anti-aging-night-cream';

    -- Insert sample reviews with placeholder user IDs
    -- These will need to be updated with real user IDs after account creation
    INSERT INTO reviews (product_id, user_id, rating, comment, is_approved, created_at) VALUES
    (lipstick_id, '00000000-0000-0000-0000-000000000001', 5, 'Absolutely love this lipstick! The color is perfect and it lasts all day without smudging. The matte finish is so comfortable and doesn''t dry out my lips. Highly recommend!', true, now() - interval '10 days'),
    (serum_id, '00000000-0000-0000-0000-000000000002', 4, 'Great serum! I noticed a difference in my skin brightness after just a week of use. The vitamin C really works and my complexion looks more even. Will definitely repurchase.', true, now() - interval '8 days'),
    (scarf_id, '00000000-0000-0000-0000-000000000003', 5, 'Beautiful scarf with amazing quality silk. The floral print is elegant and sophisticated. Perfect for both casual and formal occasions. Worth every penny!', true, now() - interval '6 days'),
    (foundation_id, '00000000-0000-0000-0000-000000000004', 4, 'The foundation blends beautifully and gives a natural finish. Great coverage without feeling heavy. The shade match is perfect. Will definitely repurchase!', true, now() - interval '4 days'),
    (night_cream_id, '00000000-0000-0000-0000-000000000005', 5, 'This night cream is incredible! I''ve been using it for a month and my skin feels so much smoother and firmer. The anti-aging benefits are really noticeable. Love it!', true, now() - interval '2 days');
END $$;