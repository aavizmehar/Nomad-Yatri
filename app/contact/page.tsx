"use client";

import React, { useState } from 'react';

// --- SELF-CONTAINED SVG ICONS ---

const MailIcon = ({ className = "" }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const PhoneIcon = ({ className = "" }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.14a11.042 11.042 0 005.516 5.516l1.14-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-12a2 2 0 01-2-2V5z"></path></svg>
);
const ClockIcon = ({ className = "" }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const AlertIcon = ({ className = "" }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
);

const ContactPage = () => {
    // State for form submission handling
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // In a real app, send data to the API here
    alert("Thank you! Your message has been sent.");
    setFormData({ name: '', email: '', message: '' });
};


    return (
        <div className="pt-20 pb-16 bg-gray-50 min-h-screen font-inter">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-16">

                {/* 1. HERO SECTION & CONTACT INFO */}
                <section className="grid lg:grid-cols-3 gap-10 py-12">
                    
                    {/* Left Column: Title & Overview */}
                    <div className="lg:col-span-1">
                        <p className="text-indigo-600 font-bold uppercase tracking-widest mb-2">Get In Touch</p>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            We're Here to Help
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Whether you have a question about a trip, need support with a booking, or want to discuss a partnership, reach out to our team.
                        </p>
                    </div>

                    {/* Right Columns: Contact Details & Support */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
                        
                        {/* Support Details */}
                        <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-400">
                            <MailIcon className="text-indigo-600 mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">General Support</h3>
                            <p className="text-lg font-semibold text-gray-800">support@nomadyatri.com</p>
                            
                            <div className="flex items-center gap-2 mt-4 text-gray-600">
                                <ClockIcon />
                                <span className="font-medium">Support Timings: Monday - Friday, 9:00 AM - 6:00 PM IST</span>
                            </div>
                        </div>

                        {/* Emergency Support */}
                        <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-red-500">
                            <AlertIcon className="text-red-500 mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Support</h3>
                            <p className="text-lg font-semibold text-red-500">+91 8894108119</p>
                            <p className="text-sm text-gray-600 mt-2">
                                For urgent, on-trip issues only. Standard inquiries will be redirected to email.
                            </p>
                        </div>
                    </div>
                </section>
                
                {/* 2. CONTACT FORM */}
                <section className="max-w-4xl mx-auto p-8 md:p-12 bg-white rounded-3xl shadow-2xl border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                placeholder="Your full name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </section>

            </div>
        </div>
    );
};

export default ContactPage;