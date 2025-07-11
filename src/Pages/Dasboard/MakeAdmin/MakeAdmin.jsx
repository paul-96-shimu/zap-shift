
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import UseAxios from '../../../Hooks/UseAxios';

const MakeAdmin = () => {
  const axiosSecure = UseAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  // 🔍 Handle Search
  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const res = await axiosSecure.get(`/users/search?email=${searchTerm}`);
      setFoundUsers(res.data);
    } catch (err) {
      setFoundUsers([]);
      toast.error('User not found!', err);
    }
  };

  // ✅ Make Admin Mutation
  const makeAdmin = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/${userId}/make-admin`),
    onSuccess: () => {
      toast.success('✅ User is now an admin');
      handleSearch(); // Refresh user list
    },
    onError: () => {
      toast.error('❌ Failed to make admin');
    },
  });

  // ❌ Remove Admin Mutation
  const removeAdmin = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/${userId}/remove-admin`),
    onSuccess: () => {
      toast.warn('⚠️ Admin removed');
      handleSearch();
    },
    onError: () => {
      toast.error('❌ Failed to remove admin');
    },
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🔎 Search & Manage Users</h2>

      {/* 🔍 Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter email or part of email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* 📋 Found Users */}
      {foundUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foundUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    {user.role === 'admin' ? (
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => removeAdmin.mutate(user._id)}
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => makeAdmin.mutate(user._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default MakeAdmin;
