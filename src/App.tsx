import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Providers/AuthProvider';
import { CartProvider } from './components/Providers/CartProvider';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HeroSection } from './components/Home/HeroSection';
import { FeaturedCollections } from './components/Home/FeaturedCollections';
import { ProductCatalog } from './components/Home/ProductCatalog';
import { AboutSection } from './components/Home/AboutSection';
import { ReviewsSection } from './components/Home/ReviewsSection';
import { supabase } from './lib/supabase';
import type { Product, Category } from './types';
// ...existing code...
import { WhatsAppButton } from './components/UI/WhatsAppButton';
import { CartSidebar } from './components/UI/CartSidebar';
import { AuthModal } from './components/Auth/AuthModal';
import { CheckoutModal } from './components/Checkout/CheckoutModal';

function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (productsError || !productsData) {
          // fallback to mock data
          setProducts([
            {
              id: '1',
              title: 'Velvet Matte Lipstick',
              slug: 'velvet-matte-lipstick',
              description: 'Long-lasting matte lipstick in Ruby Red',
              price: 35,
              discount_percentage: 25,
              category_id: '1',
              in_stock: true,
              stock_quantity: 10,
              is_featured: true,
              collection_tag: 'Best Sellers',
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'img1', product_id: '1', image_url: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg', sort_order: 1, created_at: '' }
              ]
            },
            {
              id: '2',
              title: 'Radiant Foundation SPF 30',
              slug: 'radiant-foundation-spf-30',
              description: 'Full coverage foundation with sun protection',
              price: 55,
              discount_percentage: 15,
              category_id: '1',
              in_stock: true,
              stock_quantity: 8,
              is_featured: true,
              collection_tag: 'New Arrivals',
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'img2', product_id: '2', image_url: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', sort_order: 1, created_at: '' }
              ]
            },
            {
              id: 'dummy-nazish',
              title: "Nazish's Favorite Dummy Product",
              slug: 'nazish-favorite-dummy',
              description: 'This is a dummy product for Nazish\'s Picks section.',
              price: 99,
              discount_percentage: 10,
              category_id: '1',
              in_stock: true,
              stock_quantity: 5,
              is_featured: false,
              collection_tag: "Nazish's Pick",
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'img3', product_id: 'dummy-nazish', image_url: 'https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg', sort_order: 1, created_at: '' }
              ]
            }
          ]);
        } else {
          setProducts(productsData);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCartOpen={() => setIsCartOpen(true)}
        onAuthOpen={() => setIsAuthOpen(true)}
      />
      <main>
        <HeroSection />
        <FeaturedCollections products={products} />
        <ProductCatalog products={products} />
        <AboutSection />
        <ReviewsSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Admin panel coming soon...</p>
        <a 
          href="/" 
          className="inline-block mt-4 px-6 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors"
        >
          Back to Store
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;