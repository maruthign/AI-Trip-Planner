// src/create-trip/index.jsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/option';
import { generateFromPrompt } from '@/service/AIModal'; // <<-- updated import
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  // cleans typical LLM wrappers so JSON.parse succeeds
  const cleanModelOutput = (s) => {
    if (!s || typeof s !== 'string') return s;
    let out = s.trim();

    // remove triple backtick fences with optional language identifier
    out = out.replace(/```[\s\S]*?```/g, (match) => {
      // if fence contains JSON inside, return inner JSON, otherwise remove
      const inner = match.replace(/(^```[\w]*\n)|(\n```$)/g, '');
      return inner;
    });

    // remove single backticks
    out = out.replace(/`{1}([^`]+)`{1}/g, '$1');

    // strip leading commentary up to first brace/bracket
    const firstBrace = out.search(/[\{\[]/);
    if (firstBrace > 0) out = out.slice(firstBrace);

    // truncate after last matching brace/bracket (simple heuristic)
    const lastBrace = Math.max(out.lastIndexOf('}'), out.lastIndexOf(']'));
    if (lastBrace !== -1) out = out.slice(0, lastBrace + 1);

    return out.trim();
  };

  const OnGenerateTrip = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        setOpenDialog(true);
        return;
      }

      if (!formData.location || !formData.budget || !formData.traveler || !formData.noOfDays || formData.noOfDays > 10) {
        toast('Please fill all details (noOfDays max 10)');
        return;
      }

      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location?.label)
        .replaceAll('{totalDays}', String(formData?.noOfDays))
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget);

      // Call the updated AIModal helper (uses gemini-2.5-flash)
      const result = await generateFromPrompt(FINAL_PROMPT);

      const rawText = result?.text ?? JSON.stringify(result?.raw ?? '');
      console.log('Model raw text:', rawText);

      const cleaned = cleanModelOutput(rawText);
      console.log('Cleaned model output:', cleaned);

      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        console.error('Failed to parse AI output as JSON', err);
        setLoading(false);
        toast('AI returned invalid JSON. See console for output.');
        return;
      }

      // Save to Firestore
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsed,
        userEmail: user?.email,
        id: docId
      });

      setLoading(false);
      navigate('/view-trip/' + docId);
    } catch (err) {
      console.error('OnGenerateTrip error:', err);
      setLoading(false);
      toast('Unexpected error generating trip. See console.');
    }
  };

  const SaveAiTrip = async (TripData) => {
    // no longer used; kept for compatibility if you need it
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            placeholder={'Ex. 3'}
            type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title && 'shadow-lg border-black'
                }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveler === item.people && 'shadow-lg border-black'
                }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              <img src='/logo.svg' alt='Logo' />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Continue with Google to get started</p>
              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;