import { signOutsucess } from '@/redux/user/userSlice'
import React from 'react'
import { FaBell, FaFileAlt, FaHistory, FaHome, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const BottomNavBar = () => {
const dispatch = useDispatch()

const handleSignout = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signout`, {
        method: "POST",
      })

      const data = await res.json()

      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signOutsucess())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 p-1 flex justify-between text-xs text-center'>
      <Link to="/" className='flex-1 flex flex-col items-center justify-center'>
        <FaHome size={18} />
        <span>Home</span>
      </Link>

      <Link to="/dashboard?tab=profile" className='flex-1 flex flex-col items-center justify-center'>
        <FaUserAlt size={18} />
        <span>Profile</span>
      </Link>

      <button className='flex-1 flex flex-col items-center justify-center' onClick={handleSignout}>
        <FaSignOutAlt size={18} />
        <span>Logout</span>
      </button>

      <Link to="/dashboard?tab=alerts" className='flex-1 flex flex-col items-center justify-center'>
        <FaBell size={18} />
        <span>Alerts</span>
      </Link>

      <Link to="/dashboard?tab=personalized" className='flex-1 flex flex-col items-center justify-center'>
        <FaFileAlt size={18} />
        <span>News</span>
      </Link>

      <Link to="/dashboard?tab=history" className='flex-1 flex flex-col items-center justify-center'>
        <FaHistory size={18} />
        <span>History</span>
      </Link>
    </nav>
  );
};

export default BottomNavBar;