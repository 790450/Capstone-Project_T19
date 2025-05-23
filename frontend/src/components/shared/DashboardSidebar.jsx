import { signOutsucess } from '@/redux/user/userSlice';
import React from 'react'
import { FaBell, FaFileAlt, FaHistory, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';

const DashboardSidebar = () => {

const [searchParams] = useSearchParams();
const tab = searchParams.get('tab');


const dispatch = useDispatch()
const handleSignout = async() =>{
    try {
      const res = await fetch("/api/user/signout", {
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
    <aside className='h-screen w-64 bg-slate-200 text-slate-800 fles flex-col'>
      {/* logo section */}
        <div className='p-4 flex items-center justify-center bg-slate-200'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
        </div>


        <nav className='flex-1 p-4'>
          <ul className='space-y-4'>
            <li>
              <Link 
                to={"/dashboard?tab=profile"} 
                className='flex items-center p-2 hover:bg-slate-300 rounded'
              >
                <FaUserAlt className='mr-3' />
                <span>Profile</span>
              </Link>

              
            </li>
          </ul>

          <div className='p-4 border-t border-gray-700'>
            <button className='flex items-center w-full p-2 hover:bg-slate-300 rounded' onClick={handleSignout}>
               <FaSignOutAlt className='mr-3' />
               <span>Logout</span>
            </button>

            <Link to="/dashboard?tab=alerts" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded" >
                  <FaBell />
                  <span>Alerts</span> 
            </Link>

            <Link to="?tab=personalized" className="p-2  rounded  flex items-center gap-3   hover:bg-gray-200" >
                     <FaFileAlt/>
                     <span>Personalized News</span>

            </Link>

            <Link 
               to="/dashboard?tab=history" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded">
               <FaHistory />
                <span>Alert History</span>

            </Link>

         

          </div>

        </nav>

    </aside>
  )
}

export default DashboardSidebar