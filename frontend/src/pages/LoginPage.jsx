import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {login} from "../lib/api.js"
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router';
import useLogin from '../hooks/useLogin.js';

const LoginPage = () => {
  const[loginData,setLoginData]=useState({
    email:"",
    password:""
  });
  
  const {loginMutate,isPending,error}=useLogin();

  const handleLogin=(e)=>{
    e.preventDefault();
    loginMutate(loginData);
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg  overflow-hidden'>
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      <div className='mb-4 flex items-center justify-start gap-2'>
        <ShipWheelIcon className='size-9 text-primary'/>
        <span className="text-3xl font-bold font-mono  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider "> Chat </span>
      </div>
      {error&&(<div className='alert alert-error mb-4'>
          <span>{error.response.data.message}</span>
      </div>)}
      <div className='w-full'>
        <form onSubmit={handleLogin}>
           <div className=' space-y-4'>
            <div>
              <h2 className='text-xl font-semibold'>Welcome Back</h2>
              <p className='text-sm opacity-65'>Login To Your Account to Continue</p>
            </div>
           </div>
          
           <div className='flex flex-col gap-3 pt-2'>
           <div className="form-control w-full space-y-3">
              <label className='label'>
              <span className='label-text pt-3 opacity-80'>Email </span>
              </label>
              <input type="email" placeholder= "kuldeep@gmail.com" className="input input-bordered w-full " value={loginData.email} onChange={(e)=>setLoginData({...loginData,email : e.target.value})} required />
              </div>
              <div className='space-y-3'>
                      <div className="form-control w-full space-y-3">
                        <label className='label'>
                          <span className='label-text  opacity-80'>Password  </span>
                        </label>
                        <input type="password" placeholder= "********" className="input input-bordered w-full " value={loginData.password} onChange={(e)=>setLoginData({...loginData,password : e.target.value})} required />
                      </div>
                      
              </div>
              <button className='btn btn-primary w-full' type='submit '>{isPending?(
                  <>
                  <span className='loading loading-spinner loading-xs'>
                    Login. ..
                  </span>
                  </>
                ):(<>
                Login Account
                </>)}</button>

                <div className='text-center mt-4'>
                    <p className='text-sm gap-2'>
                     New To Chat ?
                      <Link to="/signup" className='text-primary hover:underline ml-1.5'>
                        Create Account
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

export default LoginPage
