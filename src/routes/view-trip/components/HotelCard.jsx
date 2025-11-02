import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlacesDetails } from '@/services/GlobalAPI';
import React, { useEffect } from 'react'
import { PiMoneyWavyDuotone, PiMapPinLineDuotone, PiStarDuotone } from "react-icons/pi";

const HotelCard = ({ hotel }) => {
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const [PhotoURL, setPhotoURL] = React.useState('');
    const GetPlacePhoto = async () => {
        const query = {
            textQuery: hotel?.name + ', ' + hotel?.address
        }

        try {
            const response = await GetPlacesDetails(query);
            console.log(response.data);
            const photos = response.data?.places[0]?.photos;
            setPhotoURL(PHOTO_REF_URL.replace('{placeName}', photos[0]?.name));
        } catch (error) {
            setPhotoURL('/hotel.jpeg');
        }
    }
    return (
        <div className="mt-4 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer shadow-lg rounded-xl p-4 hover:shadow-2xl border">
            <img src={PhotoURL} className="rounded-xl h-56 w-full object-cover" alt={hotel?.name} />
            <div className="flex flex-col mt-3">
                <h2 className="font-semibold text-xl text-gray-800 truncate">{hotel?.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{hotel?.description}</p>

                <div className="flex flex-row gap-3 items-center justify-between mt-3">
                    <div className="flex flex-row gap-2 items-center w-4/6">
                        <PiMapPinLineDuotone className="size-4 flex-none text-red-500" />
                        <p className="text-xs text-gray-500 line-clamp-2">{hotel?.address}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <PiStarDuotone className="size-4 flex-none text-yellow-500" />
                        <p className="text-xs text-gray-500">{hotel?.rating}</p>
                    </div>
                </div>

                <div className="flex flex-row gap-2 items-center mt-3">
                    <PiMoneyWavyDuotone className="size-4 flex-none text-green-500" />
                    <p className="text-xs text-gray-500">{hotel?.price}</p>
                </div>
            </div>
        </div>
    );
}

export default HotelCard