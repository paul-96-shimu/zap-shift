import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import CustomHooks from '../../Hooks/CustomHooks';
import UseAxios from '../../Hooks/UseAxios';

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
    enabled: !!user?.email, // only run if user email exists
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this parcel?');
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/parcels/${id}`);
      alert('Parcel deleted successfully');
      queryClient.invalidateQueries(['my-parcels', user.email]); // refetch parcels
    } catch (error) {
      console.error('Delete failed', error);
      alert('Failed to delete parcel');
    }
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
                <th>Sender</th>
                <th>Receiver</th>
                <th>Date</th>
                <th>Actions</th> {/* Actions column */}
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.weight || 'N/A'} kg</td>
                  <td>
                    {parcel.senderName}<br />
                    <small>{parcel.senderRegion}</small>
                  </td>
                  <td>
                    {parcel.receiverName}<br />
                    <small>{parcel.receiverRegion}</small>
                  </td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    {/* View button - route to /dashboard/myParcels/view/:id */}
                    <Link
                      to={`/dashboard/myParcels/view/${parcel._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>

                    {/* Edit button - route to /dashboard/myParcels/edit/:id */}
                    <Link
                      to={`/dashboard/myParcels/edit/${parcel._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      pay
                    </Link>

                    {/* Delete button */}
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
