import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router';

const Root = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); 

    return (
        <div className="flex flex-col min-h-screen">
           <Navbar/>
           <main className="flex-grow">
               <Outlet/>
           </main>
           <Footer/>
        </div>
    );
};

export default Root;