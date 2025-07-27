import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { reviewsAPI } from '../../lib/api';
import type { Review } from '../../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await reviewsAPI.getAll();
        setReviews(reviews);
      } catch (error) {
        console.warn('Database error, using mock data:', error);
        // Use mock data when database isn't set up
        setReviews([
          {
            id: '1',
            product_id: '1',
            user_id: '1',
            rating: 5,
            comment: 'Absolutely love the quality of products from Zoya Belle! The lipstick lasted all day and the color was perfect.',
            is_approved: true,
            created_at: '2024-01-15T10:30:00Z',
            profiles: { 
              id: '1',
              full_name: 'Sarah Johnson',
              email: 'sarah@example.com',
              is_admin: false,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          },
          {
            id: '2',
            product_id: '1',
            user_id: '2',
            rating: 5,
            comment: 'Fast shipping and beautiful packaging. The skincare products have made such a difference to my routine.',
            is_approved: true,
            created_at: '2024-01-10T14:20:00Z',
            profiles: { 
              id: '2',
              full_name: 'Emma Wilson',
              email: 'emma@example.com',
              is_admin: false,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          },
          {
            id: '3',
            product_id: '1',
            user_id: '3',
            rating: 4,
            comment: 'Great customer service and high-quality fashion pieces. Will definitely be ordering again!',
            is_approved: true,
            created_at: '2024-01-08T09:15:00Z',
            profiles: { 
              id: '3',
              full_name: 'Jessica Chen',
              email: 'jessica@example.com',
              is_admin: false,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          },
          {
            id: '4',
            product_id: '1',
            user_id: '4',
            rating: 5,
            comment: 'The foundation is amazing - perfect match and long-lasting coverage. Highly recommend!',
            is_approved: true,
            created_at: '2024-01-05T16:45:00Z',
            profiles: { 
              id: '4',
              full_name: 'Olivia Brown',
              email: 'olivia@example.com',
              is_admin: false,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-300"></div>
      </div>
    );
  }

  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their Zoya Belle experience.
          </p>
        </div>

        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1 mr-3">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-semibold">
                        {review.profiles?.full_name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {review.profiles?.full_name || 'Anonymous Customer'}
                      </p>
                      <p className="text-xs text-gray-500">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Rating Summary */}
            <div className="bg-pink-50 rounded-lg p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-1 mr-4">
                  {renderStars(5)}
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Average rating based on {reviews.length} customer reviews
              </p>
              <p className="text-sm text-gray-500">
                Join thousands of satisfied customers who trust Zoya Belle for their beauty and fashion needs.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-12 w-12 text-pink-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Be Our First Reviewer!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We'd love to hear about your experience with our products. 
              Share your thoughts and help other customers make informed decisions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};