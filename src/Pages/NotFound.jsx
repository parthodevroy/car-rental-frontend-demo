import React from "react";
import { Link } from "react-router";
import { MoveLeft, Car } from "lucide-react";

const notFound = () => {
  return (
    <div className="min-h-screen bg-[#1B2532] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <h1 className="text-[20vw] font-[1000] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 italic uppercase">
          Lost
        </h1>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Car Icon/Logo Area */}
        <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-[#E11D48] rounded-full flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(225,29,72,0.5)]">
                <Car size={48} className="text-white" />
            </div>
        </div>

        <h2 className="text-[#E11D48] text-8xl md:text-9xl font-[1000] italic tracking-tighter mb-4">
          404
        </h2>
        
        <h3 className="text-white text-2xl md:text-4xl font-black uppercase italic tracking-widest mb-6">
          Engine Not Found!
        </h3>
        
        <p className="text-gray-400 font-medium mb-10 leading-relaxed max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed. Let's get you back on the right track.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-[#E11D48] text-white px-10 py-4 font-black uppercase italic tracking-widest text-xs hover:bg-white hover:text-[#1B2532] transition-all duration-500 shadow-2xl group"
        >
          <MoveLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
          Back To Showroom
        </Link>
      </div>

      {/* Luxury Finish Bottom Line */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="w-1 bg-[#E11D48] h-20 opacity-50"></div>
      </div>
    </div>
  );
};

export default notFound;