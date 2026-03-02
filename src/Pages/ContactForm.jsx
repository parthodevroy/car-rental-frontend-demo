
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';


const ContactForm = () => {
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // --- EmailJS Configuration ---

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log("Success:", result.text);

        // Success SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Message sent successfully! We will contact you soon.',
          icon: 'success',
          confirmButtonColor: '#E11D48',
          background: '#1B2532',
          color: '#fff',
          confirmButtonText: 'GREAT'
        });

        reset();
      }, (error) => {
        console.log("Error:", error.text);

        // Error SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send message. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#E11D48',
          background: '#1B2532',
          color: '#fff'
        });
      });
  }
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* --- Header Area --- */}
        <div className="mb-10">
          <h2 className="text-4xl lg:text-5xl font-[1000] text-[#1B2532] tracking-tighter uppercase">
            Get In Touch With <span className="text-[#E11D48]">Partho Rental</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg max-w-5xl leading-relaxed">
            Have questions or need help choosing the right car? Our team is here to assist you.
          </p>
        </div>

        {/* --- Form Start --- */}
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Full Name */}
          <div className="flex flex-col gap-3">
            <label className="text-[15px] font-bold text-[#1B2532]">Full Name</label>
            <input
              name="fullName"
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="Full Name"
              className={`w-full p-4 bg-[#F8FAFC] border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-[#E11D48] text-gray-700 transition-all`}
            />
            {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-3">
            <label className="text-[15px] font-bold text-[#1B2532]">Email Address</label>
            <input
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              placeholder="Email Address"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-[#E11D48] text-gray-700 transition-all"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-3">
            <label className="text-[15px] font-bold text-[#1B2532]">Contact Number</label>
            <input
              name="phone"
              {...register("phone", { required: "Contact number is required" })}
              placeholder="Contact Number / WhatsApp Number"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-[#E11D48] text-gray-700 transition-all"
            />
          </div>

          {/* Car Type & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[15px] font-bold text-[#1B2532]">Car Type</label>
              <select name="carType" {...register("carType")} className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-[#E11D48]">
                <option value="Economy">Economy</option>
                <option value="Luxury">Luxury</option>
                <option value="SUV">SUV</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[15px] font-bold text-[#1B2532]">Pickup Date</label>
              <input type="date" name="pickupDate" {...register("pickupDate")} className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-[#E11D48]" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[15px] font-bold text-[#1B2532]">Return Date</label>
              <input type="date" name="returnDate" {...register("returnDate")} className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-[#E11D48]" />
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="flex flex-col gap-3">
            <label className="text-[15px] font-bold text-[#1B2532]">Additional Requirements</label>
            <textarea
              name="requirements"
              {...register("requirements")}
              rows="5"
              placeholder="Tell us more about your needs..."
              className="w-full p-6 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:border-[#E11D48] text-gray-700 transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#1B2532] text-white px-12 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#E11D48] transition-all duration-300 rounded shadow-xl transform active:scale-95"
            >
              Send Message
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ContactForm;