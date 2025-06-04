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
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';



const App = () => {
  const {isLoading,authUser}=useAuthUser();
  const isAuthenticated=Boolean(authUser);
  
  const isOnboarded=authUser?.isOnboarded; 
  if(isLoading){
    return <PageLoader/>
  }
  return (
    <div data-theme="forest"> 
      
      <Routes>
        <Route path="/" element={isAuthenticated&&isOnboarded?(<HomePage/>): <Navigate to={isAuthenticated?"/onboarding":"/login"}/>}></Route>
        <Route path="/signup" element={!isAuthenticated?<SignUpPage/>:(isOnboarded?(<HomePage/>):<Navigate to="/onboarding"/>)}></Route>
        <Route path="/login" element={!isAuthenticated?<LoginPage/>:(isOnboarded?(<HomePage/>):<Navigate to="/onboarding"/>)}></Route>
        <Route path="/chat" element={isAuthenticated?(isOnboarded?(<ChatPage/>):<Navigate to="/onboarding"/>): <Navigate to="/login"/>}></Route>
        <Route path="/call" element={isAuthenticated?(isOnboarded?(<CallPage/>):<Navigate to="/onboarding"/>): <Navigate to="/login"/>}></Route>
        <Route path="/notification" element={isAuthenticated?(isOnboarded?(<NotificationPage/>):<Navigate to="onboarding"/>): <Navigate to="/login"/>}></Route>
        <Route path="/onboarding" element={isAuthenticated?(!isOnboarded?<OnBoardingPage/>:<Navigate to="/"/>): (<Navigate to="/login"/>)}></Route>
      </Routes>
      <Toaster/>  
    </div>
  )
}

export default App;
