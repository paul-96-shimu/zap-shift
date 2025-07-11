import React from 'react';
import { NavLink, Outlet } from 'react-router'; // ✅ Corrected import
import ProFastLogo from '../Shared/ProFastLogo';
import useUserRole from '../Hooks/useUserRole';

const DashBoard = () => {



  const { role, roleLoading } = useUserRole()
  console.log(role)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        {/* Drawer toggle for mobile */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden mb-4">
          ☰ Open Menu
        </label>

        {/* Page Content */}
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-1">
          {/* Logo */}
          <ProFastLogo />

          {/* Navigation Links */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : ''}
            >
              🏠 Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myparcels"
              className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : ''}
            >
              📦 My Parcels
            </NavLink>
          </li>

          { !roleLoading && role === 'admin' &&
            <>


              <li>
                <NavLink
                  to="/dashboard/active-riders"
                  className={({ isActive }) => isActive ? 'font-semibold text-green-600' : ''}
                >
                  🚴 Active Riders


                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pending-riders"
                  className={({ isActive }) => isActive ? 'font-semibold text-orange-500' : ''}
                >
                  🕓 Pending Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className={({ isActive }) => isActive ? 'font-semibold text-purple-600' : ''}
                >
                  🛡️ Make Admin
                </NavLink>
              </li>

            </>

          }
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
