import React from 'react';
import Marquee from "react-fast-marquee";

// Example logos – replace with your actual logo paths
import logo1 from '../assets/amazon.png';
import logo2 from '../assets/amazon_vector.png';
import logo3 from '../assets/casio.png';
import logo4 from '../assets/start-people 1.png';
import logo5 from '../assets/start.png';
import logo6 from '../assets/moonstar.png';
import logo7 from '../assets/randstad.png';

const ClientLogosMarque = () => {
    return (
        <section className="py-10 bg-base-200">
            <h2 className="text-3xl font-bold text-center mb-6">Trusted by Our Clients</h2>
            <Marquee
                speed={50}
                gradient={false}
                pauseOnHover={true}
            >
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo1} alt="Client logo 1" className="object-contain h-full" />
                </div>
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo2} alt="Client logo 2" className="object-contain h-full" />
                </div>
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo3} alt="Client logo 3" className="object-contain h-full" />
                </div>
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo4} alt="Client logo 4" className="object-contain h-full" />
                </div>
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo5} alt="Client logo 5" className="object-contain h-full" />
                </div>
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo6} alt="Client logo 6" className="object-contain h-full" />
                </div>
                <div className="mx-8 w-36 h-16 flex items-center justify-center">
                    <img src={logo7} alt="Client logo 7" className="object-contain h-full" />
                </div>
            </Marquee>
        </section>
    );
};

export default ClientLogosMarque;
