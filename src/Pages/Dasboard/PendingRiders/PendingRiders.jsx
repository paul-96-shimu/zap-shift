import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UseAxios from '../../../Hooks/UseAxios';

const PendingRiders = () => {
  const axiosSecure = UseAxios();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // ✅ Fetch pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['pendingRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    },
  });

  // ✅ Approve mutation (update status and role)
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/riders/${id}/approve`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('✅ Rider approved and role updated');
      queryClient.invalidateQueries(['pendingRiders']);
      setSelectedRider(null);
    },
    onError: () => {
      toast.error('❌ Failed to approve rider');
    }
  });

  // ❌ Reject mutation
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/riders/${id}`),
    onSuccess: () => {
      toast.warn('🚫 Rider rejected and removed');
      queryClient.invalidateQueries(['pendingRiders']);
      setSelectedRider(null);
    },
    onError: () => {
      toast.error('❌ Failed to reject rider');
    }
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">🚧 Pending Riders</h2>

      {riders.length === 0 ? (
        <p className="text-center text-gray-500">No pending riders</p>
      ) : (
        <table className="table w-full bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔍 Rider Modal */}
      {selectedRider && (
        <dialog id="rider_modal" className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-2">Rider Application Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
              <p><strong>Bike Reg No:</strong> {selectedRider.bikeReg}</p>
              <p><strong>Status:</strong> {selectedRider.status}</p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => approveMutation.mutate(selectedRider._id)}
                className="btn btn-success btn-sm"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => rejectMutation.mutate(selectedRider._id)}
                className="btn btn-error btn-sm"
              >
                ❌ Reject
              </button>
              <button
                onClick={() => setSelectedRider(null)}
                className="btn btn-outline btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
