"use client";

import React from "react";
import Link from "next/link";
import PrimaryBtn from "./PrimaryBtn";

import { ArrowRight } from 'lucide-react';
import FeaturedExperiences from "./featuredExperiences";
import WhyChooseNomadYatri from "./HomeWhyChoose";
import HowItWorks from "./HowitWorks";
const HomeContent: React.FC = () => {
  return (
    <div className="w-full">
      <section className=" relative m-3 min-h-[80vh] bg-cover bg-center bg-no-repeat rounded-lg flex items-center"
        style={{ backgroundImage: "url('./heroimg.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
        <div className="p-20 mt-15 p-3 relative z-10 text-center text-white px-6 max-w-3xl mx-auto">

          <p className="heroline "> India’s largest travel & volunteering community </p>
          <h1 className="font-bold leading-tight">
            Travel with Purpose. Live with Impact.
          </h1>

          <p className="mt-6 text-lg md:text-xl">
            Explore meaningful
            stays, support local communities, and learn new skills while traveling.
          </p>

       <div className="flex justify-center mt-6">
  <PrimaryBtn
    className="flex items-center gap-2 px-6 py-3 hover:bg-yellow-500 "
    text={
      <span className="flex items-center gap-2">
        Begin Your Adventure Today <ArrowRight className="w-5 h-5" />
      </span>
    }
    action="experiences/volunteer-programs"
  />
</div>

        </div>
      </section>

      <WhyChooseNomadYatri />

      <FeaturedExperiences />

      <HowItWorks />


      <section className="py-24 bg-[#431404] text-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">

          <h2 className="text-3xl md:text-4xl font-semibold">
            Our Impact
          </h2>

          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Measurable outcomes from real people, real communities,
            and real experiences across India.
          </p>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8">

            {[
              { title: "Volunteers connected", number: "12,000+" },
              { title: "Communities supported", number: "350+" },
              { title: "Verified hosts", number: "800+" },
              { title: "Impact hours completed", number: "100,000+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-medium text-[#ff7d52]">
                  {stat.number}
                </span>

                <span className="mt-4 text-sm uppercase tracking-widest text-white/70 text-center">
                  {stat.title}
                </span>

                <div className="mt-6 h-[1px] w-12 bg-white/30" />
              </div>
            ))}

          </div>

        </div>
      </section>


      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Testimonials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

          <blockquote className="p-6 bg-gray-50 rounded-xl shadow">
            “Nomad Yatri changed the way I travel.”
          </blockquote>

          <blockquote className="p-6 bg-gray-50 rounded-xl shadow">
            “Best community platform in India.”
          </blockquote>

        </div>
      </section>

      <section className="mt-24 bg-[#1a2627]">
        <div className="container mx-auto px-6 py-20 max-w-5xl text-center">

          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Join India’s growing community of conscious travelers
          </h2>

          <p className="mt-6 text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Nomad Yatri connects travelers, hosts, and communities through
            meaningful experiences — from volunteering to skill-based stays.
            Travel with intention, not impulse.
          </p>

          <PrimaryBtn
            text="Create your free account"
            action="user/register"
            className=" rounded-md px-8 w-max m-auto py-4 text-lg rounded-xl transition"
          />

          <p className="mt-6 text-sm text-white/60">
            Free to join • No hidden fees • Verified hosts
          </p>

        </div>
      </section>

    </div>
  );
};

export default HomeContent;
