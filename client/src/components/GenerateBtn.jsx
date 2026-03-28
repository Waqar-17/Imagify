import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const GenerateBtn = () => {

  const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate();

  const onClickHandler = () =>{
    if(user){
      navigate('/result')
    }
    else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='pb-16 text-center'
    >
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
        See the magic. <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>Try now.</span>
      </h1>

      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        onClick={onClickHandler} 
        className='inline-flex items-center gap-2 px-12 py-3.5 
        rounded-full bg-gray-900 border border-gray-700 shadow-xl shadow-purple-200 text-white m-auto transition-shadow hover:shadow-purple-300 cursor-pointer'>
        Generate Images
        <img src={assets.star_group} alt="" className='h-6'/>
      </motion.button>
    </motion.div>
  )
}

export default GenerateBtn
