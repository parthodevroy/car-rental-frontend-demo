import React, { useState } from 'react';
import { Smartphone, Rocket, Calendar, MapPin, Users, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceFeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(1);

  const services = [
    { id: 1, title: "Mobile App", icon: <Smartphone size={40} />, desc: "Enjoy a smooth and easy car rental experience with the 7Cars Rent a Car Dubai mobile app. Book your car, manage your rental, track your bookings, and get instant support all from your phone." },
    { id: 2, title: "Fuel Plans", icon: <Rocket size={40} />, desc: "Flexible fuel plans tailored to your journey. Choose from pre-paid fuel options or return-as-is policies to save time and money during your rental period." },
    { id: 3, title: "Long Car Rental", icon: <Calendar size={40} />, desc: "Need a car for a month or more? Our long-term rental plans offer the best rates for extended stays, business trips, or temporary vehicle needs." },
    { id: 4, title: "One-Way Car Rental", icon: <MapPin size={40} />, desc: "Pick up your car in one location and drop it off at another. Ideal for road trips and cross-city travel across the UAE with maximum flexibility." },
    { id: 5, title: "Meetings and Groups", icon: <Users size={40} />, desc: "Professional transportation solutions for corporate meetings, events, or large family gatherings. We provide luxury vans and SUVs for group comfort." },
    { id: 6, title: "Student Car Rental", icon: <GraduationCap size={40} />, desc: "Special rental packages and discounts designed for students. Get reliable transportation for university or weekend trips at budget-friendly prices." },
  ];

  const activeService = services.find(s => s.id === activeTab);

  return (
    <section className="py-20 px-4 md:px-10 bg-[#F3F5F7]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* --- Left Side - 6 Grid Items --- */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 shadow-2xl rounded-sm overflow-hidden border border-gray-100">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`relative cursor-pointer h-[180px] md:h-[220px] flex flex-col items-center justify-center transition-all duration-300 border-[0.5px] border-gray-100 group ${
                activeTab === service.id ? 'bg-[#E11D48] text-white' : 'bg-white text-[#1B2532] hover:bg-gray-50'
              }`}
            >
              <span className={`absolute top-4 left-6 font-black text-lg ${
                activeTab === service.id ? 'text-white/40' : 'text-gray-300'
              }`}>
                0{service.id}
              </span>
              
              <div className={`mb-4 transition-transform duration-300 ${activeTab === service.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {service.icon}
              </div>
              
              <h3 className="font-bold text-[15px] md:text-[17px] text-center px-4 uppercase tracking-tight">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* --- Right Side - Animated Content --- */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Header Animation */}
          <div className="mb-6 overflow-hidden">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-1">
                HELPS YOU TO FIND YOUR NEXT CAR EASILY
             </p>
             <h2 className="text-4xl lg:text-5xl font-black italic text-[#1B2532] uppercase">
                {activeService.title.split(' ')[0]} <span className="text-[#E11D48]">{activeService.title.split(' ').slice(1).join(' ')}</span>
             </h2>
          </div>

          {/* Image Animation Section */}
          <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden mb-8 shadow-xl bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab} 
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt={activeService.title}
                initial={{ opacity: 0, x: 20, scale: 1.05 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Text Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#4b5563] leading-relaxed text-[16px] italic font-medium">
                {activeService.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ServiceFeaturesSection;