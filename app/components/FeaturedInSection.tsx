"use client";

import Image from "next/image";
import { motion } from "framer-motion";
const PARTNERS = [
  { name: "YourStory", logo: "/heroimg.webp" },
  { name: "Vistara", logo: "/heroimg.webp" },
  { name: "Outlook Traveller", logo: "/heroimg.webp" },
  { name: "The Hindu", logo: "/heroimg.webp" },
  { name: "Times of India", logo: "/heroimg.webp" },
];


const FeaturedInSection = () => {
  return (
    <section className="py-16 bg-[#FCFCFC]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <h2 className="text-xl md:text-2xl font-bold text-[#314e4d] text-center mb-10">
          Featured In:
        </h2>

        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6">
          {PARTNERS.map((partner, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center p-8 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md group"
            >
               <div className="relative h-10 w-32 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden relative overflow-hidden">
          <motion.div 
            className="flex gap-4 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "fit-content" }}
          >
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 flex items-center justify-center w-48 h-28 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="relative h-8 w-28 grayscale">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FCFCFC] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FCFCFC] to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};

export default FeaturedInSection;