import { Button } from '@/components/ui/button';
import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlacesDetails } from '@/services/GlobalAPI';
import React, { useEffect } from 'react'
import { FaShareAlt } from "react-icons/fa";
import { PiCalendarDotsDuotone, PiMoneyWavyDuotone, PiPersonDuotone, PiPaletteDuotone, PiUsersThreeDuotone } from "react-icons/pi";


const Information = ({ tripInfo }) => {
    const [PhotoURL, setPhotoURL] = React.useState('');
    const GetPlacePhoto = async () => {
        const query = {
            textQuery: tripInfo?.userInput?.location?.label + ' '
        }

        try {
            const response = await GetPlacesDetails(query);
            setPhotoURL(PHOTO_REF_URL.replace('{placeName}', response.data?.places[0]?.photos[0]?.name));
        } catch (error) {
            console.error('Error fetching place photo:', error);
        }
    }

    useEffect(() => {
        tripInfo && GetPlacePhoto();
    }, [tripInfo]);

    return (
        <div>
            <img
                src={PhotoURL}
                className="h-[200px] sm:h-[300px] w-full object-cover rounded-xl"
                alt="Destination"
            />
            <div className="my-6 flex flex-col gap-6">
                {/* Trip Title */}
                <div className="flex justify-between items-start">
                    <h2 className="font-bold text-3xl sm:text-4xl text-gray-800">
                        {tripInfo?.userInput?.location?.label}
                    </h2>
                </div>

                {/* Info Cards */}
                <div className="flex gap-4 flex-row flex-wrap text-sm sm:text-base">
                    {/* Days Card */}
                    <div className="p-3 px-6 bg-gray-50 text-gray-600 rounded-2xl border-2 flex items-center gap-3 hover:scale-105 transition duration-200 cursor-pointer">
                        <PiCalendarDotsDuotone className="size-5 flex-none text-purple-500" />
                        <p>{tripInfo?.userInput?.noOfDays} Days</p>
                    </div>

                    {/* Travelers Card */}
                    <div className="p-3 px-6 bg-gray-50 text-gray-600 rounded-2xl border-2 flex items-center gap-3 hover:scale-105 transition duration-200 cursor-pointer">
                        <PiPersonDuotone className="size-5 flex-none text-teal-500" />
                        <p>{tripInfo?.userInput?.noOfTraveler} {tripInfo?.userInput?.noOfTraveler == 1 ? 'Person' : 'Persons'}</p>
                    </div>

                    {/* Traveler Type Card */}
                    {tripInfo?.userInput?.traveler?.title && <div className="p-3 px-6 bg-gray-50 text-gray-600 rounded-2xl border-2 flex items-center gap-3 hover:scale-105 transition duration-200 cursor-pointer">
                        <PiUsersThreeDuotone className="size-5 flex-none text-blue-500" />
                        <p>{tripInfo?.userInput?.traveler?.title}</p>
                    </div>}

                    {/* Budget Card */}
                    <div className="p-3 px-6 bg-gray-50 text-gray-600 rounded-2xl border-2 flex items-center gap-3 hover:scale-105 transition duration-200 cursor-pointer">
                        <PiMoneyWavyDuotone className="size-5 flex-none text-green-500" />
                        <p>{tripInfo?.userInput?.budget} Budget</p>
                    </div>

                    {/* theme Card */}
                    <div className="p-3 px-6 bg-gray-50 text-gray-600 rounded-2xl border-2 flex items-center gap-3 hover:scale-105 transition duration-200 cursor-pointer">
                        <PiPaletteDuotone className="size-5 flex-none text-orange-500" />
                        <p>{tripInfo?.userInput?.theme}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information