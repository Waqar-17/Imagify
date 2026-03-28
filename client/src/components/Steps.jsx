import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'motion/react'

const Steps = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='flex flex-col items-center justify-center my-32'
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
      <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>
      
      <div className='space-y-4 w-full max-w-3xl text-sm'>
          {stepsData.map((item,index)=>(
              <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.15)' }}
              className='flex items-center gap-4 p-5 px-8 bg-white/40 backdrop-blur-sm shadow-md border border-neutral-200/50 cursor-pointer rounded-xl'>
                <div className="bg-purple-100/50 p-2 rounded-lg">
                  <img src={item.icon} alt="" />
                </div>
                <div>
                    <h2 className='text-xl font-medium text-gray-800'>{item.title}</h2>
                    <p className='text-gray-500'>{item.description}</p>
                </div>
              </motion.div>
          ))}
      </div>
    </motion.div>
  )
}

export default Steps
