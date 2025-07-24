import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { HomepageContent } from '../../types';

export const HeroSection: React.FC = () => {
  const [content, setContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_content')
          .select('*')
          .single();

        if (error || !data) {
          console.warn('Database error or homepage_content table not found, using default content:', error?.message);
          // Use default content when database isn't set up
          setContent({
            id: '',
            hero_title: 'BEYOND SHOPPING, IT\'S A LIFESTYLE',
            hero_subtitle: 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.',
            hero_image_url: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
            updated_at: '',
          });
        } else {
          setContent(data);
        }
      } catch (error) {
        console.warn('Using default homepage content due to database setup');
        // Fallback to default content
        setContent({
          id: '',
          hero_title: 'BEYOND SHOPPING, IT\'S A LIFESTYLE',
          hero_subtitle: 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.',
          hero_image_url: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
          updated_at: '',
        });
      }
    };

    fetchContent();
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!content) return null;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${content.hero_image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display' }}
        >
          {content.hero_title}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto">
          {content.hero_subtitle}
        </p>

        <button
          onClick={scrollToProducts}
          className="inline-flex items-center px-8 py-4 bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Shop Now
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <button onClick={scrollToProducts} className="flex flex-col items-center space-y-2">
          <span className="text-sm opacity-80">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};