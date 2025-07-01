import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Pages/Home/Navber';
import Footer from '../Pages/Footer';

const RootLayots = () => {
    return (
        <div >
            <div className='container mx-auto'>

                 <Navber></Navber>
            <Outlet></Outlet>

            </div>
           
            <Footer></Footer>
        </div>
    );
};

export default RootLayots;