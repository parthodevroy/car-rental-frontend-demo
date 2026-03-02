import React from 'react';
import HeroSection from './HeroSection';
import CarListingSection from './CarListingSection';
import ServiceFeaturesSection from './ServiceFeaturesSection';
import StatsSection from './StatsSection';
import CarFleet from './CarFleet';
import CustomerReviews from './CustomerReviews';
import ContactForm from './ContactForm';

const Home = () => {
    return (
        <div>
           <HeroSection/>
           <CarListingSection/>
           <ServiceFeaturesSection/>
           <StatsSection/>
           <CarFleet/>
           <CustomerReviews/>
           <ContactForm/>
        </div>
    );
};

export default Home;