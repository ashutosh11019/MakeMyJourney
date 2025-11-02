import React from 'react'
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';



const Hotels = ({ tripInfo }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {tripInfo?.tripData?.hotels?.map((hotel, key) => (
          <Link
            key={key}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
            target="_blank"
          >
            <HotelCard hotel={hotel} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels