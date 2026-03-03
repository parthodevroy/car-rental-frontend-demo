
import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation(); 

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'OUR FLEET', path: '/our-fleet' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACTS', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-transform duration-500 ease-in-out shadow-md ${show ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      {/* --- Top Bar (Dark Section) --- */}
      <div className="relative hidden lg:block bg-[#1B2532] text-white h-[45px]">
        <div className="absolute left-0 top-0 h-full w-[22%] bg-white skew-x-[-30deg] -translate-x-10 z-10"></div>
        <div className="w-full h-full flex justify-end items-center px-10 relative z-20">
          <div className="flex items-center gap-6 text-[12px] font-medium opacity-90 tracking-wide">
            <span>rpartho787@gmail.com</span>
            <span className="opacity-30">|</span>
            <span>Mon to Fri : 9:00am to 9:00pm</span>
            <span className="opacity-30">|</span>
            <span>Nilphamary,Rongpur,Bangladesh </span>
            <span className="opacity-30">|</span>
            <div className="flex items-center gap-2 ml-2">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="h-3.5 w-5 object-cover rounded-sm" />
              <img src="https://flagcdn.com/w20/ae.png" alt="UAE" className="h-3.5 w-5 object-cover rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Navbar (White Section) --- */}
      <nav className="relative h-[85px] lg:h-[100px] flex items-center bg-white px-6 lg:px-10 border-b border-gray-50">
        <div className="w-full flex justify-between items-center">

          {/* Logo Section */}
          <div className="z-30 flex items-center">
            <Link to="/" className="flex flex-col group cursor-pointer">
              <h1 className="leading-none">
                <div className="relative w-32 md:w-24 lg:w-35 ">
                  <img
                    src="https://i.ibb.co/LdtSPZbC/image-12-removebg-preview.png"
                    alt="Yemenyi Rental"
                    className="w-full h-auto object-contain drop-shadow-sm"
                  />
                </div>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 ml-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-bold uppercase tracking-wide text-sm ${location.pathname === link.path
                    ? 'text-[#E11D48]'
                    : 'text-[#1B2532] hover:text-[#E11D48]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Section */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 border-l border-gray-200 pl-8 h-[50px]">
              <div className="relative">
                <Phone size={32} className="text-[#E11D48] transform -rotate-12" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E11D48] rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">Call Us Today!</span>
                <span className="text-[22px] font-[1000] text-[#1B2532] leading-none tracking-tight">+8801925033400 </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 text-[#1B2532]">
              <Menu size={32} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[120] shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b">
          {/* <span className="font-black italic text-xl">Yemenyi</span> */}
           <img
                    src="https://i.ibb.co/XZ7y9hVj/Gemini-Generated-Image-938yvu938yvu938y-removebg-preview.png"
                    alt="Yemenyi Rental"
                    className="w-auto h-10 object-contain drop-shadow-sm"
                  />
          <button onClick={() => setIsOpen(false)} className="text-gray-500"><X size={30} /></button>
        </div>
        <div className="flex flex-col bg-white mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-8 py-4 text-sm font-bold border-b border-gray-50 transition-all uppercase tracking-widest ${location.pathname === link.path ? 'bg-[#E11D48] text-white' : 'text-[#1B2532] hover:bg-gray-50'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;