import React, { useState } from 'react'
import {ShipWheelIcon} from "lucide-react";
import {Link} from 'react-router';
import useSignup from '../hooks/useSignup.js';

const SignUpPage = () => {
  const [signupData,setSignupData]=useState({
    fullName:"",
    email:"",
    password:""
  });
  
const{signupMutation,isPending,error}=useSignup();

  const handleSignup =(e)=>{
    e.preventDefault();
    signupMutation (signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg  overflow-hidden ">

        { /* left side form*/}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/*logo*/}
           <div className="mb-4 flex items-center justify-start gap-3  " >
            <ShipWheelIcon className="size-9  text-primary"/>
            <span className="text-3xl font-bold font-mono  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider "> Chat </span>
           </div>
           {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
           )}
           <div className="w-full ">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                  <div >
                      <h2 className="text-xl font-semibold ">Create an Account</h2>
                      <p className="text-sm opacity-70 ">Join Chat and Start talking to Stranger</p>
                  </div>
                  <div className='space-y-3'>
                      <div className="form-control w-full">
                        <label className='label'>
                          <span className='label-text'>Full Name</span>
                        </label>
                        <input type="text" placeholder= "Kuldeep" className="input input-bordered w-full " value={signupData.fullName} onChange={(e)=>setSignupData({...signupData,fullName: e.target.value})} required />
                      </div>
                  </div>
                  <div className='space-y-3'>
                      <div className="form-control w-full">
                        <label className='label'>
                          <span className='label-text'>Email </span>
                        </label>
                        <input type="email" placeholder= "kuldeep@gmail.com" className="input input-bordered w-full " value={signupData.email} onChange={(e)=>setSignupData({...signupData,email : e.target.value})} required />
                      </div>
                  </div>
                  <div className='space-y-3'>
                      <div className="form-control w-full">
                        <label className='label'>
                          <span className='label-text'>Password  </span>
                        </label>
                        <input type="password" placeholder= "********" className="input input-bordered w-full " value={signupData.password} onChange={(e)=>setSignupData({...signupData,password : e.target.value})} required />
                      </div>
                      <p className="text-sm opacity-60 m-1 ">Password must be 6 Characters Long</p>
                  </div>

                  <div className="form-control">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-sm leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">terms of service</span> and{" "}
                      <span className="text-primary hover:underline">privacy policy</span>
                    </span>
                  </div>
                        
                        
                </div>
                <button className='btn btn-primary w-full' type='submit '>{isPending?(
                  <>
                  <span className='loading loading-spinner loading-xs'>
                    Loading..
                  </span>
                  </>
                ):(<>
                Create Account
                </>)}</button>

                <div className='text-center mt-4'>
                    <p className='text-sm gap-2'>
                      Already having a Account?
                      <Link to="/login" className='text-primary hover:underline ml-1.5'>
                        Login
                      </Link>
                    </p>

                </div>
              </div>
            </form>

           </div>
        </div>
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          <div className='relative aspect-square max-w-sm ms-auto'>
            <img src='/i.png' alt="Chating website illustration " className='w-full h-full'/>
          </div>
          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'> Connect with anyone worldwide</h2>
            <p className='opacity-70'>
              talk with strangers and enjoy your conversation
            </p>

          </div>
        </div>
        </div>
     </div>
      
    </div>
  )
}

export default SignUpPage;
