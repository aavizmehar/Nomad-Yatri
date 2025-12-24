"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-white px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1A2627] shadow-[0_40px_100px_-30px_rgba(26,38,39,0.5)]">
          
          {/* Subtle light leak for depth */}
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-[#58a67d]/10 blur-[120px]" />

          <div className="grid lg:grid-cols-2">
            
            {/* CONTENT AREA */}
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Brand Tag with Icon */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ffcc00]">
                    Join the Movement
                  </span>
                </div>

                <h2 className="mb-8 max-w-xl text-4xl md:text-5xl font-semibold leading-[1.15] text-white">
                  Travel with intention. <br />
                  <span className="font-serif italic text-gray-400">
                    Leave a legacy.
                  </span>
                </h2>

                <p className="mb-12 max-w-md text-lg leading-relaxed text-white/60 font-light">
                  Nomad Yatri is more than travel. It is a bridge between soulful explorers and communities that need them. Create your story today.
                </p>

                {/* THE BUTTON: Switched to Brand Yellow for Maximum Impact */}
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <Link
                    href="/user/register"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#ffcc00] px-10 py-5 text-base font-black text-[#1A2627] 
                               transition-all hover:shadow-[0_20px_40px_-15px_rgba(255,204,0,0.3)] active:scale-[0.98]"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <ArrowRight
                      size={18}
                      className="relative z-10 transition-transform group-hover:translate-x-1"
                    />
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                  </Link>

                 
                </div>

                
              </motion.div>
            </div>

            {/* IMAGE AREA: With Parallax-like effect on hover */}
            <div className="group relative min-h-[400px] overflow-hidden lg:min-h-full">
              <Image
                src="/featuredimgs/volunteerprograms.webp"
                alt="Conscious travel in India"
                fill
                priority
                className="scale-110 object-cover transition-transform duration-[2s] ease-out group-hover:scale-100"
              />

              {/* Sophisticated Dual Gradient */}
              <div className="absolute inset-0 hidden bg-gradient-to-r from-[#1A2627] via-[#1A2627]/20 to-transparent lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2627] via-transparent to-transparent lg:hidden" />
              
              {/* Subtle texture overlay for authenticity */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;