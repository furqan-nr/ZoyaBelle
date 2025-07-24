import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';

interface StripeCheckoutFormProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({
  amount,
  onSuccess,
  onError,
  loading,
  setLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    onError('');

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      onError('Card information is incomplete');
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: cardholderName,
        },
      });

      if (paymentMethodError) {
        onError(paymentMethodError.message || 'Payment failed');
        setLoading(false);
        return;
      }

      // For demo purposes, we'll simulate a successful payment
      // In a real app, you'd create a payment intent on your server
      const mockPaymentIntent = {
        id: `pi_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: 'aud',
        status: 'succeeded',
        payment_method: paymentMethod.id,
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      onSuccess(mockPaymentIntent);
    } catch (error: any) {
      onError(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Full name on card"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-pink-300">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-pink-300">
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVC
          </label>
          <div className="p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-pink-300">
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
          loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-pink-300 hover:bg-pink-400 text-white'
        }`}
      >
        {loading ? 'Processing Payment...' : `Pay $${amount.toFixed(2)} AUD`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Demo Mode: Use card number 4242 4242 4242 4242 with any future expiry date and CVC
      </p>
    </form>
  );
};