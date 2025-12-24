import Image from 'next/image';
import Link from 'next/link';

const experiences = [
  { 
    title: "Volunteer Programs", 
    link: "/experiences/volunteer-programs",
    image: "/featuredImgs/volunteerprograms.webp",
    desc: "Make an impact through education, animal care, or community support."
  },
  { 
    title: "Work Exchange Stays", 
    link: "/experiences/work-exchange",
    image: "/featuredImgs/workexchange.webp",
    desc: "Collaborate with hosts on farms or boutique stays in exchange for lodging."
  },
  { 
    title: "Digital Nomad Stays", 
    link: "/experiences/digital-nomad-stays",
    image: "/featuredImgs/diginomad.webp ",
    desc: "Co-living spaces with high-speed internet in beautiful remote locations."
  },
  { 
    title: "Cultural Experiences", 
    link: "/experiences/cultural-experiences",
    image: "/featuredImgs/ruralhomestay.webp",
    desc: "Immerse yourself in local culture with authentic village stays."
  },

 
];

export default function FeaturedExperiences() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Featured Experiences</h2>
        <p className="text-center text-gray-600 mt-2">Discover meaningful ways to travel and stay.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {exp.desc}
                </p>

                <Link 
                  href={exp.link}
                  className="inline-flex items-center mt-4 text-blue-600 font-bold hover:text-blue-800 transition-colors"
                >
                  Explore Now <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}