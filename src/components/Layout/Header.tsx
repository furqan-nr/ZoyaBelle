import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAuthState } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';


interface HeaderProps {
  onCartOpen: () => void;
  onAuthOpen: () => void;
  onSwitchCategory?: () => void;
  category: 'men' | 'women';
}

export const Header: React.FC<HeaderProps> = ({ onCartOpen, onAuthOpen, onSwitchCategory, category }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthState();
  const { totalItems } = useCart();

  const navigation = [
    { name: 'New Arrivals', href: '#new-arrivals' },
    { name: 'Best Sellers', href: '#best-sellers' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
              Zoya Belle
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pink-300 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
            {/* Switch Category Button */}
            {category === 'men' ? (
              <button
                className="ml-6 px-5 py-2 rounded-full bg-pink-400 text-white font-semibold text-sm shadow hover:bg-pink-500 transition-colors duration-200 focus:outline-none"
                onClick={onSwitchCategory}
              >
                Women
              </button>
            ) : (
              <button
                className="ml-6 px-5 py-2 rounded-full bg-blue-400 text-white font-semibold text-sm shadow hover:bg-blue-500 transition-colors duration-200 focus:outline-none"
                onClick={onSwitchCategory}
              >
                Men
              </button>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="text-gray-700 hover:text-pink-300 transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>

            {/* User Account */}
            <button 
              onClick={onAuthOpen}
              className="text-gray-700 hover:text-pink-300 transition-colors duration-200"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button 
              onClick={onCartOpen}
              className="relative text-gray-700 hover:text-pink-300 transition-colors duration-200"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-300 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-pink-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-300 transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};