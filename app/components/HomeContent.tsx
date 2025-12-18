"use client";

import React from "react";
import Link from "next/link";
import PrimaryBtn from "./PrimaryBtn";
import FeaturedExperiences from "./featuredExperiences";
const HomeContent: React.FC = () => {
  return (
    <div className="w-full">
      <section className=" relative m-3 min-h-[80vh] bg-cover bg-center bg-no-repeat rounded-lg flex items-center"
        style={{ backgroundImage: "url('./heroimg.jpg')" }}
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

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <PrimaryBtn text="Start Exploring" action="experiences/volunteer-programs" />
            <PrimaryBtn text="Register as Host" action="host/register" className="bg-green-600 hover:bg-green-500" />
          </div>
        </div>
      </section>

      <section className="mt-28 py-24 bg-[#fff8f4]">
  <div className="container mx-auto px-6 max-w-6xl">

    <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#431404]">
      Why Choose Nomad Yatri
    </h2>

    <p className="text-center text-gray-600 mt-5 max-w-2xl mx-auto text-lg">
      India’s first platform built for meaningful travel — where trust,
      transparency, and real-world impact come first.
    </p>

    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {[
        "Verified NGOs and community partners",
        "Authentic hostels and homestays",
        "Skill-based and work-exchange opportunities",
        "Growing digital nomad communities",
        "Affordable, purpose-driven travel",
      ].map((item, index) => (
        <div
          key={index}
          className="group p-8 rounded-2xl border border-[#ff7d52]/30 
                     bg-white hover:border-[#f25621]
                     transition-all duration-300"
        >
          <span className="block text-sm font-medium tracking-wider text-[#ca3b0c]">
            0{index + 1}
          </span>

          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            {item}
          </p>

          <div className="mt-6 h-[2px] w-12 bg-[#CD7643] group-hover:w-20 transition-all duration-300" />
        </div>
      ))}

    </div>

    <div className="mt-24 text-center">
      <blockquote className="inline-block max-w-3xl mx-auto px-10 py-6 border-l-4 
                             border-[#ca3b0c] bg-white text-[#431404] italic text-lg shadow-sm">
        “Travel cheap. Travel deep. Travel with purpose.”
      </blockquote>
    </div>

  </div>
</section>

      <FeaturedExperiences/>

    <section className="py-24 bg-white">
  <div className="container mx-auto px-6 max-w-6xl">

    <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900">
      How Nomad Yatri Works
    </h2>

    <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
      A simple, transparent process designed to protect both travelers and hosts.
    </p>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16">

      {/* Step 1 */}
      <div className="relative">
        <span className="block text-sm uppercase tracking-widest text-gray-400">
          Step 01
        </span>

        <h3 className="mt-3 text-xl font-medium text-gray-900">
          Discover meaningful experiences
        </h3>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Browse verified volunteering, work-exchange, and community stays.
          Filter by location, skills required, duration, and host expectations.
        </p>
      </div>

      {/* Step 2 */}
      <div className="relative">
        <span className="block text-sm uppercase tracking-widest text-gray-400">
          Step 02
        </span>

        <h3 className="mt-3 text-xl font-medium text-gray-900">
          Apply with clarity
        </h3>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Create your profile and apply directly to hosts.
          Hosts review applications personally before approving.
          Once approved, direct chat is enabled.
        </p>
      </div>

      {/* Step 3 */}
      <div className="relative">
        <span className="block text-sm uppercase tracking-widest text-gray-400">
          Step 03
        </span>

        <h3 className="mt-3 text-xl font-medium text-gray-900">
          Travel, contribute, belong
        </h3>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Complete your experience, contribute meaningfully,
          and become part of a growing community of conscious travelers.
          Earn recognition for your impact.
        </p>
      </div>

    </div>

  </div>
</section>


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

    <div className="mt-12 flex justify-center">
      <PrimaryBtn
        text="Create your free account"
        action="user/register"
        className="bg-[#f25621] hover:bg-[#ca3b0c] text-white px-8 py-4 text-lg rounded-xl transition"
      />
    </div>

    <p className="mt-6 text-sm text-white/60">
      Free to join • No hidden fees • Verified hosts
    </p>

  </div>
</section>

    </div>
  );
};

export default HomeContent;
