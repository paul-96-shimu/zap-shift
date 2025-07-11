import React from 'react';
import { Navigate, useLocation } from 'react-router'; // ✅ useLocation import
import CustomHooks from '../Hooks/CustomHooks';
import useUserRole from '../Hooks/useUserRole';

const AdminRouter = ({ children }) => {
  const { user, loading } = CustomHooks();
  const { role, roleLoading } = useUserRole();
  const location = useLocation(); // ✅ এই লাইন যোগ করো

  if (loading || roleLoading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRouter;
