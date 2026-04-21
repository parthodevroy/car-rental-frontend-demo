
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [selectedModel, setSelectedModel] = useState('All Models');
    const [pickupDate, setPickupDate] = useState('');

    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const slides = [
         {
            tag: 'LUXURY CAR RENTAL',
            make: 'AUDI',
            model: 'Audi RS Q8',
            carImage: 'https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2025%2F04%2FAudi-RS-Q8-Performance.jpg&w=1200&q=75',
            bgColor: 'from-rose-900 via-rose-700 to-purple-900',
        },

        {
            tag: 'LUXURY CAR RENTAL',
            make: 'NISSAN',
            model: 'PATROL 2026',
            carImage: 'https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2024%2F09%2F2025-Nissan-Patrol-front-three-qaurter.jpg&w=1200&q=75',
            bgColor: 'from-slate-900 via-blue-900 to-indigo-900',
        },
       
        {
            tag: 'LUXURY CAR RENTAL',
            make: 'BENTLEY',
            model: 'AZURE',
            carImage: 'https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2025%2F06%2FNissan-Patrol-NISMO-feature.jpg&w=1200&q=75',
            bgColor: 'from-emerald-900 via-teal-800 to-slate-900',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);


    const goTo = (idx) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent(idx);
            setAnimating(false);
        }, 400);
    };

    const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1);
    const next = () => goTo(current === slides.length - 1 ? 0 : current + 1);


    const handleSearch = () => {
        if (selectedBrand === 'All Brands') navigate('/our-fleet');
        else navigate(`/our-fleet?brand=${selectedBrand.toLowerCase()}`);
    };

    const slide = slides[currentSlide];

    return (
        <section className="relative w-full overflow-hidden font-sans bg-white">
            {/* ─────────────────────────────────────────
                1. HERO SLIDER
            ───────────────────────────────────────── */}
            <div className="relative w-full h-[420px] sm:h-[500px]  md:h-[650px] object-cover overflow-hidden bg-black">

                {/* Gradient */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} transition-all duration-500`}
                    style={{
                        clipPath: 'polygon(0 0, 65% 0, 35% 100%, 0 100%)'
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0  bg-black/30 md:bg-transparent" />

                {/* IMAGE */}
                <div className="absolute inset-0  flex items-end md:items-center justify-end w-full ">
                    <img
                        src={slide.carImage}
                        alt={slide.model}
                        className="
        w-[90%] h-[100%]
        sm:w-[80%] sm:h-[100%]
        md:w-[65%] md:h-[85%]
        lg:w-[50%] lg:h-[100%]
      "
                        style={{
                            maskImage: 'linear-gradient(to left, black 65%, transparent 100%)'
                        }}
                    />
                </div>

                {/* TEXT */}
                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 z-10">

                    <p className="text-white/70 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-2">
                        {slide.tag}
                    </p>

                    <h1 className="text-white font-black uppercase leading-none">
                        <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                            {slide.make}
                        </span>
                        <span className="block text-lg sm:text-xl md:text-3xl lg:text-5xl text-white drop-shadow-xl">
                            {slide.model}
                        </span>
                    </h1>

                    <div className="mt-4 md:mt-8">
<NavLink to={"/our-fleet"}>                 
       <button className="bg-rose-600 hover:bg-white hover:text-black text-white font-bold uppercase text-xs md:text-sm px-6 md:px-10 py-3 md:py-4 transition-all duration-300">
                            Book Now
                        </button></NavLink>
                    </div>

                </div>

                {/* DOTS */}
                <div className="absolute bottom-4 left-4 md:left-16 flex items-center gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${i === current
                                    ? 'w-6 h-2 bg-rose-500'
                                    : 'w-2 h-2 bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                {/* ARROWS */}
                <div className="absolute bottom-3 right-3 md:right-12 flex gap-2 z-20">
                    <button
                        onClick={prev}
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 text-white flex items-center justify-center"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={next}
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 text-white flex items-center justify-center"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

            </div>

            {/* ─────────────────────────────────────────
                2. SEARCH BAR — overlaps slider bottom
            ───────────────────────────────────────── */}
            <div className="relative -mt-14 md:-mt-16 z-40 px-4">
                <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">

                        {/* When */}
                        <div className="flex-1 px-6 py-5">
                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                <span className="text-rose-500 mr-1">01</span> When
                            </p>
                            <div className="relative">
                                <Calendar size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    className="w-full pl-6 text-sm font-semibold text-gray-700 bg-transparent border-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Select Make */}
                        <div className="flex-1 px-6 py-5">
                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                <span className="text-rose-500 mr-1">02</span> Select Make
                            </p>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="w-full text-sm font-semibold text-gray-700 bg-transparent border-none outline-none cursor-pointer"
                            >
                                <option>All Brands</option>
                                <option>Toyota</option>
                                <option>Nissan</option>
                                <option>Mercedes</option>
                                <option>BMW</option>
                            </select>
                        </div>

                        {/* Select Model */}
                        <div className="flex-1 px-6 py-5">
                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                <span className="text-rose-500 mr-1">03</span> Select a Model
                            </p>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="w-full text-sm font-semibold text-gray-700 bg-transparent border-none outline-none cursor-pointer"
                            >
                                <option>All Models</option>
                                <option>AMG G63</option>
                                <option>Patrol</option>
                                <option>Azure</option>
                                <option>X5</option>
                            </select>
                        </div>

                        {/* Search */}
                        <button
                            onClick={handleSearch}
                            className="bg-rose-600 text-white font-black uppercase italic tracking-widest text-sm px-12 py-6 hover:bg-[#1B2532] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Search size={16} />
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* ─────────────────────────────────────────
                3. WELCOME SECTION
            ───────────────────────────────────────── */}
            <section className="bg-white py-24 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                    {/* Left text */}
                    <div className="flex-1 space-y-6">
                        <h4 className="text-rose-600 text-[11px] font-black uppercase tracking-[0.3em] italic">
                            Find your next luxury ride
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-[900] text-[#1B2532] leading-[1.1] uppercase italic tracking-tighter">
                            Welcome to <br />
                            <span className="text-rose-600">Yemenyi Rent A Car</span>
                        </h2>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">
                            Experience the road like never before. From{' '}
                            <span className="text-[#1B2532] font-bold">Exotic SUVs</span> to{' '}
                            <span className="text-[#1B2532] font-bold">High-Speed Sports Cars</span>,
                            we offer the best rates in the city.
                        </p>

                        {/* Feature icons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                            {[
                                { t: 'Fast Booking', i: 'https://i.ibb.co/zCwWh4b/c1-removebg-preview.png' },
                                { t: 'Best Prices', i: 'https://i.ibb.co/398rqbCM/c2-removebg-preview.png' },
                                { t: '24/7 Support', i: 'https://i.ibb.co/h1gPK0wc/c3-removebg-preview.png' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center lg:items-start group cursor-pointer">
                                    <div className="w-20 h-16 mb-3">
                                        <img src={item.i} alt={item.t} className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-[12px] font-black uppercase text-[#1B2532] tracking-wider italic">
                                        {item.t}
                                    </p>
                                    <div className="w-6 h-1 bg-rose-600 mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right car image */}
                    <div className="flex-1 relative w-full">
                        {/* Soft glow circle behind car */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-rose-50 blur-3xl opacity-70 -z-0" />
                        <img
                            src="https://i.ibb.co/Y7wbSctF/erik-mclean-z-L3-Y4-Iej-QR0-unsplash-removebg-preview.png"
                            className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                            alt="Luxury Car"
                        />
                    </div>

                </div>
            </section>

        </section>
    );
};

export default HeroSection;
