
const ClockIcon = () => (
  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const HomeIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
);
const FoodIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19v-5l7-3 7 3v5H5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9l7-3 7 3M5 9l2-2m-2 2l-2-2m7-3l2-2m-2 2l-2-2m-7 3l-2-2m2 2l2-2M12 18v3m-3-3h6m-3 0V15m-3 0h6"></path></svg>
);
const LightbulbIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
);
const AudienceIcon = () => (
  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 4.354v-1.5M12 9.646v1.5M18.835 15.659a4.842 4.842 0 00-1.897-.934M19.1 19l.775-.775M5.9 19l-.775-.775M12 11.25c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5z"></path></svg>
);

const benefits = [
  { title: "Free Stay", description: "Receive complimentary accommodation at hostels, homestays, or communities across India.", icon: HomeIcon, color: "text-emerald-600" },
  { title: "Free Meals", description: "Enjoy free daily meals provided by your host, drastically cutting down your travel budget.", icon: FoodIcon, color: "text-emerald-600" },
  { title: "Local Immersion", description: "Gain genuine local experience by living and working directly within the community.", icon: LightbulbIcon, color: "text-emerald-600" },
  { title: "New Skills", description: "Acquire new skills in areas like content creation, gardening, social media management, and more.", icon: LightbulbIcon, color: "text-emerald-600" },
];

const audience = [
  { name: "Creators", description: "Trade photography, video, or writing skills for stay.", icon: "🎥" },
  { name: "Budget Travelers", description: "Reduce expenses significantly by eliminating accommodation costs.", icon: "💰" },
  { name: "Students", description: "Gain practical experience and life skills during breaks.", icon: "🎓" },
  { name: "Digital Nomads", description: "Find unique, long-term working spots with community benefits.", icon: "💻" },
];

const WorkexchangePage = () => {
  return (
    <div className="pt-20 pb-16 bg-white min-h-screen font-inter">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-20">

        <section className="text-center py-16 bg-indigo-50 rounded-3xl shadow-2xl shadow-indigo-100">
          <p className="text-indigo-600 font-bold uppercase tracking-widest mb-3">WORK EXCHANGE PROGRAMS</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Travel Longer, Pay Less.
          </h1>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 p-4">

            <p className="text-xl sm:text-2xl font-light text-gray-600 sm:border-r sm:pr-6">
              What is Work Exchange?
            </p>

            <div className="flex items-center gap-3">
              <ClockIcon />
              <p className="text-2xl font-semibold text-gray-800">
                Work 3–4 hours a day
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <p className="text-emerald-600 font-semibold uppercase tracking-wider">The Exchange</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">What You Gain</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
              Trade your skills and time for valuable resources and genuine cultural immersion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="p-8 bg-white rounded-xl shadow-lg border-b-4 border-emerald-300 hover:border-emerald-600 transition duration-300 transform hover:-translate-y-1">
                  <div className="mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-gray-50 py-16 rounded-2xl">
          <div className="text-center mb-12">
            <AudienceIcon />
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Perfect For</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
              Work exchange is an ideal model for travelers who prioritize experience and community over cost.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {audience.map((person, index) => (
              <div key={index} className="text-center p-6 bg-white border border-gray-100 rounded-xl shadow-md transform hover:shadow-xl transition duration-300">
                <span className="text-4xl block mb-3" role="img" aria-label={person.name}>
                  {person.icon}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h4>
                <p className="text-sm text-gray-500">{person.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default WorkexchangePage;