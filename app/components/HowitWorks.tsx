'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, Heart, Handshake, ArrowRight } from 'lucide-react';
import PrimaryBtn from './PrimaryBtn';

const steps = [
  {
    title: "Discover meaningful experiences",
    desc: "Browse verified volunteering, work-exchange, and community stays. Filter by location, skills, and host expectations.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    title: "Apply with clarity",
    desc: "Create your profile and apply directly to hosts. Once approved, direct chat is enabled for seamless planning.",
    icon: <UserCheck className="w-8 h-8" />,
    color: "bg-[#f25621]",
    lightColor: "bg-orange-50",
    textColor: "text-[#f25621]"
  },
  {
    title: "Travel, contribute, belong",
    desc: "Complete your experience, contribute meaningfully, and earn recognition for your real-world impact.",
    icon: <Handshake className="w-8 h-8" />,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#f25621] font-bold tracking-[0.2em] uppercase text-xs"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mt-4"
          >
            How <span className="text-[#f25621]">Nomad Yatri</span> Works
          </motion.h2>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            A simple, transparent process designed to protect both travelers and hosts at every step.
          </p>
        </div>

        {/* Steps Journey */}
        <div className="relative">

          {/* Central Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <div className={`relative w-20 h-20 mb-8 rounded-full ${step.lightColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>

                  {/* Step Number Badge */}
                  <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full ${step.color} text-white text-xs font-bold flex items-center justify-center border-4 border-white`}>
                    0{index + 1}
                  </div>

                  <div className={step.textColor}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-4 rounded-3xl transition-all">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#f25621] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile Connector (Arrow) */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden mt-8 text-slate-300">
                    <ArrowRight className="w-8 h-8 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 text-center"
        >
         <div className="flex justify-center mt-6">
  <PrimaryBtn 
    className="flex items-center gap-2 rounded-md "
    text={
      <span className="flex items-center gap-2">
        Get Started Now <ArrowRight className="w-5 h-5" />
      </span>
    }
    action="user/register"
  />
</div>

        </motion.div>

      </div>
    </section>
  );
}