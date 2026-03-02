import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser'; 
import Swal from 'sweetalert2';

const Contact = () => {
    const formRef = useRef();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
            .then((result) => {
                console.log("Success:", result.text);

                // Success SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'MESSAGE SENT!',
                    text: 'We have received your request. Our team will contact you shortly.',
                    background: '#1B2532',
                    color: '#fff',
                    confirmButtonColor: '#E11D48',
                    confirmButtonText: 'DONE',
                    iconColor: '#E11D48',
                    customClass: {
                        title: 'font-black italic uppercase',
                    }
                });

                reset();
            }, (error) => {
                console.log("Error:", error.text);

                // Error SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'OPPS...',
                    text: 'Failed to send message. Please try again.',
                    background: '#1B2532',
                    color: '#fff',
                    confirmButtonColor: '#E11D48',
                    confirmButtonText: 'TRY AGAIN'
                });
            });
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* --- Hero Section --- */}
            <div className="bg-[#0F172A] py-35 text-center">
                <h1 className="text-white text-3xl font-bold pt-20 mb-4 uppercase tracking-tight ">Contacts</h1>
                <div className="text-gray-400 flex justify-center items-center gap-2 uppercase text-[10px] font-black tracking-[0.3em]">
                    <Link to={"/"}><span>Home</span></Link>
                    <ChevronRight size={12} className="text-red-600" />
                    <span className="text-white">Contacts</span>
                </div>
            </div>

            {/* --- Info Cards Section --- */}
            <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ContactCard
                    Icon={MapPin}
                    title="Our Office"
                    detail="8626 11th Ave, Silver Spring, MD 20903, USA"
                    dark
                />
                <ContactCard
                    Icon={Phone}
                    title="Phone"
                    detail="+12405396279"
                    red
                />
                <ContactCard
                    Icon={Mail}
                    title="Email"
                    detail="info@cars.ae"
                    dark
                />
                <ContactCard
                    Icon={MessageCircle}
                    title="WhatsApp"
                    detail="+12405396279"
                    red
                />
            </div>

            {/* --- Map & Form Section --- */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Google Map Embed */}
                    <div className="w-full h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-sm border border-gray-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.3262607901045!2d-77.001614324209!3d38.98502577170564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c897f1e71271%3A0x6b49e49a8885f85b!2s8626%2011th%20Ave%2C%20Silver%20Spring%2C%20MD%2020903%2C%20USA!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Office Location"
                        ></iframe>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:pl-8">
                        <h2 className="text-3xl font-black mb-4 italic uppercase">
                            Get In Touch With <span className="text-red-600">Yemenyi Rental Rent A Car</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">
                            Have questions or need help choosing the right car? Our team is here to assist you. Fill out the form below, and we'll get back to you as soon as possible.
                        </p>

                        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Your Name</label>
                                <input
                                    name="fullName"
                                    {...register("fullName", { required: "Name is required" })}
                                    type="text"
                                    className="w-full border border-gray-200 p-3 rounded-sm focus:border-red-600 outline-none transition-colors"
                                />
                                {errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Your Email</label>
                                <input
                                    name="email"
                                    {...register("email", { required: "Email is required" })}
                                    type="email"
                                    className="w-full border border-gray-200 p-3 rounded-sm focus:border-red-600 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Subject</label>
                                <input
                                    name="subject"
                                    {...register("subject")}
                                    type="text"
                                    className="w-full border border-gray-200 p-3 rounded-sm focus:border-red-600 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Your Message (optional)</label>
                                <textarea
                                    name="requirements"
                                    {...register("requirements")}
                                    rows="4"
                                    className="w-full border border-gray-200 p-3 rounded-sm focus:border-red-600 outline-none transition-colors resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#1B2532] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all cursor-pointer"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ContactCard = ({ Icon, title, detail, dark, red }) => (
    <div className="bg-[#F8FAFC] p-8 text-center shadow-lg relative group">
        <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center text-white 
            ${dark ? 'bg-[#1E293B]' : red ? 'bg-red-600' : 'bg-gray-400'}`}>
            <Icon size={24} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-2">{title}</h3>
        <p className="text-xs text-gray-500 font-bold leading-relaxed">{detail}</p>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-[3px] border-b-[3px] border-[#1E293B]"></div>
    </div>
);

export default Contact;