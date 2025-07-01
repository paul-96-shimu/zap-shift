import React from 'react';
import { Outlet } from 'react-router';

const RootLayots = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayots;