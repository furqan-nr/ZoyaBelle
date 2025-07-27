import React, { useState, useEffect } from 'react';
import { X, CreditCard, Truck, MapPin, User, Mail, Phone } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { stripePromise } from '../../lib/stripe';
import { PAYPAL_CLIENT_ID, createPayPalOrder, onPayPalApprove } from '../../lib/paypal';
import { StripeCheckoutForm } from './StripeCheckoutForm';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { ordersAPI } from '../../lib/api';
import { v4 as uuidv4 } from 'uuid';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: profile?.full_name || '',
    email: profile?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'VIC',
    postcode: '',
    country: 'Australia',
  });

  const shippingCost = 9.95;
  const finalTotal = totalPrice + shippingCost;

  useEffect(() => {
    if (profile) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        email: profile.email || '',
      }));
    }
  }, [profile]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postcode) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setStep('payment');
  };

  const createOrder = async (paymentData: any) => {
    try {
      const orderData = {
        id: uuidv4(),
        user_id: user.id,
        total_amount: total,
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: paymentMethod,
        shipping_address: JSON.stringify(shippingInfo),
        notes: `Payment ID: ${paymentData.id || paymentData.orderID}`,
        items: items.map(item => {
          const unitPrice = item.product.discount_percentage > 0 
            ? item.product.price * (1 - item.product.discount_percentage / 100)
            : item.product.price;
          return {
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: unitPrice,
            total_price: unitPrice * item.quantity
          };
        })
      };

      // Create order with items
      const order = await ordersAPI.create(orderData);
      setOrderId(order.id);
      setStep('confirmation');
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to create order. Please try again.');
    }
  };

  const handlePayPalSuccess = async (details: any) => {
    setLoading(true);
    try {
      await createOrder(details);
    } catch (error) {
      setError('Payment successful but order creation failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleStripeSuccess = async (paymentIntent: any) => {
    setLoading(true);
    try {
      await createOrder(paymentIntent);
    } catch (error) {
      setError('Payment successful but order creation failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 'shipping' && 'Shipping Information'}
            {step === 'payment' && 'Payment Method'}
            {step === 'confirmation' && 'Order Confirmation'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'shipping' ? 'bg-pink-300 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <Truck className="h-4 w-4" />
              </div>
              <div className={`w-12 h-0.5 ${step !== 'shipping' ? 'bg-pink-300' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'payment' ? 'bg-pink-300 text-white' : step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <CreditCard className="h-4 w-4" />
              </div>
              <div className={`w-12 h-0.5 ${step === 'confirmation' ? 'bg-green-500' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                ✓
              </div>
            </div>
          </div>

          {/* Shipping Information Step */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                  >
                    <option value="NSW">New South Wales</option>
                    <option value="VIC">Victoria</option>
                    <option value="QLD">Queensland</option>
                    <option value="WA">Western Australia</option>
                    <option value="SA">South Australia</option>
                    <option value="TAS">Tasmania</option>
                    <option value="ACT">Australian Capital Territory</option>
                    <option value="NT">Northern Territory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={shippingInfo.postcode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-pink-300 hover:bg-pink-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)} AUD</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Choose Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'stripe'
                        ? 'border-pink-300 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <span className="font-medium">Credit Card</span>
                      <p className="text-xs text-gray-500 mt-1">Visa, Mastercard, Amex</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-pink-300 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="h-8 w-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">PP</span>
                      </div>
                      <span className="font-medium">PayPal</span>
                      <p className="text-xs text-gray-500 mt-1">Pay with PayPal</p>
                    </div>
                  </button>
                </div>

                {/* Payment Forms */}
                <div className="mt-6">
                  {paymentMethod === 'stripe' && (
                    <Elements stripe={stripePromise}>
                      <StripeCheckoutForm
                        amount={finalTotal}
                        onSuccess={handleStripeSuccess}
                        onError={setError}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </Elements>
                  )}

                  {paymentMethod === 'paypal' && (
                    <PayPalScriptProvider options={{ 
                      "client-id": PAYPAL_CLIENT_ID,
                      currency: "AUD"
                    }}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create(createPayPalOrder(finalTotal));
                        }}
                        onApprove={async (data, actions) => {
                          const details = await onPayPalApprove(data, actions);
                          await handlePayPalSuccess(details);
                        }}
                        onError={(err) => {
                          console.error('PayPal error:', err);
                          setError('PayPal payment failed. Please try again.');
                        }}
                      />
                    </PayPalScriptProvider>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setStep('shipping')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Back to Shipping
              </button>
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-gray-600">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Order ID</p>
                <p className="font-mono text-lg font-semibold">{orderId}</p>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>• A confirmation email has been sent to {shippingInfo.email}</p>
                <p>• Your order will be processed within 1-2 business days</p>
                <p>• You'll receive tracking information once shipped</p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-pink-300 hover:bg-pink-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};