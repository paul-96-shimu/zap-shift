import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router'; // ✅ FIXED this import
import CustomHooks from '../../Hooks/CustomHooks';
import UseAxios from '../../Hooks/UseAxios';
import Swal from 'sweetalert2';

const Myparcel = () => {
  const { user } = CustomHooks();
  const axiosSecure = UseAxios();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/parcels/${id}`);
          Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
          queryClient.invalidateQueries(['my-parcels', user.email]);
        } catch (error) {
          console.error('Delete failed', error);
          Swal.fire('Error!', 'Failed to delete parcel.', 'error');
        }
      }
    });
  };

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels ({parcels.length})</h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.weight || 'N/A'} kg</td>
                  <td>৳{parcel.cost || 'N/A'}</td>
                  <td>
                    <span className={`badge ${parcel.payment_status === 'paid' ? 'badge-success' : 'badge-error'}`}>
                      {parcel.payment_status || 'unpaid'}
                    </span>
                  </td>
                  <td>
                    {parcel.senderName}<br />
                    <small>{parcel.senderRegion}</small>
                  </td>
                  <td>
                    {parcel.receiverName}<br />
                    <small>{parcel.receiverRegion}</small>
                  </td>
                  <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/myParcels/view/${parcel._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/payment/${parcel._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Pay
                    </Link>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Myparcel;
