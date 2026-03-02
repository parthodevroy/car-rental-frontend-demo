
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Gauge, Users, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarFleet = () => {
    const [cars, setCars] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/cars")
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

    const showMore = () => setVisibleCount(prev => prev + 9);

    if (loading) return <div className="py-20 text-center font-black italic text-[#1B2532]">LOADING ALL FLEET...</div>;

    return (
        <section className="py-20 bg-white font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h4 className="text-[12px] font-bold text-[#E11D48] uppercase tracking-[0.4em] mb-2 italic">
                        Explore our complete collection
                    </h4>
                    <h2 className="text-4xl lg:text-5xl font-black text-[#1B2532] uppercase tracking-tighter">
                        Our Entire Fleet
                    </h2>
                </div>

                {/* Car Grid - 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {cars.slice(0, visibleCount).map((car, index) => (
                            <motion.div
                                key={car._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index % 9) * 0.05 }}
                            >
                                <Link 
                                    to={`/cars/${car._id}`}
                                    className="group relative bg-[#1B2532] overflow-hidden cursor-pointer block h-full shadow-xl"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-[280px] overflow-hidden">
                                        <img 
                                            src={car.images?.main} 
                                            alt={car.carName}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 text-center transition-colors duration-300 bg-[#1B2532] group-hover:bg-[#E11D48]">
                                        <h3 className="text-2xl font-black text-white mb-6 tracking-tight uppercase italic">
                                            {car.carName}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between text-white/70 text-[11px] font-bold uppercase tracking-wider border-t border-white/10 pt-6">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={13} className="text-white/50" />
                                                {car.year}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Gauge size={13} className="text-white/50" />
                                                {car.horsepower_hp}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users size={13} className="text-white/50" />
                                                {car.seats}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Palette size={13} className="text-white/50" />
                                                <span className="capitalize">{car.color}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Button */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#1B2532]/40 backdrop-blur-[2px]">
                                        <span className="bg-white text-[#1B2532] px-8 py-3 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all">
                                            View Details
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More Button */}
                {visibleCount < cars.length && (
                    <div className="mt-16 text-center">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={showMore}
                            className="bg-[#E11D48] text-white px-12 py-4 font-black uppercase text-[12px] tracking-[0.3em] shadow-[0_15px_30px_rgba(225,29,72,0.3)] hover:bg-[#1B2532] transition-all"
                        >
                            Show More Cars
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CarFleet;