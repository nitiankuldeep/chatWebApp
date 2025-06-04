import React, { useState } from 'react'
import  useAuthUser  from '../hooks/useAuthUser.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader.jsx';
import { CameraIcon, Loader2, LoaderIcon, MapIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants/index.js';


const  OnBoardingPage = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const {isLoading,authUser}=useAuthUser();

  const queryClient=useQueryClient();
  const[formState,setFormState]=useState({
    fullName:authUser?.fullName||"",
    bio:authUser?.bio||"",
    learningLanguage:authUser?.learningLanguage||"",
    nativeLanguage:authUser?.nativeLanguage||"",
    location:authUser?.location||"",
    profilePic:authUser?.profilePic||""
  });
  const {mutate:onboardingMutation,isPending,}=   useMutation({
    mutationFn: completeOnboarding,
    onSuccess:()=>{
      toast.success("Onboarding Completed");
      queryClient.invalidateQueries({queryKey:["authUser"]});
    },
    onError:(error)=>{
      toast.error(error.response.data.message);
    },
  })
  const handleSubmit=(e)=>{
    e.preventDefault();
    onboardingMutation(formState);
    
  }
  if(isLoading){
    return <PageLoader/>
  }

  const handleRandomAvatar  =()=>{
    const indx=Math.floor(Math.random()*100)+1;
    const random =`http://avatar.iran.liara.run/public/${indx}.png`
    setFormState({...formState,profilePic:random});
    toast.success("Random Profile Pic Generated");
    setImgLoaded(false);

  }
  
  return (
    <div className=' min-h-screen bg-base-100 flex items-center  justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl '>
        <div className='card-body p-6 sm:p-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 '> Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className="size-32 rounded-full bg-base-300 overflow-hidden relative">
                {formState.profilePic ? (
                  <>
                    {!imgLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-base-300">
                        <Loader2 className="animate-spin size-8 text-base-content opacity-50" />
                      </div>
                    )}
                    <img
                      src={formState.profilePic}
                      alt="Your profile pic"
                      onLoad={() => setImgLoaded(true)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imgLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2'/>
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input
                type="text"
                name='fullName'
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className='input input-bordered w-full'
                placeholder='Your Full Name'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className='textarea textarea-bordered h-24'
                placeholder='Tell others about yourself'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">Select your Native Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">Select a Language You’re Learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learn-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/4  trasnform-translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
              <input
                type="text"
                name='location'
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className='input input-bordered w-full pl-10'
                placeholder='City, Country'
              />
              </div>
            </div>

            <button className='btn btn-primary w-full' disabled={isPending} type='submit '>{isPending?(
                  <>
                 
                  <LoaderIcon className='animate-spin size-5 mr-2'/>
                    Onboarding..
                  
                  </>
                ):(<>
                 <ShipWheelIcon className='size-5 mr-2'/> 
                Complete Onboarding
                </>)}</button>
          </form>

        </div>
      </div>
      
    </div>
  )
}

export default  OnBoardingPage;
