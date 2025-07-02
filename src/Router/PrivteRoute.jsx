import React, { Children } from 'react';
import CustomHooks from '../Hooks/CustomHooks';

const PrivteRoute = () => {
    const { user, loading } = CustomHooks()
    if(loading){
        return <span className="loading loading-ring loading-xl"></span>
    }


    if(!user){
        <Navigate to='/login'></Navigate>
    }
    return Children
};

export default PrivteRoute;