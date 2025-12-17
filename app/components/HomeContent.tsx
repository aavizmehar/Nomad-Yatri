"use client";

import React from "react";
import Link from "next/link";
import PrimaryBtn from "./PrimaryBtn";
const HomeContent: React.FC = () => {
  return (
    <div className="w-full">
      <section className=" relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: "url('./heroimg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />

        <div className="p-20 mt-25 p-3 relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <h1 className="font-bold leading-tight">
            Travel with Purpose. Live with Impact.
          </h1>

          <p className="mt-6 text-lg md:text-xl">
            India’s largest travel, volunteering & work-exchange community — explore meaningful
            stays, support local communities, and learn new skills while traveling.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
           
<PrimaryBtn text="Start Exploring" action="experiences/volunteer-programs"  />
<PrimaryBtn text="Register as Host" action="host/register" className="bg-green-600 hover:bg-green-500"  />


          </div>
        </div>
      </section>

      <section className="mt-20 p-20 container mx-auto">
        <h2 className="text-3xl font-bold text-center">Why Choose Nomad Yatri</h2>
        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          We are India’s first platform that blends:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-gray-700">
          {[
            "Verified NGOs",
            "Authentic hostels & homestays",
            "Work-exchange & skill-based stays",
            "Digital nomad communities",
            "Affordable travel opportunities"
          ].map((item, index) => (
            <div key={index} className="p-3 bg-[#D49159] text-white rounded-xl shadow hover:shadow-lg transition">
              <p className="text-lg text-center">{item}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-20 text-center"><i> "Travel cheap. Travel deep. Travel with purpose."</i></h3>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Featured Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
            {[
              { title: "Volunteer Programs", link: "/experiences/volunteer-programs" },
              { title: "Work Exchange Stays", link: "/experiences/work-exchange" },
              { title: "Digital Nomad Stays", link: "/experiences/digital-nomad-stays" },
              { title: "Rural Homestays", link: "/experiences/rural-homestays" },
              { title: "Eco Projects", link: "/eco-projects" },
              { title: "Weekend Trips", link: "/weekend-trips" },
            ].map((exp, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
                <div className="h-40 bg-gray-300 rounded-lg mb-4" /> {/* placeholder image */}

                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-gray-600 mt-2">Explore meaningful stays and experiences.</p>

                <Link href={exp.link}
                  className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">

          {/* Step 1 */}
          <div className="text-center p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold">1. Find an Experience</h3>
            <p className="mt-3 text-gray-600">
              Search by location, type, skills & duration.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold">2. Apply & Get Approved</h3>
            <p className="mt-3 text-gray-600">
              Create profile → Host reviews → Approval → Chat opens.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold">3. Travel & Make an Impact</h3>
            <p className="mt-3 text-gray-600">
              Complete experience → Earn certificate → Join community.
            </p>
          </div>

        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Our Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">

            {[
              { title: "Volunteers Connected", number: "12,000+" },
              { title: "Communities Supported", number: "350+" },
              { title: "Verified Hosts", number: "800+" },
              { title: "Total Impact Hours", number: "100,000+" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-3xl font-bold">{stat.number}</h3>
                <p className="mt-2">{stat.title}</p>
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

      <section className="p-10 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold py-7 px-10">
          Join India’s Fastest Growing Travel Community
        </h2>
<p className="px-6 text-center">India’s largest travel, volunteering & work-exchange community — explore meaningful stays, support local communities, and learn new skills while traveling.</p>
       
<PrimaryBtn text="Sign Up Free" action="volunteer/register"  />

      </section>

    </div>
  );
};

export default HomeContent;
