import React from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router';

const StatsSection = () => {
  const stats = [
    { id: 1, label: "YEARS OF EXPERIENCE", value: "5 +" },
    { id: 2, label: "HAPPY CUSTOMERS", value: "5013 +" },
    { id: 3, label: "DAILY BOOKINGS", value: "15 +" },
    { id: 4, label: "CLIENT SATISFACTION", value: "98 %" },
  ];

  return (
    <section className="relative w-full">
      {/* Top Dark Section */}
      <div className="bg-[#1B2532] pt-16 pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Title */}
          <div className="w-full md:w-2/3">
            <h2 className="text-white text-4xl md:text-4xl font-bold leading-tight">
              Get a Worldclass Fleet At Your <br /> Door Step
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center space-x-4 ">
           <Link  to={"/our-fleet"}> <button className="bg-[#E11D48] text-white py-4 px-8 rounded-sm hover:bg-red-700 transition-colors uppercase text-sm tracking-wider">
              GET CAR NOW
            </button></Link>
            
            <div className="flex items-center gap-4 text-white">
              <div className="text-[#E11D48]">
                <Phone size={32} />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-semibold">Call Us For Booking Vehicle</p>
                <p className=" font-bold tracking-wider">+971 48 926 777</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-9 lg:px-20 -mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-10 flex flex-col items-center justify-center shadow-lg relative overflow-hidden h-[180px]"
            >
              {/* Corner Triangle Decoration (as seen in image) */}
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#1B2532] clip-triangle"></div>
              
              <p className="text-[#1B2532] font-bold text-xs md:text-sm tracking-widest mb-4 uppercase text-center">
                {item.label}
              </p>
              <h3 className="text-[#1B2532] text-4xl md:text-5xl font-black">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles for the corner triangle shape */}
      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(0 100%, 0 0, 100% 100%);
        }
      `}</style>
    </section>
  );
};

export default StatsSection;