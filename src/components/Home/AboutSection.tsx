import React from 'react';
import { Heart, Award, Truck, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Curated with Love',
      description: 'Every product is personally selected for quality and style by our team.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We partner with trusted brands to bring you only the finest products.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure shipping across Australia with tracking included.'
    },
    {
      icon: Shield,
      title: 'Satisfaction Guarantee',
      description: '30-day return policy on all items. Your satisfaction is our priority.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-r from-pink-50 to-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
              About Zoya Belle
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Zoya Belle is more than just a beauty and fashion destination—it's a lifestyle brand 
              dedicated to empowering Australian women through premium, carefully curated products. 
              Founded with the vision of making luxury accessible, we believe every woman deserves 
              to feel confident and beautiful in her own skin.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our collections feature handpicked items from trusted global and local brands, 
              ensuring quality and style in every purchase. From everyday essentials to special 
              occasion pieces, we're here to elevate your beauty routine and wardrobe.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300 mb-1">5000+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300 mb-1">500+</div>
                <div className="text-gray-600 text-sm">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300 mb-1">3</div>
                <div className="text-gray-600 text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/assets/about.png"
              alt="About Zoya Belle"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm">
                To inspire confidence and celebrate the unique beauty of every Australian woman.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12" style={{ fontFamily: 'Playfair Display' }}>
            Why Choose Zoya Belle?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-300 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};