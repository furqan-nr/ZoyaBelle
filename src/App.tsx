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
import { MenCollections } from './components/Home/MenCollections';
import { productsAPI } from './lib/api';
import type { Product, Category } from './types';
import { WhatsAppButton } from './components/UI/WhatsAppButton';
import { CartSidebar } from './components/UI/CartSidebar';
import { AuthModal } from './components/Auth/AuthModal';
import { CheckoutModal } from './components/Checkout/CheckoutModal';


function HomePage() {
  const [view, setView] = useState<'landing' | 'women' | 'men'>('landing');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (view === 'women') {
      const fetchProducts = async () => {
        try {
          const products = await productsAPI.getAll();
          setProducts(products);
        } catch (error) {
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
                { id: 'img1', product_id: '1', image_url: '/assets/velvet-matte-lipstick.png', sort_order: 1, created_at: '' }
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
                { id: 'img2', product_id: '2', image_url: '/assets/foundation.png', sort_order: 1, created_at: '' }
              ]
            },
            // Eye Lashes product for both Product Catalog and Nazish's Pick
            {
              id: 'eye-lashes',
              title: 'Premium Eye Lashes',
              slug: 'premium-eye-lashes',
              description: 'Handcrafted, lightweight, and reusable eye lashes for a natural yet glamorous look. Comfortable all-day wear. Includes 3 unique styles in one pack.',
              price: 45,
              discount_percentage: 0,
              category_id: '1',
              in_stock: true,
              stock_quantity: 20,
              is_featured: true,
              collection_tag: "Nazish's Pick",
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'eye_lashes3', product_id: 'eye-lashes', image_url: '/assets/eye_lashes3.jpg', sort_order: 1, created_at: '' },
                { id: 'eye_lashes1', product_id: 'eye-lashes', image_url: '/assets/eye_lashes1.jpg', sort_order: 2, created_at: '' },
                { id: 'eye_lashes2', product_id: 'eye-lashes', image_url: '/assets/eye_lashes2.jpg', sort_order: 3, created_at: '' }
              ]
            },
            // New products from unused images
            {
              id: 'bangles',
              title: 'Elegant Bangles Set',
              slug: 'elegant-bangles-set',
              description: 'A set of gold-toned bangles, perfect for festive and formal occasions. Durable and lightweight.',
              price: 60,
              discount_percentage: 10,
              category_id: '2',
              in_stock: true,
              stock_quantity: 15,
              is_featured: true,
              collection_tag: 'Best Sellers',
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'bangles', product_id: 'bangles', image_url: '/assets/bangles.jpg', sort_order: 1, created_at: '' }
              ]
            },
            {
              id: 'ear-rings',
              title: 'Classic Ear Rings',
              slug: 'classic-ear-rings',
              description: 'Timeless ear rings with a modern twist. Adds elegance to any look.',
              price: 35,
              discount_percentage: 0,
              category_id: '2',
              in_stock: true,
              stock_quantity: 18,
              is_featured: false,
              collection_tag: "Nazish's Pick",
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'ear_rings', product_id: 'ear-rings', image_url: '/assets/ear_rings.jpg', sort_order: 1, created_at: '' }
              ]
            },
            {
              id: 'bangles-earring-set',
              title: 'Bangles & Ear Rings Set',
              slug: 'bangles-earring-set',
              description: 'A coordinated set of bangles and ear rings for a complete festive look.',
              price: 85,
              discount_percentage: 15,
              category_id: '2',
              in_stock: true,
              stock_quantity: 10,
              is_featured: true,
              collection_tag: 'New Arrivals',
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'bangles-earring-set', product_id: 'bangles-earring-set', image_url: '/assets/bangles ring ear ring set.jpg', sort_order: 1, created_at: '' }
              ]
            },
            {
              id: 'golden-nails',
              title: 'Golden Press-On Nails',
              slug: 'golden-press-on-nails',
              description: 'Reusable golden press-on nails for instant glam. Includes 24 nails in multiple sizes.',
              price: 25,
              discount_percentage: 0,
              category_id: '3',
              in_stock: true,
              stock_quantity: 30,
              is_featured: false,
              collection_tag: 'Best Sellers',
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'golden_nails1', product_id: 'golden-nails', image_url: '/assets/golden_nails1.jpg', sort_order: 1, created_at: '' },
                { id: 'golden_nails2', product_id: 'golden-nails', image_url: '/assets/golden_nails2.jpg', sort_order: 2, created_at: '' },
                { id: 'golden_nails3', product_id: 'golden-nails', image_url: '/assets/golden_nails3.jpg', sort_order: 3, created_at: '' }
              ]
            },
            {
              id: 'pink-nails',
              title: 'Pink Press-On Nails',
              slug: 'pink-press-on-nails',
              description: 'Reusable pink press-on nails for a soft, feminine look. Includes 24 nails in multiple sizes.',
              price: 25,
              discount_percentage: 0,
              category_id: '3',
              in_stock: true,
              stock_quantity: 25,
              is_featured: false,
              collection_tag: 'New Arrivals',
              created_at: '',
              updated_at: '',
              product_images: [
                { id: 'pink_nails', product_id: 'pink-nails', image_url: '/assets/pink_nails.jpg', sort_order: 1, created_at: '' }
              ]
            }
          ]);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [view]);

  if (view === 'landing') {
    return (
      <div className="min-h-screen flex flex-col relative" style={{ backgroundImage: "url('/assets/main.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-60 z-0 pointer-events-none" />
        {/* Header with only logo */}
        <header className="bg-white bg-opacity-80 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <h1 className="text-3xl font-bold text-gray-900 mx-auto" style={{ fontFamily: 'Playfair Display' }}>
              Zoya Belle
            </h1>
          </div>
        </header>
        {/* Category selection */}
        <section className="flex flex-col items-center justify-center py-24 z-10">
          <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Select Your Category</h2>
            <div className="flex space-x-8">
              <button
                className="px-8 py-4 rounded-full text-xl font-bold bg-pink-300 text-white shadow-lg hover:bg-pink-400 transition-colors duration-200 focus:outline-none"
                onClick={() => setView('women')}
              >
                Women
              </button>
              <button
                className="px-8 py-4 rounded-full text-xl font-bold bg-blue-400 text-white shadow-lg hover:bg-blue-500 transition-colors duration-200 focus:outline-none"
                onClick={() => setView('men')}
              >
                Men
              </button>
            </div>
          </div>
        </section>
        {/* About section */}
        <section className="flex items-center justify-center py-24 z-10">
          <div className="w-full max-w-4xl bg-white bg-opacity-80 rounded-xl shadow-lg px-4 py-8">
            <AboutSection onlyWhyChoose />
          </div>
        </section>
        <div className="relative z-20">
          <Footer />
        </div>
        <WhatsAppButton />
      </div>
    );
  }

  // Women view (current homepage)
  if (view === 'women') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onCartOpen={() => setIsCartOpen(true)}
          onAuthOpen={() => setIsAuthOpen(true)}
          category="women"
          onSwitchCategory={() => setView('men')}
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

  // Men view (empty sections)
  if (view === 'men') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onCartOpen={() => setIsCartOpen(true)}
          onAuthOpen={() => setIsAuthOpen(true)}
          category="men"
          onSwitchCategory={() => setView('women')}
        />
        <main>
          <MenCollections />
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