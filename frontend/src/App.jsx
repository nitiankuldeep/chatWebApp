import React from 'react'
import { Navigate, Route,Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import OnBoardingPage from './pages/OnBoardingPage.jsx';
import CallPage from './pages/CallPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx'; 

import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {axiosInstance} from './lib/axios.js'



const App = () => {

  const{data:authData }=useQuery({
    queryKey : ["authUser"],
    queryFn : async() => {
      const res=await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false
    
  });
  const authUser=authData?.user;
  console.log(authUser)
  return (
    <div data-theme="forest">
      
      <Routes>
        <Route path="/" element={authUser?<HomePage/>: <Navigate to="/login"/>}></Route>
        <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to ="/"/>}></Route>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to ="/"/>}></Route>
        <Route path="/chat" element={authUser?<ChatPage/>: <Navigate to="/login"/>}></Route>
        <Route path="/call" element={authUser?<CallPage/>: <Navigate to="/login"/>}></Route>
        <Route path="/notification" element={authUser?<NotificationPage/>: <Navigate to="/login"/>}></Route>
        <Route path="/onboarding" element={authUser?<OnBoardingPage/>: <Navigate to="/login"/>}></Route>
      </Routes>

      <Toaster/>  
    </div>
  )
}

export default App;
