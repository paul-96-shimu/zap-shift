import React from 'react';
import { Outlet } from 'react-router';
import authimg from '../assets/authImage.png'
import ProFastLogo from '../Shared/ProFastLogo';

const AuthLayouts = () => {
    return (
       <div className=" bg-base-200  container mx-auto py-12 p-12">
        <ProFastLogo></ProFastLogo>
  <div className="hero-content flex-col lg:flex-row-reverse ">
  <div className='flex-1 s'>
      <img
      src={authimg}
      className="max-w-sm rounded-lg shadow-2xl"
    />
  </div>
    <div  className="flex-1 ">
     <Outlet></Outlet>
    </div>
  </div>
</div>
    );
};

export default AuthLayouts;