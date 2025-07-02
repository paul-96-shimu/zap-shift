import React from 'react';
import img1 from '../assets/safe-delivery.png';
import img2 from '../assets/live-tracking.png';
import img3 from '../assets/safe-delivery.png';

const benefits = [
  {
    image: img1,
    title: "Reliable & On-time Delivery",
    description: "We ensure your parcels arrive safely and on schedule, building trust with every delivery.",
  },
  {
    image: img2,
    title: "Nationwide Coverage",
    description: "From urban centers to rural areas, our wide network delivers to every district across Bangladesh.",
  },
  {
    image: img3,
    title: "Smart Tracking",
    description: "Get real-time updates on your deliveries from pickup to doorstep. Transparency at every step.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="px-4 md:px-10 py-14 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>

      <div className="space-y-8">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-base-200 shadow-md rounded-lg">
            
            {/* Left image */}
            <img
              src={benefit.image}
              alt={benefit.title}
              className="w-28 h-28 object-contain"
            />

            {/* Line separator (horizontal in row) */}
            <div className="hidden md:block w-px h-24 bg-gray-300"></div>
            <div className="block md:hidden w-full h-px bg-gray-300 my-4"></div>

            {/* Right content */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
