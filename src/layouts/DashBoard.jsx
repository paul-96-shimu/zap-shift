import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from '../Shared/ProFastLogo';

const DashBoard = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>

        {/* সাবরাউট কম্পোনেন্ট রেন্ডার করার জায়গা */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <ProFastLogo></ProFastLogo>
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <NavLink to='/dashboard/myparcels'> My Parcels</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
