import React, { useState, useEffect } from 'react';
import { FiCompass } from 'react-icons/fi';

const messages = [
  "Crafting your adventure...",
  "Plotting the perfect course...",
  "Discovering hidden gems for you...",
  "Packing the best spots into your itinerary...",
  "Consulting our travel experts (the AI)...",
];

const TripGenerationLoader = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
      <div className="relative flex justify-center items-center mb-6">
        {/* Spinning compass */}
        <FiCompass className="text-white text-8xl animate-spin-slow" />
        {/* Pulsing dot in the middle */}
        <div className="absolute w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      <p className="text-white text-xl font-semibold text-center transition-opacity duration-500 ease-in-out">{message}</p>
    </div>
  );
};

export default TripGenerationLoader;
