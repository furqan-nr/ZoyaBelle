import React from 'react';

export const MenCollections: React.FC = () => {
  const classicWhiteGymShirt = {
    name: 'Classic White T-Shirt',
    description: 'Essential white t-shirt crafted from soft, breathable cotton. Perfect for layering or wearing solo for a clean, timeless look.',
    price: 29.99, // AUD
    image: '/assets/white gym shirt.png',
  };
  // Product data for Men Collections
  const menShirt = {
    name: 'Classic Blue Short Sleeve Shirt',
    description: 'A timeless classic, this light blue short sleeve shirt is perfect for both casual and formal occasions. Made from premium cotton for all-day comfort.',
    price: 49.99, // AUD
    image: '/assets/formal blue shirt.png',
  };
  const beigeShirt = {
    name: 'Sandstone Casual Shirt',
    description: 'Stay cool and stylish with this sandstone short sleeve shirt, crafted from breathable cotton. Ideal for relaxed weekends or smart-casual outings.',
    price: 54.99, // AUD
    image: '/assets/casual shirt and pent.png',
  };
  const khakiShirt = {
    name: 'Khaki Smart-Casual Shirt',
    description: 'Versatile khaki short sleeve shirt, perfect for both smart and casual looks. Made from soft, durable cotton for everyday wear.',
    price: 59.99, // AUD
    image: '/assets/casual blue shirt.png',
  };
  const beigeShortSleeveShirt = {
    name: 'Beige Short Sleeve Shirt',
    description: 'A modern beige short sleeve shirt crafted from lightweight cotton, ideal for summer days and casual outings.',
    price: 57.99, // AUD
    image: '/assets/picnic shirt.png',
  };
  const classicLightBlueShirt = {
    name: 'Classic Light Blue Shirt',
    description: 'A crisp, light blue short sleeve shirt made from soft cotton. Perfect for business casual or weekend wear.',
    price: 52.99, // AUD
    image: '/assets/casual blue shirt.png',
  };
  const whiteFormalShirt = {
    name: 'White Formal Shirt',
    description: 'Elegant white long sleeve shirt crafted from premium cotton. Ideal for formal events, office wear, or any occasion that calls for a sharp, classic look.',
    price: 64.99, // AUD
    image: '/assets/white formal shirt.png',
  };
  const beachGraphicTee = {
    name: 'Beach Graphic T-Shirt',
    description: 'White cotton t-shirt featuring a stylish beach and surfboard graphic. Perfect for summer days and casual outings by the sea.',
    price: 39.99, // AUD
    image: '/assets/t shirt picnic.png',
  };
  const newArrivals: any[] = [menShirt, beigeShirt];
  const bestSellers: any[] = [whiteFormalShirt, beachGraphicTee, classicWhiteGymShirt];
  const nazishPicks: any[] = [khakiShirt, beigeShortSleeveShirt, classicLightBlueShirt];
  const products: any[] = [menShirt, beigeShirt, khakiShirt, beigeShortSleeveShirt, classicLightBlueShirt, whiteFormalShirt, beachGraphicTee, classicWhiteGymShirt];

  const CollectionGrid: React.FC<{ title: string; id?: string; items?: any[] }> = ({ title, id, items = [] }) => (
    <div className="mb-16" {...(id ? { id } : {})}>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No products yet.</div>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-contain mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">{item.name}</h3>
              <p className="text-gray-600 text-center mb-2">{item.description}</p>
              <span className="text-blue-700 font-bold text-lg mb-2">{item.price.toFixed(2)} AUD</span>
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
            Discover our upcoming men’s selections. Sections are ready, products coming soon!
          </p>
        </div>
        <CollectionGrid title="New Arrivals" id="men-new-arrivals" items={newArrivals} />
        <CollectionGrid title="Best Sellers" id="men-best-sellers" items={bestSellers} />
        <CollectionGrid title="Nazish's Picks" items={nazishPicks} />
        <CollectionGrid title="Products" id="men-products" items={products} />
      </div>
    </section>
  );
};

export default MenCollections;
