import React from 'react';

import { FaShippingFast, FaMapMarkedAlt, FaWarehouse, FaMoneyBillWave, FaHandshake, FaUndo } from "react-icons/fa";
import ServiceCard from './ServiceCard';




const Service = [

    {
        icon: <FaShippingFast className="text-4xl text-primary" />,
        title: "Express & Standard Delivery",
        description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
        icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
        title: "Nationwide Delivery",
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
        icon: <FaWarehouse className="text-4xl text-primary" />,
        title: "Fulfillment Solution",
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
        icon: <FaMoneyBillWave className="text-4xl text-primary" />,
        title: "Cash on Home Delivery",
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
        icon: <FaHandshake className="text-4xl text-primary" />,
        title: "Corporate Service / Contract In Logistics",
        description: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
        icon: <FaUndo className="text-4xl text-primary" />,
        title: "Parcel Return",
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },

]
const Services = () => {

    return (
        <section className="my-16 px-4 md:px-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Service.map((service, idx) => (
                    <ServiceCard
                        key={idx}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default Services;