import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CustomHooks from '../../../Hooks/CustomHooks';
import UseAxiosAuth from '../../../Hooks/UseAxiosAuth'; // axios instance with auth
import { useLoaderData } from 'react-router';

const BeARider = () => {
  const { user } = CustomHooks(); // কাস্টম হুক থেকে user
  const axiosSecure = UseAxiosAuth(); // কাস্টম axios instance

  const serviceCenters = useLoaderData(); // district/region data
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  // ইউনিক রিজিয়নগুলো বের করা
  const uniqueRegions = [...new Set(serviceCenters.map(center => center.region))];

  // সিলেক্টেড রিজিয়ন অনুযায়ী জেলা ফিল্টার
  useEffect(() => {
    if (selectedRegion) {
      const filtered = serviceCenters
        .filter(center => center.region === selectedRegion)
        .map(center => center.district);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedRegion, serviceCenters]);

  // ফর্ম সাবমিশন হ্যান্ডলার
  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || '',
      email: user?.email || '',
      status: 'pending',
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/riders', riderData);
      if (res.data.insertedId) {
        alert('✅ Rider application submitted successfully!');
        reset();
      }
    } catch (error) {
      console.error('❌ Rider submission failed:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">🏍️ Apply to Be a Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full text-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ''}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            {...register('age', { required: true })}
            placeholder="Your age"
            className="input input-bordered w-full"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block font-medium">Region</label>
          <select
            {...register('region', { required: true })}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select a region</option>
            {uniqueRegions.map((region, idx) => (
              <option key={idx} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block font-medium">District</label>
          <select
            {...register('district', { required: true })}
            className="select select-bordered w-full"
            disabled={!selectedRegion}
          >
            <option value="">Select a district</option>
            {filteredDistricts.map((district, idx) => (
              <option key={idx} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            {...register('phone', { required: true })}
            placeholder="01XXXXXXXXX"
            className="input input-bordered w-full"
          />
        </div>

        {/* NID Number */}
        <div>
          <label className="block font-medium">National ID Number</label>
          <input
            type="text"
            {...register('nid', { required: true })}
            placeholder="Your NID number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block font-medium">Bike Brand</label>
          <input
            type="text"
            {...register('bikeBrand', { required: true })}
            placeholder="e.g. Honda, Yamaha"
            className="input input-bordered w-full"
          />
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="block font-medium">Bike Registration Number</label>
          <input
            type="text"
            {...register('bikeReg', { required: true })}
            placeholder="e.g. DHA-1234"
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full mt-4">Submit Application</button>
      </form>
    </div>
  );
};

export default BeARider;
