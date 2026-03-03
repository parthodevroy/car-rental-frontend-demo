
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router'; 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;

    console.log("Subscribing email:", email);

    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#161f2c] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* --- 1. Top Logo Section --- */}
        <div className="flex flex-col items-center mb-16">
          <div className="z-30 flex items-center mb-6">
            <Link to="/" className="relative w-32 md:w-40 lg:w-48">
              <img
                src="https://i.ibb.co/LdtSPZbC/image-12-removebg-preview.png"
                alt="7Cars Logo"
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/your-page-username" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#E11D48] transition-all duration-300 border border-white/10"
            >
              <Facebook size={18} />
            </a>
            {/* <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#E11D48] transition-all duration-300 border border-white/10">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#E11D48] transition-all duration-300 border border-white/10">
              <span className="font-bold text-[14px]">Bē</span>
            </a> */}
          </div>
        </div>

        {/* --- 2. Main Footer Content --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">

          {/* Column 1: Contact Info */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-tight">Contact Info</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <MapPin size={22} className="text-[#E11D48] mt-1 shrink-0" />
                <span className="text-gray-400 text-[15px] leading-relaxed group-hover:text-white transition-colors">
                  Nilphamary,Rongpur, <br />MD 20903, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail size={22} className="text-[#E11D48] shrink-0" />
                <a href="mailto:Siemenyit@gmail.com" className="text-gray-400 text-[15px] group-hover:text-white transition-colors">
                  rpartho787@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone size={22} className="text-[#E11D48] shrink-0" />
                <span className="text-gray-400 text-[15px]">
                  Phone: <a href="tel:+12405396279" className="text-white font-black ml-1 hover:text-[#E11D48] transition-colors tracking-tight text-lg">+8801925033400 </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore More */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-tight">Explore More</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-5">
                <li>
                  <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-[#E11D48] transition-all text-[15px] font-medium group">
                    <ChevronRight size={14} className="text-[#E11D48] opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="flex items-center gap-2 text-gray-400 hover:text-[#E11D48] transition-all text-[15px] font-medium group">
                    <ChevronRight size={14} className="text-[#E11D48] opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    About
                  </Link>
                </li>
              </ul>
              <ul className="space-y-5">
                <li>
                  <Link to="/our-fleet" className="flex items-center gap-2 text-gray-400 hover:text-[#E11D48] transition-all text-[15px] font-medium group">
                    <ChevronRight size={14} className="text-[#E11D48] opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    Our Fleet
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center gap-2 text-gray-400 hover:text-[#E11D48] transition-all text-[15px] font-medium group">
                    <ChevronRight size={14} className="text-[#E11D48] opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    Contacts
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Subscribe Newsletter */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-tight">Subscribe Newsletter</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              Get our weekly newsletter for latest car news, offers, and deals.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="relative mt-6 group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full bg-[#2A3544] border border-white/5 p-4 pr-14 text-sm focus:outline-none focus:border-[#E11D48] transition-all text-white placeholder:text-gray-500 rounded-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full w-14 bg-[#E11D48] flex items-center justify-center hover:bg-white hover:text-[#E11D48] transition-all duration-300 rounded-r-sm"
              >
                <Send size={20} />
              </button>

              {/* Success Feedback */}
              {isSubscribed && (
                <div className="absolute -bottom-10 left-0 flex items-center gap-2 text-green-400 text-sm font-bold animate-fade-in">
                  <CheckCircle2 size={16} />
                  Thank you for subscribing!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* --- 3. Bottom Copyright Section --- */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[13px] font-medium">
          <p>Copyrights © 2026 7Car Rental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;