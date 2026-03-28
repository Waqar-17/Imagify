import React, { useContext, useState, useEffect, useRef } from 'react'
import {assets} from '../assets/assets'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const {user,setShowLogin,credit,logout} = useContext(AppContext);
 
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className='flex items-center justify-between py-4 sticky top-0 z-50 bg-white/60 backdrop-blur-lg border-b border-transparent transition-all'
    >
      <Link to='/'>
      <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/>
      </Link>
    
      <div>
        {
          user 
          ?
          <div className='flex items-center gap-2 sm:gap-3'>
            <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 
            transition-all duration-700'>
              <img className='w-5' src={assets.credit_star} alt="" />
              <p className='text:xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
            </button>

            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
            <div className='relative group' ref={dropdownRef}>
              <img onClick={() => setShowDropdown(!showDropdown)} src={assets.profile_icon} className='w-10 drop-shadow cursor-pointer' alt="" />
            <div className={`absolute top-0 right-0 z-10 text-black rounded pt-12 ${showDropdown ? 'block' : 'hidden'} group-hover:block`}>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                  <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                </ul>
            </div>
            </div>
          </div>
          :
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
            <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>Login</button>
          </div>
          
        }
        
      </div>

    </motion.div>
  )
}

export default Navbar
