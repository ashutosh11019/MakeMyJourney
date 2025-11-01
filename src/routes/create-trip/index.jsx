import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravellersList, SelectThemeOptions } from '@/constants/options';
import { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/services/AIModel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import LoginDialog from '@/components/custom/LoginDialog';

// CreateTrip Component
const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // seting the values to the form data
  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (err) => console.log(err)
  });

  // Generate Trip
  const OnGenerateTrip = async () => {

    // Check if all the fields are filled
    if (!formData?.location) {
      toast("Please select where you are planning to go.");
      return;
    } else if (isNaN(Number(formData?.noOfDays)) || Number(formData?.noOfDays) > 6 || Number(formData?.noOfDays) < 1) {
      toast("Please select how many days you are planning to go. (up to 6 days)");
      return;
    } else if (!formData?.budget) {
      toast("Please select your budget.");
      return;
    } else if (!formData?.noOfTraveler) {
      toast("Please select the number of travelers.");
      return;
    } else if (!formData?.theme) {
      toast("Please select a theme for your trip.");
      return;
    }

    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replaceAll('{location}', formData?.location?.label)
      .replaceAll('{noOfDays}', formData?.noOfDays)
      .replaceAll('{noOfTraveler}', formData?.noOfTraveler)
      .replaceAll('{budget}', formData?.budget)
      .replaceAll('{theme}', formData?.theme);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      // The .text() method can be empty if the response was blocked or the model returned no text.
      // It will throw an error if the prompt itself was blocked.
      const responseText = result.response.text();

      if (!responseText) {
        toast.error("The AI returned an empty response. This might be due to a safety block. Please try again.");
        console.error("Empty or blocked response from AI:", result.response);
        return;
      }

      await SavePromtResponse(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("An error occurred while generating your trip. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  const SavePromtResponse = async (response) => {
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
    const docId = uuidv4();
    try {
      // The AI response for JSON is often wrapped in ```json ... ```, which needs to be removed before parsing.
      const cleanedResponse = response.replace(/^```json/, '').replace(/```$/, '').trim();
      const tripData = JSON.parse(cleanedResponse);
      await setDoc(doc(db, "AITrips", docId), {
        id: docId,
        userEmail: userEmail,
        userInput: formData,
        tripData: tripData,
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error parsing or saving trip data:", error);
      toast.error("There was an issue processing the AI's response. It might be malformed.");
    }
  }
  // Get User Profile
  const GetUserProfile = (response) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`, {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        Accept: 'application/json',
      }
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('user-changed'));
      OnGenerateTrip();
      setOpenDialog(false);
    })
  }

  return (
    <div>
      <section className="relative h-[500px] flex flex-col justify-center items-center text-white">
        {/* Background Image */}
        <img
          src="/main.jpg"
          alt="Australia Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 -z-10"></div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-2 font-cursive">Let’s Tailor Your Perfect Getaway 🏞️✈️</h1>
        <p className="text-xl md:text-2xl font-semibold mb-8 text-center">Share a few details, and our smart planner will craft a personalized itinerary just for you.</p>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg w-[90%] md:w-[700px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="flex-1">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
              autocompletionRequest={{ types: ['(regions)'] }}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInput('location', v) },
                placeholder: "Enter Your Dream Destination!",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: '#4B5563',
                    fontSize: '1.125rem',
                    lineHeight: '1.75rem',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#4B5563',
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: 'black',
                  }),
                }
              }}
            />
          </div>
        </div>

        {/* Themems */}
        <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 flex overflow-x-auto justify-center gap-6 bg-white rounded-full px-6 py-4 shadow-md w-[90%] md:w-[900px]">
          {SelectThemeOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInput('theme', item.title)}
              className={`flex items-center gap-2 p-2 border rounded-full cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${formData?.theme === item.title ? 'shadow-2xl border-blue-500 bg-blue-50' : 'bg-white'}`}
            >
              <img src={item.img} className="w-10 h-10 rounded-full object-cover" alt="" />
              <span className="text-gray-800 font-semibold">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-32 px-5 mt-24">
        {/* Form Fields */}
        <div className="flex flex-col gap-8">

          {/* Trip Duration */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How Many Days Will Your Adventure Last? 📅</h2>
            <Input 
              placeholder="E.g., 3" 
              type="number" 
              onChange={(e) => handleInput('noOfDays', e.target.value)} 
              className="w-full p-4 text-lg border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Budget */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What’s Your Budget for the Trip? 💰</h2>
            <p className="text-gray-600 mb-6">This budget is for activities, excursions, and experiences throughout your trip.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInput('budget', item.title)}
                  className={`p-6 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${formData?.budget === item.title ? 'shadow-2xl border-blue-500 bg-blue-50' : 'bg-white'}`}
                >
                  <h2 className="text-4xl mb-2">{item.icon}</h2>
                  <h2 className="font-bold text-xl text-gray-800">{item.title}</h2>
                  <h2 className="text-md text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How Many Travelers Will Join You? 🧑‍🤝‍🧑</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {SelectTravellersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInput('noOfTraveler', item.people)}
                  className={`p-6 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${formData?.noOfTraveler === item.people ? 'shadow-2xl border-blue-500 bg-blue-50' : 'bg-white'}`}
                >
                  <h2 className="text-4xl mb-2">{item.icon}</h2>
                  <h2 className="font-bold text-xl text-gray-800">{item.title}</h2>
                  <h2 className="text-md text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-center my-10">
          <Button disabled={loading} onClick={OnGenerateTrip} className="w-full py-3 text-lg bg-[#007aff] text-black rounded-lg hover:bg-[#007aff] transition duration-300">
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                <span>Creating Trip</span>
              </>
            ) : (
              'Create My Itinerary'
            )}
          </Button>
        </div>

        {/* Google Sign In Dialog */}
        <LoginDialog openDialog={openDialog} setOpenDialog={setOpenDialog} login={login} />
      </div>
    </div>
  )

}

export default CreateTrip