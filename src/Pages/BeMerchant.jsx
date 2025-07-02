import React from 'react';

import location from '../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div className="hero  p-20 bg-[url('assets/be-a-merchant-bg.png')]  bg-[#03373D] rounded-4xl mb-6">
            <div className="hero-content flex-col lg:flex-row-reverse   ">
                <img
                    src={location}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn bg-[#CAEB66]">Become a Merchant</button>
                     <button className="btn btn-outline ml-6 text-white">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;


