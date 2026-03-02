
import React from 'react';
import { motion } from 'framer-motion';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      text: "Very professional and friendly staff. They delivered the car on time and explained everything clearly. 7Cars Rental Dubai is the best place for car rentals.",
      author: "Marta Nash",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      isWhite: false,
    },
    {
      id: 2,
      text: "I had an amazing car rental experience with 7Cars! The process was smooth and hassle-free. The staff was very friendly and provided excellent customer service. Highly recommend!",
      author: "Abdul Kareem",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      isWhite: true, 
    },
    {
      id: 3,
      text: "Excellent service! I rented a car for a week, and everything went smoothly. The prices are good, and the car was in perfect condition. I will rent again.",
      author: "Doreen Cobb",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
      isWhite: false,
    },
    {
      id: 4,
      text: "Amazing service and comfortable cars. The whole process was quick, and the support team was always available. I had a great trip thanks to 7Cars Rental Dubai.",
      author: "Carol Reynolds",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      isWhite: false,
    }
  ];

  // Infinite loop animation consistency
  const loopReviews = [...reviews, ...reviews];

  return (
    <section className="relative min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      
      {/* --- Background Section --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://as1.ftcdn.net/jpg/08/51/85/72/1000_F_851857293_75NAnmeAW7D4EFHEGRlC9D9ImtOhrwcz.jpg')` }} 
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-[2px]"></div>
      </div>

      {/* --- Header --- */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] md:text-[12px] font-black text-rose-600 uppercase tracking-[0.6em] mb-4 italic"
        >
          Testimonials
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-[1000] text-white uppercase tracking-tighter italic leading-none"
        >
          WHAT OUR <span className="text-rose-600">CLIENTS SAY</span>
        </motion.h2>
        
        <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 md:w-20 h-[2px] bg-gradient-to-r from-transparent to-rose-600"></div>
            <span className="text-white text-5xl font-serif italic opacity-50">“</span>
            <div className="w-12 md:w-20 h-[2px] bg-gradient-to-l from-transparent to-rose-600"></div>
        </div>
      </div>

      {/* --- Infinite Scrolling Cards --- */}
      <div className="relative z-10 w-full mt-4 overflow-hidden">
        <motion.div 
          className="flex gap-6 md:gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 35, 
            repeat: Infinity 
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {loopReviews.map((review, index) => (
            <div key={index} className="flex-shrink-0 w-[300px] md:w-[450px] flex flex-col items-center group">
              
              {/* Review Bubble */}
              <div className={`relative p-8 md:p-12 shadow-2xl mb-10 min-h-[250px] md:min-h-[300px] flex items-center text-center transition-all duration-500 rounded-sm border-b-4 border-rose-600 ${
                review.isWhite 
                ? 'bg-white text-[#1B2532]' 
                : 'bg-white/5 backdrop-blur-md border border-white/10 text-white group-hover:bg-white/10'
              }`}>
                
                <p className="text-[14px] md:text-[16px] leading-relaxed italic font-medium">
                  "{review.text}"
                </p>

                {/* Arrow */}
                <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] ${review.isWhite ? 'border-t-white' : 'border-t-rose-600'}`}></div>
              </div>

              {/* Author Section */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 p-1 rounded-full bg-gradient-to-tr from-rose-600 to-transparent">
                    <img 
                        src={review.image} 
                        alt={review.author} 
                        className="w-full h-full rounded-full object-cover border-2 border-black" 
                    />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-[12px] md:text-[14px]">{review.author}</h4>
                <div className="flex gap-1 mt-1">
                   {[...Array(5)].map((_, i) => (
                     <span key={i} className="text-rose-600 text-[10px]">★</span>
                   ))}
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>

      {/* --- Decorative Elements --- */}
      <div className="relative z-10 flex justify-center gap-3 mt-16">
          {[0, 1, 2].map((i) => (
              <motion.div 
                key={i} 
                animate={{ scale: i === 1 ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${i === 1 ? 'bg-rose-600' : 'bg-white/20'}`}
              ></motion.div>
          ))}
      </div>
      
    </section>
  );
};

export default CustomerReviews;