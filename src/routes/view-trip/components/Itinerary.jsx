import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PlaceCard from './PlaceCard';
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';

const Itinerary = ({ tripInfo }) => {
    return (
        <div>
            <h2 className='text-2xl font-bold mt-8 mb-2'>Places to Visit</h2>
            {tripInfo?.tripData?.itinerary?.map((itineraryDay, key) => (
                <div key={key}>
                    <Accordion type="single" collapsible defaultValue={`day-${itineraryDay?.day}`}>
                        <AccordionItem value={itineraryDay?.day}>
                            <AccordionTrigger className='text-lg font-medium9'>Day {itineraryDay?.day}</AccordionTrigger>
                            <AccordionContent className='sm:px-4 pt-4'>
                                <div>
                                    <h3 className="font-bold text-xl mb-3">Daily Plan</h3>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {itineraryDay?.plan?.map((itineraryItem, placeIndex) => (
                                            <Link to={`https://www.google.com/maps/search/?api=1&query=${itineraryItem?.place}, ${tripInfo?.userInput?.location.label}`} target='_blank' className="block h-full" key={placeIndex}>
                                                <PlaceCard itinerary={itineraryItem} tripInfo={tripInfo} />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {itineraryDay?.hotels && (
                                    <div className="mt-8">
                                        <h3 className="font-bold text-xl mb-3">Hotel Suggestions for Day {itineraryDay.day}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {itineraryDay.hotels.map((hotel, hotelIndex) => (
                                                <HotelCard hotel={hotel} key={hotelIndex} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>

    )
}

export default Itinerary