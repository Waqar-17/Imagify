import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'

const Result = () => {
  const[image,setImage] = useState(assets.sample_img_1)
  const[isImageLoaded, setIsImageLoaded] = useState(false)
  const[loading,setLoading] = useState(false)
  const [input,setInput] = useState('')

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }



  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmitHandler} 
      className='flex flex-col min-h-[90vh] justify-center items-center'
    >

    <div>
      <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-purple-200/50">
        <img src={image} alt="" className={`max-w-sm rounded-xl transition-opacity duration-700 ${loading ? 'opacity-50 blur-sm' : 'opacity-100'}`}/>
        
        {loading && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        )}
      </div>
          
      <AnimatePresence>
        {loading && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className='mt-4 text-center font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'
          >
            Enhancing details and rendering pixels...
          </motion.p>
        )}
      </AnimatePresence>
    </div>

    {!isImageLoaded &&
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
      className="flex w-full max-w-xl bg-white text-gray-800 text-sm mt-8 rounded-full shadow-xl shadow-purple-100/50 overflow-hidden ring-1 ring-neutral-200 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300"
    >
      <input
        onChange={e => setInput(e.target.value)} value={input}
        type="text"
        placeholder="Describe what you want to generate..."
        className="flex-1 bg-transparent outline-none px-6 py-4 placeholder-gray-400"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gray-900 px-10 py-4 text-white hover:bg-gray-800 transition disabled:bg-gray-400"
      >
        Generate
      </button>
    </motion.div>
  }

  {isImageLoaded &&
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className='flex gap-3 flex-wrap justify-center text-sm p-0.5 mt-10'
    >
      <motion.p 
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={()=>{setIsImageLoaded(false)}} 
        className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer transition-colors hover:bg-zinc-100'
      >
        Generate Another
      </motion.p>
      <motion.a 
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        href={image} 
        download="generated-image.png" 
        className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer text-white shadow-lg transition-colors hover:bg-zinc-800'
      >
        Download
      </motion.a>
    </motion.div>
  }

    </motion.form>
  )
}

export default Result
