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
import { productsAPI } from './lib/api';
import type { Product, Category } from './types';
import { WhatsAppButton } from './components/UI/WhatsAppButton';
import { CartSidebar } from './components/UI/CartSidebar';
import { AuthModal } from './components/Auth/AuthModal';
import { CheckoutModal } from './components/Checkout/CheckoutModal';


function HomePage() {
  const [view, setView] = useState<'landing' | 'women'>('landing');
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
                onClick={() => alert('Men section coming soon!')}
              >
                Men
              </button>
            </div>
          </div>
        </section>
        {/* About section */}
        <section className="flex items-center justify-center py-24 z-10">
          <div className="w-full max-w-4xl bg-white bg-opacity-80 rounded-xl shadow-lg px-4 py-8">
            <AboutSection />
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Women view (current homepage)
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCartOpen={() => setIsCartOpen(true)}
        onAuthOpen={() => setIsAuthOpen(true)}
        onMenClick={() => setView('landing')}
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