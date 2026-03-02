import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, LifeBuoy, Clock, ChevronRight, ChevronDown, RotateCcw } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const [currentSlide, setCurrentSlide] = useState(0);

    const faqs = [
        {
            id: 0,
            question: "What documents do I need to rent a car?",
            answer: "You will need a valid driving license, Emirates ID or passport, and a valid credit/debit card for the rental."
        },
        {
            id: 1,
            question: "Do you take a security deposit?",
            answer: "Yes, a refundable security deposit is required. It will be returned after the rental period once all checks are completed."
        },
        {
            id: 2,
            question: "Do you offer 24/7 support?",
            answer: "Yes, our team is available 24/7 to assist you with any inquiries or roadside emergencies."
        },
        {
            id: 3,
            question: "Can I extend my rental?",
            answer: "Absolutely! You can extend your rental by contacting us at least 24 hours before your current contract ends."
        }
    ];

    const testimonials = [
        {
            name: "Ahmed Zaidi",
            car: "Rolls Royce Cullinan",
            text: "Amazing service! 7Cars Rent a Car Dubai made my trip super easy. The car was clean, affordable, and the pickup process was very smooth. Highly recommended!"
        },
        {
            name: "Richard Holming",
            car: "Mercedes G63 E",
            text: "I always rent from 7Cars Rent a Car Dubai. Their team is friendly, the prices are clear, and they offer great support. Truly the best car rental experience in Dubai."
        },
        {
            name: "Sarah Jenkins",
            car: "Lamborghini Urus",
            text: "The best fleet in the city! Booking was seamless and the 24/7 support gave me peace of mind throughout my luxury rental experience."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* --- Hero Section --- */}
            <div className="bg-[#0F172A]  py-35 text-center">
                <h1 className="text-white text-3xl pt-20 font-bold mb-4 uppercase">About</h1>
                <div className="text-gray-400 flex justify-center items-center gap-2 uppercase text-[10px] font-black tracking-[0.3em]">
                    <Link to={"/"}><span>Home</span></Link>
                    <ChevronRight size={12} className="text-red-600" />
                    <span className="text-white">About</span>
                </div>
            </div>

            {/* --- Features Section --- */}
            <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* No Hidden Charges */}
                <FeatureCard 
                    Icon={ShieldCheck} 
                    title="No Hidden Charges" 
                    desc="Enjoy transparent pricing with 7Cars. What you see is what you pay, no surprises, no extra fees." 
                />
                {/* Roadside Assistance (Dark Card) */}
                <FeatureCard 
                    Icon={LifeBuoy} 
                    title="Roadside Assistance" 
                    desc="We've got you covered on every journey. Enjoy fast and reliable roadside support whenever you need it." 
                    dark 
                />
                {/* 24/7 Support */}
                <FeatureCard 
                    Icon={Clock} 
                    title="24/7 Support" 
                    desc="Our team is available around the clock to assist you anytime. Drive with confidence knowing help is always call away." 
                />
            </div>

            {/* --- FAQ & Testimonial Section --- */}
            <div className="max-w-7xl mx-auto px-4 py-24 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Left: Frequent Question (Accordion) */}
                    <div>
                        <h2 className="text-3xl font-black mb-10 uppercase italic">Frequent <span className="text-red-600">Question</span></h2>
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="border-b border-gray-100 pb-4">
                                    <button 
                                        onClick={() => setOpenFaq(openFaq === faq.id ? -1 : faq.id)}
                                        className="w-full flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-left transition-colors hover:text-red-600"
                                    >
                                        {openFaq === faq.id ? (
                                            <ChevronRight size={18} className="text-red-600" />
                                        ) : (
                                            <RotateCcw size={16} className="text-gray-400" />
                                        )}
                                        {faq.question}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-gray-500 text-sm pl-8 pt-4 leading-relaxed font-medium">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: What Customers Say (Slider) */}
                    <div>
                        <h2 className="text-3xl font-black mb-10 uppercase italic">What <span className="text-red-600">Customers</span> Say</h2>
                        <div className="bg-[#F8FAFC] p-12 rounded-sm relative min-h-[300px] flex flex-col justify-center">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="italic text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                                        "{testimonials[currentSlide].text}"
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-black text-gray-900 uppercase tracking-[0.2em] text-xs">
                                            {testimonials[currentSlide].name}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">
                                            {testimonials[currentSlide].car}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination Dots */}
                            <div className="flex gap-2 mt-10">
                                {testimonials.map((_, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-red-600 w-4' : 'bg-gray-300'}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ Icon, title, desc, dark }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className={`p-10 text-center relative shadow-sm border ${dark ? 'bg-[#1E293B] border-transparent text-white shadow-2xl' : 'bg-white border-gray-100 text-gray-900'}`}
    >
        <div className="flex justify-center mb-8">
            <Icon size={54} strokeWidth={0.75} className={dark ? 'text-white' : 'text-gray-400'} />
        </div>
        <h3 className="text-xl font-black uppercase italic mb-4">{title}</h3>
        <p className={`text-sm leading-relaxed font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            {desc}
        </p>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-[3px] border-b-[3px] border-red-600"></div>
    </motion.div>
);

export default About;