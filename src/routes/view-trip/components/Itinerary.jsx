import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PlaceCard from './PlaceCard';
import { Link } from 'react-router-dom';

const Itinerary = ({ tripInfo }) => {
    const numberOfDays = tripInfo?.userInput?.noOfDays;
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold mt-8 mb-2'>Places to Visit</h2>
                {numberOfDays && <p className='text-lg font-medium'>{numberOfDays} {numberOfDays > 1 ? 'Days' : 'Day'}</p>}
            </div>
            {tripInfo?.tripData?.itinerary?.map((itineraryDay, key) => (
                // console.log(itineraryDay),
                <div key={key}>
                    <Accordion type="single" collapsible defaultValue={1}>
                        <AccordionItem value={itineraryDay?.day}>
                            <AccordionTrigger className='text-lg font-medium9'>Day {itineraryDay?.day}</AccordionTrigger>
                            <AccordionContent className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:px-4 pt-4'>
                                {itineraryDay?.plan?.map((itineraryItem, index) => (
                                    <div key={index}>
                                        <Link to={`https://www.google.com/maps/search/?api=1&query=${itineraryItem?.place}, ${tripInfo?.userInput?.location.label}`} target='_blank'>
                                        <PlaceCard itinerary={itineraryItem} tripInfo={tripInfo} />
                                        </Link>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>

    )
}

export default Itinerary
