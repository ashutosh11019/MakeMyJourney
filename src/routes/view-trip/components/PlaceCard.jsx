import { PHOTO_REF_URL, PHOTO_REF_URL_LOW_QUAL } from '@/constants/options';
import { GetPlacesDetails } from '@/services/GlobalAPI';
import React, { useEffect } from 'react'
import { FaBus, FaCar } from 'react-icons/fa';
import { PiTimerDuotone, PiHourglassDuotone, PiMoneyWavyDuotone } from "react-icons/pi";

const PlaceCard = ({ itinerary, tripInfo }) => {
    const [PhotoURL, setPhotoURL] = React.useState('');
    
    const GetPlacePhoto = async () => {
        const query = {
            textQuery: itinerary?.place + ', ' + tripInfo?.userInput?.location.label
        }

        try {
            const response = await GetPlacesDetails(query);
            const photos = response.data?.places[0]?.photos;
            setPhotoURL(PHOTO_REF_URL_LOW_QUAL.replace('{placeName}', photos[0]?.name));
        } catch (error) {
            setPhotoURL('/placeholder.jpg');
        }
    }

    useEffect(() => {
        itinerary && GetPlacePhoto();
    }, [itinerary]);
    
    return (
        <div className="bg-white rounded-xl sm:hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-2xl border flex flex-col h-full">
          <div className="p-3 flex gap-2 items-center">
            {/* Image */}
            <img
              src={PhotoURL}
              alt={itinerary?.place}
              className="w-28 h-28 flex-none rounded-lg object-cover"
            />
        
            {/* Content */}
            <div className="flex flex-col flex-grow pl-1">
              {/* Place Name */}
              <h2 className="font-semibold text-lg">{itinerary?.place}</h2>
        
              {/* Details */}
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                {itinerary?.details || 'No additional details provided.'}
              </p>
        
              {/* Additional Information */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <PiTimerDuotone className="size-4 text-yellow-500 flex-none" />
                  <p className="text-sm text-gray-500 line-clamp-1">{itinerary?.best_to_visit || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PiHourglassDuotone className="size-4 text-blue-500 flex-none" />
                  <p className="text-sm text-gray-500 line-clamp-1">{itinerary?.time_to_explore || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PiMoneyWavyDuotone className="size-4 text-green-500 flex-none" />
                  <p className="text-sm text-gray-500 line-clamp-1">{itinerary?.ticket_pricing || 'Free'}</p>
                </div>
              </div>
            </div>
          </div>
          {itinerary.travelCost && (
              <div className="mt-auto p-3 bg-gray-50 rounded-b-xl border-t">
                  <h4 className="text-sm font-semibold mb-2 text-gray-600">Estimated Travel Cost:</h4>
                  <div className="flex justify-around text-sm">
                      <div className="flex items-center gap-2"><FaCar className="text-gray-500" /> Cab: {itinerary.travelCost.cab}</div>
                      <div className="flex items-center gap-2"><FaBus className="text-gray-500" /> Bus: {itinerary.travelCost.bus}</div>
                  </div>
              </div>
          )}
        </div>
      );
      
      
}

export default PlaceCard