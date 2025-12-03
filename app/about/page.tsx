const CompassIcon = () => (
  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9.5a2.5 2.5 0 000-5v-1.5"></path></svg>
);
const TargetIcon = () => (
  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9h-3M12 9v3m0 3v3m0-3h3m-3 0h-3"></path></svg>
);
const PeopleIcon = () => (
  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-5m3-8a3 3 0 10-6 0m6 0a3 3 0 11-6 0M9 16l-1.5 1.5M15 16l1.5 1.5"></path></svg>
);

const problemPoints = [
  "Travelers looking for meaningful experiences",
  "NGOs lacking committed volunteers",
  "Youth struggling with travel cost",
  "Hostels needing creators, workers & guests"
];

const teamMembers = [
  { name: "Aditya (Founder)", role: "Strategy & Expansion" },
  { name: "(Add Name) (Director)", role: "Operations & Partnerships" },
  { name: "(Add Name) (Program Manager)", role: "NGO & Volunteer Relations" },
  { name: "(Add Name) (Tech Lead)", role: "Web & App Development" },
  { name: "(Add Name) (Community Lead)", role: "Creators, Hosts & Travelers" },
];

const AboutUsPage = () => {
  return (


    <div className="pt-20 pb-16 bg-white min-h-screen font-inter">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-20">

        {/* 1. HERO & WHO WE ARE */}
        <section className="text-center py-16 bg-indigo-50 rounded-3xl shadow-2xl shadow-indigo-100">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Redefining Travel in India
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 font-light">
            Nomad Yatri is India’s first purpose-travel ecosystem connecting travelers with meaningful
            experiences across the country. Our focus: ethical travel, volunteering, cultural learning, and affordable exploration.
          </p>
        </section>

        {/* 2. VISION & MISSION */}
        <section className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* Vision Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border-t-4 border-indigo-600 shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <CompassIcon />
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg">
              To redefine Indian travel by making it **purpose-driven, community-led & impact-focused**, setting a new standard for responsible exploration in the subcontinent.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border-t-4 border-emerald-600 shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <TargetIcon />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <ul className="space-y-3 text-gray-600 text-lg list-none pl-0">
              {/* Mission list (using checkmark for premium feel) */}
              {["Supporting local communities", "Helping NGOs & social projects", "Promoting skill exchange", "Building a nationwide youth travel movement"].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-500 mr-2 text-xl font-bold align-top">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. OUR STORY & PROBLEM SOLVED */}
        <section>
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold uppercase tracking-wider">Our Foundation</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">The Gap Nomad Yatri Bridges</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Nomad Yatri was created to solve 4 major problems by connecting hearts, skills, and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problemPoints.map((problem, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl shadow-lg border-l-4 border-gray-300 hover:border-indigo-500 transition duration-300 transform hover:-translate-y-1">
                <span className="text-4xl font-bold text-indigo-700 mb-3 block">{index + 1}.</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {problem.split(' ')[0]} {problem.split(' ')[1]}
                </h3>
                <p className="text-sm text-gray-600">{problem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. OUR TEAM */}
        <section>
          <div className="text-center mb-12">
            <PeopleIcon />
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Meet Our Core Team</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              The leaders driving our mission to create a purpose-travel movement across India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-6 bg-white border border-gray-100 rounded-xl shadow-md">
                <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-600 font-bold text-xl border-4 border-indigo-500">
                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0] || member.name.split(' ')[0][1]}
                </div>
                <h4 className="text-lg font-bold text-gray-900">{member.name.split('(')[0].trim()}</h4>
                <p className="text-sm text-indigo-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;