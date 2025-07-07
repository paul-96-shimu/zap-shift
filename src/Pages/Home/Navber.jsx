import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; // react-router-dom ব্যবহার করো (react-router না)
import ProFastLogo from '../../Shared/ProFastLogo';
import { AuthContext } from '../../Context/AuthContext/AuthContext';


const Navber = () => {
  const { user,  logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/login'); // লগআউটের পর login পেজে নিয়ে যাবে
      })
      .catch(err => console.error(err));
  };

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/sendparcel">Send a Parcel</NavLink></li>
      <li><NavLink to="/coverage">Coverage</NavLink></li>
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
      <li><NavLink to="/about">About Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <ProFastLogo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end space-x-4">
        {user ? (
          <>
            <span className="mr-2">Hi, {user.email}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-outline">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
