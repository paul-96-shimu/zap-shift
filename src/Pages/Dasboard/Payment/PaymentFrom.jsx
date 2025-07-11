import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxios from '../../../Hooks/UseAxios';

import { toast } from 'react-toastify';
import CustomHooks from '../../../Hooks/CustomHooks';

const PaymentFrom = ({ parcelId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxios();
  const { user } = CustomHooks()

  // ✅ Get parcel by ID
  const { isLoading, data: parcel = {}, error } = useQuery({
    queryKey: ['parcel', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId,
  });

  if (isLoading) return <p className="text-center text-blue-500 mt-8">Loading parcel data...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">❌ Error loading parcel</p>;

  const price = parcel.cost;
  const priceInCents = Math.round(price * 100); // 🔧 Stripe requires integer cents

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      console.error('❌ Payment method error:', methodError.message);
      toast.error(methodError.message);
      return;
    }

    console.log('✅ Created payment method:', paymentMethod);

    // Step 2: create payment intent from backend
    const res = await axiosSecure.post('/create-payment-intent', {
      priceInCents,
      parcelId,
    });

    const clientSecret = res?.data?.clientSecret;

    if (!clientSecret) {
      console.error('Client secret not received');
      toast.error('Payment initialization failed.');
      return;
    }

    // Step 3: confirm payment
    const confirmResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Unknown',
          email: user?.email || 'no-email@example.com',
        },
      },
    });

    if (confirmResult.error) {
      console.error('❌ Payment failed:', confirmResult.error.message);
      toast.error(confirmResult.error.message);
    } else if (confirmResult.paymentIntent.status === 'succeeded') {
      console.log('✅ Payment successful:', confirmResult.paymentIntent);

      // Step 4: store payment history in DB
      const paymentData = {
        parcelId,
        transactionId: confirmResult.paymentIntent.id,
        amount: price,
        userEmail: user?.email,
        paid_at: new Date(),
      };

      await axiosSecure.post('/payments', paymentData);

      toast.success('✅ Payment successful and recorded!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        💳 Pay for: {parcel.title}
      </h2>
      <p className="text-center mb-4 text-gray-500">Cost: ৳{parcel.cost}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-300 rounded p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: {
                  color: '#e53e3e',
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Pay Now ৳{price}
        </button>
      </form>
    </div>
  );
};

export default PaymentFrom;
