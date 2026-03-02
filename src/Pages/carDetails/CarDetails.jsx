
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, MessageCircle, ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [activeImg, setActiveImg] = useState("");
    const [countries, setCountries] = useState([]);
    const [selectedCode, setSelectedCode] = useState("+971 (UAE)");
// infromation
    const buyerPhone = "+8801925033400";
    const buyerWhatsApp = "01925033400";

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,idd")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(sorted);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/cars/${id}`)
            .then(res => res.json())
            .then(data => {
                setCar(data);
                setActiveImg(data.images?.main);
            });
        window.scrollTo(0, 0);
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            fullName: `${e.target.firstName.value} ${e.target.lastName.value}`,
            email: e.target.email.value,
            phone: `${selectedCode} ${e.target.mobile.value}`,
            pickupDate: e.target.date.value,
            carType: car?.carName,
            requirements: `Destination: ${e.target.destination.value}`,
        };



        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                // --- Success Notification ---
                Swal.fire({
                    title: 'REQUEST SENT!',
                    text: 'Your luxury ride is waiting. We will contact you shortly.',
                    icon: 'success',
                    background: '#1B2532',
                    color: '#fff',
                    confirmButtonColor: '#E11D48',
                    confirmButtonText: 'GREAT!',
                    fontFamily: 'sans-serif'
                });
                e.target.reset();
            }, (err) => {
                // --- Error Notification ---
                Swal.fire({
                    title: 'ERROR!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    background: '#1B2532',
                    color: '#fff',
                    confirmButtonColor: '#E11D48'
                });
            });
    };

    if (!car) return <div className="text-center py-20">Loading Car Details...</div>;

    return (
        <div className="bg-white min-h-screen">
            {/* --- HEADER TITLE SECTION (Image reference style) --- */}
            <div className="bg-[#121921] text-white pt-40 pb-16 text-center">
                <h1 className="text-4xl font-bold mb-4">{car.carName} for Rent</h1>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-red-500">Home</Link>
                    <ChevronRight size={14} />
                    <span className="hover:text-red-500 cursor-pointer">Vehicle Listings</span>
                    <ChevronRight size={14} />
                    <span>{car.make}</span>
                    <ChevronRight size={14} />
                    <span className="text-white">{car.carName}</span>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- LEFT SIDE: IMAGES & SPECS --- */}
                    <div className="flex-1">
                        {/* Main Image View */}
                        <div className="relative mb-4">
                            <img
                                src={activeImg}
                                alt={car.carName}
                                className="w-full h-[450px] object-cover rounded-sm shadow-md"
                            />
                        </div>

                        {/* Gallery Thumbnails */}
                        <div className="flex gap-3 mb-12">
                            {[car.images?.main, ...(car.images?.gallery || [])].map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    onClick={() => setActiveImg(img)}
                                    className={`w-24 h-18 object-cover cursor-pointer border-2 transition-all ${activeImg === img ? 'border-red-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                />
                            ))}
                        </div>

                        {/* Vehicle Specifications (As per image_b7a4db) */}
                        <h2 className="text-xl font-bold text-[#1B2532] mb-6 border-b pb-2 uppercase tracking-tight">Vehicle Specifications</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-12 mb-12 text-sm">
                            <SpecItem label="Make" value={car.make} />
                            <SpecItem label="Model" value={car.model} />
                            <SpecItem label="Sport" value={car.carName} />
                            <SpecItem label="Year" value={car.year} />
                            <SpecItem label="Engine, cm3" value={car.engine_cm3} />
                            <SpecItem label="Horsepower (hp)" value={car.horsepower_hp} />
                            <SpecItem label="Seats" value={car.seats} />
                            <SpecItem label="Color" value={car.color} />
                        </div>

                        {/* Description Tabs */}
                        <div className="mt-12">
                            <div className="flex gap-8 border-b mb-6">
                                <button className="pb-3 border-b-2 border-red-600 text-sm font-bold text-red-600 uppercase">Vehicle Description</button>
                                <button className="pb-3 text-gray-500 text-sm font-bold uppercase hover:text-black">Features & Options</button>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                {car.description || `The ${car.carName} ${car.year} is a luxury vehicle that blends powerful performance with refined comfort. With its elegant interior, advanced technology, and commanding presence, it offers an exceptional driving experience on any terrain.`}
                            </p>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: SIDEBAR (As per image_b7a4db) --- */}
                    <aside className="w-full lg:w-[350px]">
                        {/* Seller Info */}
                        <div className="bg-white rounded shadow-sm mb-6 p-6 flex items-center gap-4">
                            <div className="w-16 h-16 border rounded-full overflow-hidden flex items-center justify-center p-1">
                                <img src="https://i.ibb.co/mV36qJcX/Gemini-Generated-Image-ucrrulucrrulucrr.png" alt="Partho Logo" className="w-full h-auto" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[#1B2532]">Partho Rental</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Member since: December 2025</p>
                            </div>
                        </div>

                        {/* Quick Contact Buttons */}
                        <div className="space-y-3 mb-6">
                            <button onClick={() => window.location.href = `tel:${buyerPhone}`} className="w-full bg-[#A33D52] hover:bg-[#8d3446] text-white py-3 rounded font-bold flex items-center justify-center gap-2 text-sm">
                                <Phone size={16} /> Contact Us
                            </button>
                            <button onClick={() => window.open(`https://wa.me/${buyerWhatsApp}`, '_blank')} className="w-full bg-[#25D366] hover:bg-[#1eb956] text-white py-3 rounded font-bold flex items-center justify-center gap-2 text-sm">
                                <MessageCircle size={16} /> WhatsApp
                            </button>
                        </div>

                        {/* Form Section */}
                        <div className="bg-[#1B2532] rounded-lg shadow-2xl overflow-hidden max-w-lg mx-auto">
                            {/* Header Section */}
                            <h3 className="bg-[#2A3542] text-white px-8 py-10 text-sm font-black uppercase tracking-[0.2em] text-center border-b-2 border-red-600">
                                Reach Out To Us
                            </h3>

                            <form onSubmit={handleFormSubmit} className="p-8 md:p-12 space-y-8 bg-white">

                                {/* First Name Field */}
                                <div className="flex flex-col space-y-1 group">
                                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="e.g. John"
                                        required
                                        className="custom-input w-full py-3 px-1 text-gray-700 bg-transparent"
                                    />
                                </div>

                                {/* Last Name Field */}
                                <div className="flex flex-col space-y-1 group">
                                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="e.g. Doe"
                                        required
                                        className="custom-input w-full py-3 px-1 text-gray-700 bg-transparent"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex flex-col space-y-1 group">
                                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="example@mail.com"
                                        required
                                        className="custom-input w-full py-3 px-1 text-gray-700 bg-transparent"
                                    />
                                </div>

                                {/* Mobile Number with Code */}

                                <div className=" flex flex-col space-y-1">
                                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">Code</label>
                                    <select
                                        className="custom-input w-full py-3 px-1 bg-transparent cursor-pointer text-sm"
                                        value={selectedCode}
                                        onChange={(e) => setSelectedCode(e.target.value)}
                                    >
                                        <option value="+971">+971 (UAE)</option>
                                        {countries.map((c, i) => (
                                            <option key={i} value={c.idd.root}>{c.name.common}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className=" flex flex-col space-y-1">
                                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">Mobile</label>
                                    <input name="mobile" type="text" placeholder="50 123 4567" required className="custom-input w-full py-3 px-1 bg-transparent" />
                                </div>


                                {/* Date & Destination */}
                                <div className="flex gap-6">
                                    <div className="w-1/2 flex flex-col space-y-1">
                                        <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">Pick Up Date</label>
                                        <input name="date" type="date" required className="custom-input w-full py-3 px-1 text-gray-500 bg-transparent" />
                                    </div>
                                    <div className="w-1/2 flex flex-col space-y-1">
                                        <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider ml-1">Destination</label>
                                        <input name="destination" type="text" placeholder="Dubai, UAE" required className="custom-input w-full py-3 px-1 bg-transparent" />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button type="submit" className="w-full bg-[#E11D48] text-white font-black py-5 uppercase text-xs tracking-[0.2em] hover:bg-black transition-all duration-500 rounded shadow-lg transform hover:-translate-y-1">
                                        Submit Request
                                    </button>
                                </div>

                                <style jsx>{`
            .custom-input {
                border: none;
                border-bottom: 2px solid #e5e7eb; /* Light gray bottom border */
                outline: none;
                transition: all 0.3s ease;
            }
            .custom-input:focus {
                border-bottom: 2px solid #E11D48; /* Red border on focus */
                background-color: rgba(225, 29, 72, 0.02);
            }
            /* Chrome, Safari, Edge, Opera - Remove spin buttons from date input */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `}</style>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx>{`
                .booking-input {
                    @apply p-3 border border-gray-200 text-xs focus:outline-none focus:border-red-600 bg-white rounded transition-colors;
                }
                label { display: block; }
            `}</style>
        </div>
    );
};

const SpecItem = ({ label, value }) => (
    <div className="flex justify-between border-b border-gray-100 py-1">
        <span className="text-gray-400 font-medium">{label}:</span>
        <span className="text-gray-800 font-bold">{value || 'N/A'}</span>
    </div>
);

export default CarDetails;