import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getFileURL } from '@/lib/appwrite/uploadImage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutsucess } from '@/redux/user/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [profileUrl, setProfileUrl] = useState('/default-profile.png');

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (currentUser?.profilePicture) {
        const url = await getFileURL(currentUser.profilePicture);
        if (url) setProfileUrl(url);
      }
    };
    fetchProfileImage();
  }, [currentUser]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signout`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutsucess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='shadow-lg sticky'>
      <div className='flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto p-4'>
        <Link to={"/"}>
          <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap'>
            <span className='text-slate-500'>News</span>
            <span className='text-slate-900'>Hunt</span>
          </h1>
        </Link>

        <form className="p-3 bg-slate-100 rounded-lg flex items-center">
          <input type='text' placeholder='Search..' className='focus:outline-none bg-transparent w-24 sm:w-64 ' />
          <button>
            <FaSearch className='text-slate-600'/>
          </button>
        </form>

        <ul className='flex gap-6'>
          <Link to={"/"}><li className='hidden lg:inline text-slate-700 hover:underline'>Home</li></Link>
          <Link to={"/about"}><li className='hidden lg:inline text-slate-700 hover:underline'>About</li></Link>
          <Link to={"/news"}><li className='hidden lg:inline text-slate-700 hover:underline'>News Articles</li></Link>
        </ul>

        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
             
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-400"/>
              <DropdownMenuItem className="block font-semibold mt-2">
                <div className='flex flex-col gap-1'>
                  <span>@{currentUser.username}</span>
                  <span>@{currentUser.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="block font-semibold mt-2">
                <Link to="/dashboard?tab=profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold text-sm mt-2" onClick={handleSignout}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to={"/sign-in"}><Button>Sign In</Button></Link>
        )}
      </div>
    </header>
  );
};

export default Header;




/*<img
                src={profileUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onError={(e) => { e.target.src = '/default-profile.png'; }}
              />*/