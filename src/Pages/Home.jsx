import React from 'react';
import Banner from './Home/Banner';
import Services from '../ServicesSection/Services';
import ClientLogosMarque from '../ServicesSection/ClientLogosMarque';
import BenefitsSection from '../ServicesSection/BebefitsSection';
import BeMerchant from './BeMerchant';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <ClientLogosMarque></ClientLogosMarque>
           <BenefitsSection></BenefitsSection>
           <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;