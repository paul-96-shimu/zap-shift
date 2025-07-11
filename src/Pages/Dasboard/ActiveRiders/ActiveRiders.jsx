import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UseAxios from '../../../Hooks/UseAxios';

const ActiveRiders = () => {
  const axiosSecure = UseAxios();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Load active riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    }
  });

  // ❌ Deactivate rider
  const deactivateMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/riders/${id}`, { status: 'deactivated' });
      return res.data;
    },
    onSuccess: () => {
      toast.success('✅ Rider deactivated');
      queryClient.invalidateQueries(['activeRiders']);
    },
    onError: () => {
      toast.error('❌ Failed to deactivate rider');
    }
  });

  // 🔍 Filtered search
  const filteredRiders = riders.filter(rider =>
    rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="text-center">Loading active riders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-600">✅ Active Riders</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by rider name..."
        className="input input-bordered w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map(rider => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    disabled={rider.status === 'deactivated'}
                    onClick={() => deactivateMutation.mutate(rider._id)}
                  >
                    {rider.status === 'deactivated' ? 'Deactivated' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRiders.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No active riders found.</p>
        )}
      </div>
    </div>
  );
};

export default ActiveRiders;
