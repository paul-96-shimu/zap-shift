import React, { Children } from 'react';
import CustomHooks from '../Hooks/CustomHooks';
import { Navigate, useLocation } from 'react-router';

const PrivteRoute = ({children}) => {
    const { user, loading } = CustomHooks()
      const location = useLocation();
    if(loading){
        return <span className="loading loading-ring loading-xl"></span>
    }

 if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children
};

export default PrivteRoute;