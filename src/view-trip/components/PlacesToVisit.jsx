import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className='mt-5'>

            <h2 className='font-medium text-lg'>Day {item.day}</h2>
            <div className='border-l-4 border-orange-300 ml-4 pl-6 relative'>
              {item.plan.map((place, index) => (
                <div key={index} className='mb-8 relative'>
                  <div className='absolute -left-[37px] top-0 w-4 h-4 bg-orange-500 rounded-full ring-4 ring-white'></div>
                  <h2 className='font-bold text-sm text-orange-600 mb-2'>{place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PlacesToVisit
