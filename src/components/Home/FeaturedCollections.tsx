import React from 'react';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types';

interface FeaturedCollectionsProps {
  products: Product[];
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ products }) => {
  const { addToCart } = useCart();
  // Filter products by collection_tag
  const newArrivals = products.filter(p => p.collection_tag && p.collection_tag.toLowerCase().includes('new arrival'));
  const bestSellers = products.filter(p => p.collection_tag && p.collection_tag.toLowerCase().includes('best seller'));
  const nazishPicks = products.filter(p => p.collection_tag && p.collection_tag.toLowerCase().includes('nazish'));

  const getProductImage = (product: Product) => {
    return product.product_images?.[0]?.image_url || 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg';
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optionally add a toast notification here
  };

  const CollectionGrid: React.FC<{ products: Product[]; title: string; id?: string }> = ({ products, title, id }) => (
    <div className="mb-16" {...(id ? { id } : {})}>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <img
                src={getProductImage(product)}
                alt={product.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.discount_percentage > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  {product.discount_percentage}% OFF
                </div>
              )}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {product.discount_percentage > 0 ? (
                    <>
                      <span className="text-lg font-bold text-red-600">
                        ${getDiscountedPrice(product.price, product.discount_percentage).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.in_stock}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    product.in_stock
                      ? 'bg-pink-300 hover:bg-pink-400 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="collections" className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selections featuring the latest trends, 
            customer favorites, and Nazish's personal recommendations.
          </p>
        </div>

        {newArrivals.length > 0 && <CollectionGrid products={newArrivals} title="New Arrivals" id="new-arrivals" />}
        {bestSellers.length > 0 && <CollectionGrid products={bestSellers} title="Best Sellers" id="best-sellers" />}
        {nazishPicks.length > 0 && <CollectionGrid products={nazishPicks} title="Nazish's Picks" />}
      </div>
    </section>
  );
};