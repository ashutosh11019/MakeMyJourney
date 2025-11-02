import React from 'react';
import { Link } from 'react-router-dom';
import { FiCompass, FiArrowRight } from 'react-icons/fi'; // Importing icons

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center gap-10 px-6 sm:px-16 lg:px-32 py-20 min-h-[600px] bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: 'url(/hotel.jpeg)' }}
      aria-label="Hero Section: AI-Powered Travel Planner"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}

      {/* Icon */}
      <div className="relative z-10 text-6xl transition-transform transform hover:scale-110 hover:rotate-12 mb-4">
        <FiCompass />
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-center font-extrabold max-w-4xl mx-auto">
        <span className="text-5xl sm:text-6xl lg:text-7xl leading-tight drop-shadow-lg text-white">
          Your Adventure, Reimagined.
        </span>
        <span className="block mt-4 text-xl sm:text-2xl lg:text-3xl text-gray-200 drop-shadow-md">
          AI-powered itineraries that match your vibe.
        </span>
      </h1>

      {/* Subheading */}
      <p className="relative z-10 text-lg sm:text-xl lg:text-2xl text-center text-gray-100 max-w-2xl mt-4">
        Stop planning, start living. From epic road trips to chill beach getaways, we craft the perfect escape for you.
      </p>

      {/* Call-to-Action */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-8">
        <Link to="/create-trip" aria-label="Create your trip plan">
          <button className="text-lg px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all duration-300 flex items-center gap-2">
            Build Your Dream Trip <FiArrowRight className="text-xl" />
          </button>
        </Link>
        <p className="text-sm text-gray-200">Free, fast, and adventure-ready.</p>
      </div>
    </section>
  );
};

export default Hero;
