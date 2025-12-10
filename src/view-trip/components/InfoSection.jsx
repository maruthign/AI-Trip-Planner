import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  const shareTrip = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast('Link copied to clipboard!');
    })
  }

  return (
    <div>
      <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-orange-100 rounded-full text-orange-600 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-green-100 rounded-full text-green-600 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-blue-100 rounded-full text-blue-600 text-xs md:text-md'>👤 No. Of Traveler: {trip?.userSelection?.traveler} </h2>
          </div>
        </div>
        <Button onClick={shareTrip}><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection
