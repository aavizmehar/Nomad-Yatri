"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Facebook, Loader2, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1a1a1a] selection:bg-yellow-100">
      <div className="fixed top-20 -right-20 opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[20vw] font-black leading-none">CONTACT</h1>
      </div>

      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- LEFT SIDE: INFO --- */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-600 block mb-6">Available Worldwide</span>
                <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9]">Let's <br /> <span className="italic font-serif">Connect.</span></h1>
              </motion.div>

              <div className="space-y-10">
                <section>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Inquiries</p>
                  <p className="text-xl font-light hover:text-yellow-600 transition-colors cursor-pointer">hello@nomadyatri.com</p>
                </section>
                <section>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Office</p>
                  <p className="text-xl font-light leading-relaxed">Manali, Himachal Pradesh <br /> India, 175131</p>
                </section>
              </div>
            </div>

            <div className="mt-20 flex gap-8 items-center">
              <Instagram size={20} className="hover:text-yellow-600 cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-yellow-600 cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-yellow-600 cursor-pointer transition-colors" />
              <div className="h-[1px] w-20 bg-gray-200" />
            </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-white p-10 md:p-16 rounded-[2rem] shadow-[0_100px_80px_rgba(0,0,0,0.02)] relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <CheckCircle2 size={60} className="text-yellow-400 mb-6" />
                    <h2 className="text-3xl font-medium mb-2">Message Sent</h2>
                    <p className="text-gray-400 font-light">The nomads have received your message. <br/> We'll be in touch soon.</p>
                    <button onClick={() => setStatus('idle')} className="mt-8 text-[10px] font-black uppercase tracking-widest underline underline-offset-8">Send another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="relative group">
                      <input 
                        type="text" name="name" required placeholder=" " value={formData.name} onChange={handleChange}
                        className="peer w-full bg-transparent border-b border-gray-200 py-4 outline-none focus:border-yellow-400 transition-all text-xl font-light"
                      />
                      <label className="absolute left-0 top-4 text-xl font-light text-gray-400 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-black peer-focus:text-yellow-600 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">What's your name?</label>
                    </div>

                    <div className="relative group">
                      <input 
                        type="email" name="email" required placeholder=" " value={formData.email} onChange={handleChange}
                        className="peer w-full bg-transparent border-b border-gray-200 py-4 outline-none focus:border-yellow-400 transition-all text-xl font-light"
                      />
                      <label className="absolute left-0 top-4 text-xl font-light text-gray-400 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-black peer-focus:text-yellow-600 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">Your email address</label>
                    </div>

                    <div className="relative group">
                      <textarea 
                        name="message" required placeholder=" " rows={4} value={formData.message} onChange={handleChange}
                        className="peer w-full bg-transparent border-b border-gray-200 py-4 outline-none focus:border-yellow-400 transition-all text-xl font-light resize-none"
                      />
                      <label className="absolute left-0 top-4 text-xl font-light text-gray-400 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-black peer-focus:text-yellow-600 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">How can we help?</label>
                    </div>

                    <button 
                      disabled={status === 'loading'}
                      className="group relative flex items-center gap-6 pt-6 disabled:opacity-50"
                    >
                      <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.3em]">
                        {status === 'loading' ? 'Dispatching...' : 'Send the Message'}
                      </span>
                    </button>
                    {status === 'error' && <p className="text-red-500 text-xs mt-4">Something went wrong. Please try again later.</p>}
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
            
            <p className="mt-10 text-[10px] text-gray-400 uppercase tracking-widest text-center lg:text-left">
              * We usually respond within 12 hours. Stay wild.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;