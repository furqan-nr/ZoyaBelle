import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
              Zoya Belle
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium beauty and fashion essentials curated just for you. 
              Elevate your style with our exclusive collections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-300 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-300 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-300 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                About Us
              </a>
              <a href="#products" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Products
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Contact
              </a>
              <a href="#" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <a href="#cosmetics" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Cosmetics
              </a>
              <a href="#skincare" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Skincare
              </a>
              <a href="#fashion" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Fashion
              </a>
              <a href="#accessories" className="block text-gray-400 hover:text-pink-300 transition-colors duration-200 text-sm">
                Accessories
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-pink-300" />
                <span className="text-gray-400 text-sm">
                  Suite 123, Collins Street<br />
                  Melbourne VIC 3000, Australia
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-pink-300" />
                <span className="text-gray-400 text-sm">+61 3 9876 5432</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-pink-300" />
                <span className="text-gray-400 text-sm">hello@zoyabelle.com.au</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Zoya Belle. All rights reserved. Made with ❤️ in Australia.
          </p>
        </div>
      </div>
    </footer>
  );
};