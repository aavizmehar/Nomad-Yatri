"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-[#1A2627] shadow-[0_40px_100px_-30px_rgba(26,38,39,0.5)]">
          
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-[#58a67d]/10 blur-[120px] hidden md:block" />

          <div className="flex flex-col lg:grid lg:grid-cols-2">
            
            <div className="relative z-20 order-2 lg:order-1 px-6 py-12 md:px-16 md:py-20 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Brand Tag */}
                <div className="mb-6 flex items-center gap-2 md:mb-8 md:gap-3">
                  <Sparkles size={14} className="text-[#ffcc00]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 md:text-[10px]">
                    Join the Movement
                  </span>
                </div>

                <h2 className="mb-6 text-3xl font-semibold leading-[1.2] text-white md:mb-8 md:text-5xl md:leading-[1.15]">
                  Travel with intention. <br className="hidden md:block" />
                  <span className="font-serif italic text-gray-400">
                    Leave a legacy.
                  </span>
                </h2>

                <p className="mb-8 text-base font-light leading-relaxed text-white/60 md:mb-12 md:text-lg">
                  Nomad Yatri is a bridge between soulful explorers and communities that need them. Create your story today.
                </p>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <Link
                    href="/user/register"
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#ffcc00] px-8 py-4 text-sm font-black text-[#1A2627] transition-all hover:shadow-[0_20px_40px_-15px_rgba(255,204,0,0.3)] active:scale-[0.95] md:px-10 md:py-5 md:text-base"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                  </Link>

                  <span className="text-center text-[10px] font-bold uppercase tracking-widest text-white/30 sm:text-left">
                    Established 2025
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="group relative order-1 min-h-[300px] overflow-hidden lg:order-2 lg:min-h-full">
              <Image
                src="/featuredImgs/volunteerprograms.webp"
                alt="Conscious travel in India"
                fill
                priority
                className="scale-110 object-cover transition-transform duration-[2s] ease-out group-hover:scale-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2627] via-[#1A2627]/20 to-transparent lg:bg-gradient-to-r" />
              
              <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02] md:opacity-[0.03]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;