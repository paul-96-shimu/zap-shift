import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentFrom from './PaymentFrom';
import { useParams } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Payment = () => {
  const {  parcelId } = useParams(); 
  console.log(parcelId)

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
          🔐 Proceed to Payment for Parcel: <span className="text-black">{parcelId}</span>
        </h2>
      
        <PaymentFrom parcelId={parcelId} />
      </div>
    </Elements>
  );
};

export default Payment;
