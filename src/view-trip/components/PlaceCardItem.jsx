import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.place_name
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +
      (place?.geo_coordinates ? place.geo_coordinates.latitude + ',' + place.geo_coordinates.longitude : place?.place_name)} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 
    hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl ? photoUrl : '/placeholder.jpg'}
          className='w-[130px] h-[130px] rounded-xl object-cover'
        />
        <div>
          <h2 className='text-lg font-bold'>{place.place_name}</h2>
          <p className='text-sm text-gray-400'>{place.place_details}</p>
          <div className='flex gap-2 items-center mt-2'>
            <h2 className='text-xs md:text-sm text-blue-500'>🎟️ {place.ticket_pricing}</h2>
            <h2 className='text-xs md:text-sm text-orange-500'>🕙 {place.time_to_travel}</h2>
          </div>
          {/*<Button size='sm'><FaMapLocationDot /></Button>*/}
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
