
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Zap, Users } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CarListingSection = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        fetch("https://car-rental-server-demo.vercel.app/cars")
            .then((res) => res.json())
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching cars:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="py-24 bg-[#1e293b] text-white text-center font-black italic">LOADING FLEET...</div>;

    return (
        <section 
            className="w-full py-20 px-4 lg:px-10 relative overflow-hidden"
            style={{
                background: 'linear-gradient(105deg, #1e293b 0%, #1e293b 50%, #be123c 90%)',
                filter: 'brightness(1.1) contrast(1.1)'
            }}
        >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#be123c]/20 blur-[120px] rounded-full -z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-white text-4xl lg:text-5xl font-[900] tracking-tight uppercase">
                        Luxury Car <span className="italic">Rental</span>
                    </h2>
                    <div className="w-20 h-1 bg-white mt-4"></div>
                </div>

                {/* Swiper Carousel */}
                <div className="relative group">
                    {/* Custom Navigation Buttons */}
                    <button className="nav-prev absolute -left-2 lg:-left-12 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-[#be123c] p-3 rounded-full text-white transition-all hidden lg:block border border-white/20">
                        <ChevronLeft size={24} />
                    </button>
                    
                    <button className="nav-next absolute -right-2 lg:-right-12 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-[#be123c] p-3 rounded-full text-white transition-all hidden lg:block border border-white/20">
                        <ChevronRight size={24} />
                    </button>

                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        navigation={{ prevEl: '.nav-prev', nextEl: '.nav-next' }}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="car-swiper !pb-16"
                    >
                        {cars.map((car) => (
                            <SwiperSlide key={car._id}>
                                <div 
                                    className="relative bg-white rounded-sm overflow-hidden shadow-2xl transition-all duration-500 group/card"
                                    onMouseEnter={() => setHoveredId(car._id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Car Image Area */}
                                    <div className="relative h-64 overflow-hidden bg-gray-200">
                                        <img 
                                            src={car.images?.main} 
                                            alt={car.carName} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                                        />
                                        
                                        {/* Hover Overlay: */}
                                        <AnimatePresence>
                                            {hoveredId === car._id && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[3px]"
                                                >
                                                    <p className="text-white text-[11px] mb-4 font-medium uppercase tracking-wider">
                                                       Premium {car.year} Model
                                                    </p>
                                                    <Link to={`/cars/${car._id}`} className="w-full">
                                                        <button className="bg-[#be123c] text-white px-6 py-2 font-black uppercase tracking-tighter text-xs hover:bg-white hover:text-black transition-all">
                                                            View Details
                                                        </button>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Static Footer */}
                                    <div className="p-4 bg-white">
                                        <h3 className="text-[#1e293b] text-[15px] font-[800] uppercase tracking-tight mb-3 text-center truncate">
                                            {car.carName} For Rent
                                        </h3>
                                        
                                        <div className="flex items-center justify-center gap-4 py-2 border-t border-gray-100 text-gray-400 text-[10px] font-bold uppercase">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} className="text-[#be123c]" />
                                                <span>{car.year}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Zap size={12} className="text-[#be123c]" />
                                                <span>{car.horsepower_hp}-Cyl</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users size={12} className="text-[#be123c]" />
                                                <span>{car.seats}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link to="/our-fleet" className="inline-block bg-[#be123c] text-white px-10 py-3 font-[900] uppercase italic tracking-widest text-xs hover:bg-white hover:text-[#be123c] transition-all shadow-xl">
                        View All Cars Listings
                    </Link>
                </div>
            </div>

            {/* Pagination Style */}
            <style jsx="true" global="true">{`
                .car-swiper .swiper-pagination-bullet { background: #fff !important; opacity: 0.3; }
                .car-swiper .swiper-pagination-bullet-active { background: #be123c !important; opacity: 1; width: 25px; border-radius: 5px; }
            `}</style>
        </section>
    );
};

export default CarListingSection;