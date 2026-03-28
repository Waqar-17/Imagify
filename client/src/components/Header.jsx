import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { delay } from 'motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

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
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}

    >
      <motion.div className='text-purple-600 inline-flex items-center gap-2 bg-purple-50 px-6 py-2 rounded-full border border-purple-200 shadow-sm'
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      transition={{delay:0.2,duration:0.8}}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1 
        initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.3, duration:0.6}}
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center tracking-tight font-bold text-gray-900'>
        Turn text to <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>image</span>, in seconds.
      </motion.h1>

      <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</p>

      <motion.button 
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
        onClick={onClickHandler} 
        className='sm:text-lg text-white bg-gray-900 shadow-xl shadow-purple-200 w-auto mt-8 px-12 py-3.5 flex items-center gap-2 rounded-full cursor-pointer transition-shadow hover:shadow-purple-300'>
        Generate Images
        <img className='h-6' src={assets.star_group} alt="" />
      </motion.button>

      <motion.div 
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
        className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(6).fill('').map((item,index)=>(
            <motion.img 
             whileHover={{ scale: 1.1, rotate: 2 }}
             className='rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer max-sm:w-10 ring-1 ring-black/5'
             src={index % 2 ==0 ? assets.sample_img_2 : assets.sample_img_1} 
              key={index} width={70}/>
        ))}
      </motion.div>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} className='mt-2 text-neutral-500 text-sm'>Generate images from imagify</motion.p>
    </motion.div>
  )
}

export default Header
