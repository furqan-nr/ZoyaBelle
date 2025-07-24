export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fAkR1B5dMJigQW_6hEqW8K6w';

export const createPayPalOrder = (amount: number) => {
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'AUD',
          value: amount.toFixed(2),
        },
        description: 'Zoya Belle Purchase',
      },
    ],
    application_context: {
      brand_name: 'Zoya Belle',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
    },
  };
};

export const onPayPalApprove = async (data: any, actions: any) => {
  try {
    const order = await actions.order.capture();
    return order;
  } catch (error) {
    console.error('PayPal payment error:', error);
    throw error;
  }
};