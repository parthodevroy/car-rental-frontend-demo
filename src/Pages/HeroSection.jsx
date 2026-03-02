
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState('All Brands');

    const slides = [
        {
            make: "NISSAN",
            model: "PATROL",
            year: "2026",
            carImage: "https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2024%2F09%2F2025-Nissan-Patrol-front-three-qaurter.jpg&w=1200&q=75",
        },
        {
            make: "MERCEDES",
            model: "AMG G 35",
            year: "2026",
            carImage: "https://prestigeecr.com/image/original/product/product/2025/12/10/193308740/main_image/nissan-patrol-front.webp",
        },
        {
            make: "NISSAN",
            model: "PATROL",
            year: "2026",
            carImage: "https://i.ibb.co/b580Qzyn/Gemini-Generated-Image-9bgj89bgj89bgj89.png",
            //   carImage: "https://cdn.prod.website-files.com/67ab425033e66749b698e572/689b3796dbf9b3205591596c_2.jpg",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 7000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleSearch = () => {
        if (selectedBrand === 'All Brands') navigate('/our-fleet');
        else navigate(`/our-fleet?brand=${selectedBrand.toLowerCase()}`);
    };

    return (
        <section className="relative w-full overflow-hidden font-sans bg-white">

            {/* --- 1. Hero Slider Section --- */}
            <div className="relative h-[500px] md:h-[650px] lg:h-[800px] w-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 5 }}
                            src={slides[currentSlide].carImage}
                            className="w-full h-full object-cover object-center brightness-75"
                            alt="Premium Car"
                        />
                        {/* Dark Overlays for Text Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    </motion.div>
                </AnimatePresence>

                {/* --- CINEMATIC TEXT CONTENT (Centered & Premium) --- */}
                <div className="relative z-20 h-full w-full flex flex-col justify-center items-center text-center px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            {/* Top Tagline */}
                            <motion.span
                                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                                animate={{ letterSpacing: "0.5em", opacity: 1 }}
                                transition={{ delay: 0.2, duration: 1 }}
                                className="text-rose-600 text-xs md:text-sm font-black uppercase mb-6 block italic tracking-[0.5em] drop-shadow-md"
                            >
                                Experience The Ultimate Legend
                            </motion.span>

                            {/* Brand Name */}
                            <h2 className="text-white/80 text-3xl md:text-5xl font-black italic tracking-tighter leading-none uppercase">
                                {slides[currentSlide].make}
                            </h2>

                            {/* Car Model (Bold & Massive) */}
                            <h1
                                className="text-white text-7xl md:text-[130px] lg:text-[170px] font-[1000] italic leading-none tracking-tighter uppercase my-2 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                style={{
                                    textShadow: "4px 4px 0px rgba(225,29,72,0.5)",
                                }}
                            >
                                {slides[currentSlide].model}
                            </h1>

                            {/* Year with Decorative Lines */}
                            <div className="flex items-center gap-6 mt-2 mb-10">
                                <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent to-rose-600"></div>
                                <p className="text-white text-2xl md:text-4xl font-[1000] italic tracking-widest uppercase">
                                    {slides[currentSlide].year}
                                </p>
                                <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent to-rose-600"></div>
                            </div>

                            {/* Premium CTA Button */}
                            {/* Premium CTA Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-50 mt-8" 
                            >
                                <Link
                                    to="/our-fleet"
                                    className="inline-block" 
                                >
                                    <button
                                        type="button" 
                                        className="cursor-pointer bg-rose-600 text-white px-10 py-4 font-black text-sm md:text-lg italic uppercase rounded-sm hover:bg-white hover:text-black transition-all duration-300 shadow-xl relative z-50"
                                    >
                                        Discover Fleet
                                    </button>
                                </Link>
                                {/* Button Glow Effect */}
                                <div className="absolute -inset-1 bg-rose-600 rounded-sm blur opacity-20 group-hover:opacity-50 transition duration-300 -z-10"></div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Slider Controls */}
                <div className="absolute bottom-20 right-6 lg:right-12 flex gap-4 z-30">
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-rose-600 transition-all backdrop-blur-md bg-black/20"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-rose-600 transition-all backdrop-blur-md bg-black/20"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>

            {/* --- 2. Search Bar Section --- */}
            <div className="relative -mt-12 md:-mt-16 z-40 px-4">
                <div className="max-w-6xl mx-auto bg-white shadow-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-4 lg:gap-6 items-end rounded-sm">
                    <div className="w-full md:flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block ml-1">Pick Up Date</label>
                        <div className="relative">
                            <input type="date" className="w-full bg-gray-50 p-4 pl-12 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-rose-600 transition-all rounded-sm" />
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="w-full md:flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block ml-1">Car Brand</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full bg-gray-50 p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-rose-600 transition-all rounded-sm cursor-pointer"
                        >
                            <option>All Brands</option>
                            <option>Toyota</option>
                            <option>Nissan</option>
                            <option>Mercedes</option>
                            <option>BMW</option>
                        </select>
                    </div>

                    <button onClick={handleSearch} className="w-full md:w-auto bg-[#1B2532] text-white px-12 py-4 font-black uppercase italic tracking-widest hover:bg-rose-600 transition-all duration-300 rounded-sm">
                        Search
                    </button>
                </div>
            </div>

            {/* --- 3. Welcome Section --- */}
            <section className="bg-white py-24 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <h4 className="text-rose-600 text-[11px] font-black uppercase tracking-[0.3em] italic">Find your next luxury ride</h4>
                        <h2 className="text-4xl md:text-5xl font-[1000] text-[#1B2532] leading-[1.1] uppercase italic tracking-tighter">
                            Welcome to <br />
                            <span className="text-rose-600">Yemenyi Rent A Car</span>
                        </h2>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">
                            Experience the road like never before. From <span className="text-[#1B2532] font-bold">Exotic SUVs</span> to <span className="text-[#1B2532] font-bold">High-Speed Sports Cars</span>, we offer the best rates in the city.
                        </p>

                        {/* Feature Icons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                            {[
                                { t: "Fast Booking", i: "https://i.ibb.co/zCwWh4b/c1-removebg-preview.png" },
                                { t: "Best Prices", i: "https://i.ibb.co/398rqbCM/c2-removebg-preview.png" },
                                { t: "24/7 Support", i: "https://i.ibb.co/h1gPK0wc/c3-removebg-preview.png" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center lg:items-start group">
                                    <div className="w-20 h-16 mb-3">
                                        <img src={item.i} alt={item.t} className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-[12px] font-[1000] uppercase text-[#1B2532] tracking-wider italic">
                                        {item.t}
                                    </p>
                                    <div className="w-6 h-1 bg-rose-600 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Welcome Image */}
                    <div className="flex-1 relative w-full">
                        <img
                            src="https://i.ibb.co/Y7wbSctF/erik-mclean-z-L3-Y4-Iej-QR0-unsplash-removebg-preview.png"
                            className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                            alt="Luxury Car"
                        />
                    </div>
                </div>
            </section>

            {/* WhatsApp Floating Button */}
            <div className="fixed bottom-6 right-6 z-[9999]">
                <a href="https://wa.me/13014552730" target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#25D366] w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="h-7 w-7 invert" alt="WA" />
                </a>
            </div>

        </section>
    );
};

export default HeroSection;