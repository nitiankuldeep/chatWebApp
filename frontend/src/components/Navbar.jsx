 import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation,Link } from 'react-router';
import useLogout from '../hooks/useLogout';

import PageLoader from './PageLoader';
import { ShipWheelIcon,BellIcon, LogOutIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useState ,useEffect} from 'react';
 
 const Navbar = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1018);
    const {authUser}=useAuthUser();
    const location=useLocation();
    const isChatPage=location?.pathname?.startsWith("/chat")||location?.pathname?.startsWith("/group-chat");
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1018);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    
    const {logoutMutation,isLoading}=useLogout();
    if(isLoading){ 
        return <PageLoader/>;
    }
   return (
     <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center '>
       <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-end  w-full'>
            {(isChatPage||isSmallScreen)&&(<div className='pl-5'>
                <Link to="/" className='flex items-center gap-2.5'>
                    <ShipWheelIcon className="size-9  text-primary"/>
                    <span className="text-3xl font-bold font-mono  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider "> Chat </span>
                 </Link>
            </div>)}
            <div className='flex items-center p-2  gap-5 sm:gap-4 ml-auto '>
            <Link to ="/notification" className='size-5 text-base-content opacity-70'>
                <BellIcon/>
            </Link>
            </div>
            <ThemeSelector/>
            <div className='avatar'>
            <div className='w-9 rounded-full'>
            <img src={authUser?.profilePic} alt='User Avatar' rel='noreferrer'/>
            </div>
            </div>
            <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
            <LogOutIcon className='size-6 text-base-content opacity-70'/></button>
          
        </div>
       </div> 
     </nav>
   )
 }
 
 export default Navbar
 