"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, ShieldCheck, HeartPulse, MapPin } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Abhishek Singh",
    role: "Founder & Strategy",
    image: null
  },
  {
    name: "Vedika Tiwari",
    role: "Property Listing Manager",
    image: null
  },
  {
    name: "Aaviz Mehar",
    role: "Web Developer",
    image: "/team/Aaviz.webp"
  },
  {
    name: "Adrita Khan", role: "Social media manager",
    image: "/team/Adrita.webp"
  },
  {
    name: "Yavaneeka Swami", role: "Graphic designer",
    image: "/team/Yavaneeka.webp"
  },
];

const FOUNDATION_POINTS = [
  {
    title: "The Traveler",
    desc: "Seeking meaningful depth beyond the tourist trail.",
    img: "/featuredImgs/volunteerprograms.webp",
  },
  {
    title: "The NGO",
    desc: "Requiring committed, skilled support for social impact.",
    img: "/featuredImgs/weekendtrips.webp",
  },
  {
    title: "The Youth",
    desc: "Facing high costs to explore their own country.",
    img: "/featuredImgs/ecoprojects.webp",
  },
  {
    title: "The Rural Host",
    desc: "Needing visibility and connection to the global community.",
    img: "/featuredImgs/workexchange.webp",
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-[#FCFCFC] min-h-screen font-sans text-[#1A2627]">
      <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-32 px-6 overflow-hidden bg-[#FCFCFC]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#58a67d] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">
                  The Nomad Yatri Story
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] text-[#314e4d] mb-8">
                  Travel with <br />
                  <span className="italic font-serif font-light text-gray-400">Purpose.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl mb-10 font-light">
                  We believe travel is a powerful tool for change. Nomad Yatri is a purpose-driven ecosystem designed to foster ethical volunteering and sustainable community growth across the Indian subcontinent.
                </p>

                <div className="flex items-center gap-6">
                  <Link
                    href="/user/register"
                    className="inline-flex items-center gap-2 bg-[#ffcc00] text-[#314e4d] px-10 py-4 rounded-lg font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    Join Us <ArrowRight size={18} />
                  </Link>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-[#58a67d] font-semibold tracking-wide uppercase">
                    <div className="w-8 h-[1px] bg-[#58a67d]"></div>
                    EST. 2025
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
                <Image
                  src="/featuredImgs/volunteerprograms.webp"
                  alt="A traveler engaging with local community members in rural India"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/20">
                  <MapPin size={14} className="text-[#58a67d]" />
                  <span className="text-[11px] font-bold text-[#314e4d] uppercase tracking-wider">Spiti Valley, India</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ffcc00]/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 h-64 relative rounded-2xl overflow-hidden shadow-sm">
                <Image src="/featuredImgs/volunteerprograms.webp" alt="Volunteer impact" fill className="object-cover" />
              </div>
              <div className="col-span-7 h-48 relative rounded-2xl overflow-hidden shadow-sm">
                <Image src="/featuredImgs/weekendtrips.webp" alt="Cultural exploration" fill className="object-cover" />
              </div>
              <div className="col-span-5 h-48 relative rounded-2xl overflow-hidden shadow-sm">
                <Image src="/featuredImgs/workexchange.webp" alt="Work exchange community" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#314e4d]">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To transform the landscape of Indian tourism by prioritizing <span className="text-[#314e4d] font-semibold">human connection over commercialism</span>. Our goal is to ensure every journey contributes to local micro-economies and grassroots social projects.
              </p>

              <div className="space-y-6 pt-4">
                {[
                  { icon: <Globe2 size={24} />, title: "Ethical Exploration", text: "Promoting respect for local traditions and environments." },
                  { icon: <ShieldCheck size={24} />, title: "Trusted Partnerships", text: "Vetted NGOs ensuring your efforts create real change." },
                  { icon: <HeartPulse size={24} />, title: "Sustainable Growth", text: "Focusing on long-term impact for rural communities." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-[#58a67d] mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-[#314e4d]">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[#58a67d] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">
                The Foundation
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#314e4d] leading-tight">
                Bridging the gap between <br />
                <span className="italic font-serif text-gray-400">intent and impact.</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed border-l border-[#ffcc00] pl-4">
              Solving systemic challenges through a community-led travel ecosystem that prioritizes people over profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
            {FOUNDATION_POINTS.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-[#FCFCFC] transition-all"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2627]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-[#ffcc00] font-mono text-xs mb-2 block">0{i + 1}</span>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 text-xs font-bold text-[#314e4d] uppercase tracking-widest opacity-40">
              <div className="w-12 h-[1px] bg-[#314e4d]"></div>
              A Human-to-Human Network
              <div className="w-12 h-[1px] bg-[#314e4d]"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-16">The Core Team</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="space-y-4">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border border-gray-100 bg-[#f0f2f2] flex items-center justify-center">

                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-[#314e4d] font-bold text-xl">
                      {member.name.charAt(0)}
                    </span>
                  )}

                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#314e4d]">
                    {member.name}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-semibold text-[#314e4d] mb-8">Begin your most purposeful journey yet.</h2>
            <Link
              href="/user/register"
              className="inline-flex items-center gap-2 bg-[#ffcc00] text-[#314e4d] px-10 py-4 rounded-lg font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Join Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;