import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const serviceeCenters = useLoaderData()
    console.log(serviceeCenters)
    return (
        <div className="px-6 md:px-20 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">We are available in 64 districts</h1>

            {/* Placeholder for Search Box (coming later) */}
            <BangladeshMap serviceeCenters={serviceeCenters} ></BangladeshMap>

        </div>
    );
};

export default Coverage;