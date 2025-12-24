import PrimaryBtn from "./PrimaryBtn";
import Image from "next/image";
import { motion } from 'framer-motion';
import { CheckCircle2, Globe, Heart, Users, Zap, ArrowRight } from 'lucide-react';
import pic1 from "../../public/featuredImgs/weekendtrips.webp";
import pic2 from "../../public/featuredImgs/ruralhomestay.webp";
const features = [
  { 
    title: "Verified NGO Partners", 
    desc: "Every community partner is vetted for real-world impact.",
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  { 
    title: "Authentic Stays", 
    desc: "Hostels and homestays that feel like home, not hotels.",
    icon: <Globe className="w-6 h-6" />
  },
  { 
    title: "Skill Exchange", 
    desc: "Trade your talents for experiences and meaningful stays.",
    icon: <Zap className="w-6 h-6" />
  },
];

export default function WhyChooseNomadYatri() {
  return (
    <section className="relative mt-28 py-32 bg-[#fffcf9] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ff7d52]/5 rounded-l-[100px] -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#f25621] font-bold tracking-widest uppercase text-sm">
                The Nomad Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#431404] mt-4 leading-tight">
                Why Choose <br /> <span className="text-[#f25621]">Nomad Yatri?</span>
              </h2>
              <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-xl">
                India’s first platform built for meaningful travel. We bridge the gap between 
                curiosity and contribution through trust and transparency.
              </p>

              <div className="mt-10 space-y-8">
                {features.map((item, idx) => (
                  <div key={idx} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#ff7d52]/10 flex items-center justify-center text-[#f25621] group-hover:bg-[#f25621] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#431404]">{item.title}</h4>
                      <p className="text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            
                 <div className="flex justify-center mt-6">
                <PrimaryBtn
                  className="flex items-center gap-2 px-6 py-3"
                  text={
                    <span className="flex items-center gap-2">
                        Explore Opportunities <ArrowRight className="w-5 h-5" />
                    </span>
                  }
                  action="/programs"
                />
              </div>
            </motion.div>
          </div>

          {/* images*/}
          <div className="lg:w-1/2 relative h-[500px] md:h-[600px] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute top-10 left-10 w-3/4 h-3/4 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image
                src={pic1}
                alt="Traveler" 
                fill={true}
              />
            </motion.div>

            {/* Overlapping Secondary Image */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-[30px] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image 
                src={pic2}
                alt="Community"
                fill={true}

              />
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-0 right-10 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Impact</p>
                <p className="text-sm font-black text-[#431404]">500+ Verified NGOs</p>
              </div>
            </motion.div>
          </div>

        </div>

        <div className="mt-32 text-center">
          <p className="text-[#f25621] font-black text-2xl md:text-3xl italic opacity-80">
            “Travel cheap. Travel deep. Travel with purpose.”
          </p>
          <div className="mt-4 h-1 w-20 bg-[#f25621] mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}