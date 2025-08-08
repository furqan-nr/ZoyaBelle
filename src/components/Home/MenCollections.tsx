import React from 'react';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types';

// Helper to generate a random discount (0, 10, 20, or 30%)
const randomDiscount = () => {
  const discounts = [0, 10, 20, 30];
  return discounts[Math.floor(Math.random() * discounts.length)];
};

// Men products as Product type
const menProducts: Product[] = [
  {
    id: 'm1',
    title: 'Classic Blue Short Sleeve Shirt',
    slug: 'classic-blue-short-sleeve-shirt',
    description: 'A timeless classic, this light blue short sleeve shirt is perfect for both casual and formal occasions. Made from premium cotton for all-day comfort.',
    price: 49.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 10,
    is_featured: true,
    collection_tag: 'New Arrival',
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img1', product_id: 'm1', image_url: '/assets/formal blue shirt.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm2',
    title: 'Sandstone Casual Shirt',
    slug: 'sandstone-casual-shirt',
    description: 'Stay cool and stylish with this sandstone short sleeve shirt, crafted from breathable cotton. Ideal for relaxed weekends or smart-casual outings.',
    price: 54.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 8,
    is_featured: false,
    collection_tag: 'New Arrival',
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img2', product_id: 'm2', image_url: '/assets/casual shirt and pent.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm3',
    title: 'Khaki Smart-Casual Shirt',
    slug: 'khaki-smart-casual-shirt',
    description: 'Versatile khaki short sleeve shirt, perfect for both smart and casual looks. Made from soft, durable cotton for everyday wear.',
    price: 59.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 12,
    is_featured: false,
    collection_tag: "Nazish's Picks",
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img3', product_id: 'm3', image_url: '/assets/casual blue shirt.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm4',
    title: 'Beige Short Sleeve Shirt',
    slug: 'beige-short-sleeve-shirt',
    description: 'A modern beige short sleeve shirt crafted from lightweight cotton, ideal for summer days and casual outings.',
    price: 57.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 7,
    is_featured: false,
    collection_tag: "Nazish's Picks",
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img4', product_id: 'm4', image_url: '/assets/picnic shirt.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm5',
    title: 'Classic Light Blue Shirt',
    slug: 'classic-light-blue-shirt',
    description: 'A crisp, light blue short sleeve shirt made from soft cotton. Perfect for business casual or weekend wear.',
    price: 52.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 9,
    is_featured: false,
    collection_tag: "Nazish's Picks",
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img5', product_id: 'm5', image_url: '/assets/casual blue shirt.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm6',
    title: 'White Formal Shirt',
    slug: 'white-formal-shirt',
    description: 'Elegant white long sleeve shirt crafted from premium cotton. Ideal for formal events, office wear, or any occasion that calls for a sharp, classic look.',
    price: 64.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 6,
    is_featured: true,
    collection_tag: 'Best Seller',
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img6', product_id: 'm6', image_url: '/assets/white formal shirt.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm7',
    title: 'Beach Graphic T-Shirt',
    slug: 'beach-graphic-t-shirt',
    description: 'White cotton t-shirt featuring a stylish beach and surfboard graphic. Perfect for summer days and casual outings by the sea.',
    price: 39.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 15,
    is_featured: true,
    collection_tag: 'Best Seller',
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img7', product_id: 'm7', image_url: '/assets/t shirt picnic.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
  {
    id: 'm8',
    title: 'Classic White T-Shirt',
    slug: 'classic-white-t-shirt',
    description: 'Essential white t-shirt crafted from soft, breathable cotton. Perfect for layering or wearing solo for a clean, timeless look.',
    price: 29.99,
    discount_percentage: randomDiscount(),
    category_id: 'men',
    in_stock: true,
    stock_quantity: 20,
    is_featured: false,
    collection_tag: 'Best Seller',
    created_at: '',
    updated_at: '',
    product_images: [{ id: 'img8', product_id: 'm8', image_url: '/assets/white gym shirt.png', sort_order: 1, created_at: '' }],
    reviews: [],
    category: undefined,
  },
];

export const MenCollections: React.FC = () => {
  const { addToCart } = useCart();

  // Filter by collection_tag
  const newArrivals = menProducts.filter(p => p.collection_tag?.toLowerCase().includes('new arrival'));
  const bestSellers = menProducts.filter(p => p.collection_tag?.toLowerCase().includes('best seller'));
  const nazishPicks = menProducts.filter(p => p.collection_tag?.toLowerCase().includes('nazish'));
  const products = menProducts;

  const getProductImage = (product: Product) => {
    return product.product_images?.[0]?.image_url || '/assets/white gym shirt.png';
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const CollectionGrid: React.FC<{ products: Product[]; title: string; id?: string }> = ({ products, title, id }) => (
    <div className="mb-16" {...(id ? { id } : {})}>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No products yet.</div>
        ) : (
          products.map((product) => (
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
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <section id="men-collections" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Men Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest men’s selections. Shop the best in men’s fashion and style.
          </p>
        </div>
        <CollectionGrid products={newArrivals} title="New Arrivals" id="men-new-arrivals" />
        <CollectionGrid products={bestSellers} title="Best Sellers" id="men-best-sellers" />
        <CollectionGrid products={nazishPicks} title="Nazish's Picks" />
        <CollectionGrid products={products} title="Products" id="men-products" />
      </div>
    </section>
  );
};

export default MenCollections;
