import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>

      <div className=" flex flex-wrap gap-6 text-sm">
        {testimonialsData.map((testimonail, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5, boxShadow: '0 20px 25px -5px rgba(168, 85, 247, 0.15)' }}
            className="bg-white/40 backdrop-blur-md p-10 border border-neutral-200/50 rounded-2xl shadow-lg shadow-black/5 w-80 m-auto cursor-pointer transition-colors hover:bg-white/60"
          >
            <div className="flex flex-col items-center">
              <img
                className="rounded-full w-14"
                src={testimonail.image}
                alt=""/>
                <h2 className="text-xl font-semibold mt-3">{testimonail.name}</h2>
                <p className="text-gray-500 mb-4">{testimonail.role}</p>
                <div className="flex mb-4 ">
                    {Array(testimonail.stars).fill().map((item,index)=>(
                      <img key={index} src={assets.rating_star} alt="" />
                    ))}
                </div>
                <p className="text-center text-sm text-gray-600">{testimonail.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
