'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const wishes = [
  "May your life be a beautiful journey of love and discovery!",
  "Welcoming you to a world of endless possibilities!",
  "Every moment is a gift, and you are a precious treasure!",
  "Your arrival brings joy beyond measure!",
  "A new chapter of love and hope begins today!",
  "May your path be filled with wonder and happiness!",
  "You are loved more than words can express!",
  "Welcome to a family that will cherish you always!",
  "Your smile is the brightest light in our world!",
  "A miracle has arrived, and our hearts are full!"
]
  

export default function WelcomeWishComponent() {
    const [isPlaying, setIsPlaying] = useState(false)
  const [currentWish, setCurrentWish] = useState('')
  const [displayedWish, setDisplayedWish] = useState('')
  const [wishIndex, setWishIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (isPlaying) {
      const wishInterval = setInterval(() => {
        const newWish = wishes[wishIndex]
        setCurrentWish(newWish)
        setDisplayedWish('')

        if (wishIndex >= wishes.length - 1) {
          clearInterval(wishInterval)
          setTimeout(() => {
            if (audioRef.current) audioRef.current.pause()
            setIsPlaying(false)
            setWishIndex(0)
          }, 9000)
        } else {
          setWishIndex((prev) => prev + 1)
        }
      }, 10000)
      return () => clearInterval(wishInterval)
    }
  }, [isPlaying, wishIndex])

  useEffect(() => {
    if (currentWish) {
      const typingInterval = setInterval(() => {
        if (displayedWish.length < currentWish.length) {
          setDisplayedWish(currentWish.slice(0, displayedWish.length + 1))
        } else {
          clearInterval(typingInterval)
        }
      }, 70)
      return () => clearInterval(typingInterval)
    }
  }, [currentWish, displayedWish])


  const handleStart = () => {
    setIsPlaying(true)
    setWishIndex(0)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-90"></div>
      
      {/* Star-like background effect using CSS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div 
            key={`star-${i}`} // Ensure unique key for each star
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'twinkle 3s infinite alternate'
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to the World, Little One!
        </motion.h1>
        {!isPlaying ? (
            <motion.div
            className="flex space-x-4 items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
          <Button 
            onClick={handleStart}
            variant="outline" 
            size="lg" 
            className="bg-transparent border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-indigo-900 transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                   >
            Start Celebration
          </Button>
          </motion.div>
        ) : (
            <AnimatePresence mode="wait">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl mb-8 text-center max-w-2xl h-24 text-white font-medium tracking-wide"
          >
            <div className="text-xl sm:text-3xl text-cyan-300 font-mono text-center bg-black/40 p-4 rounded-xl">
              {displayedWish}
            </div>
         
          </motion.div>
          </AnimatePresence>
        )}

        {isPlaying }
        <audio ref={audioRef} src="/song/nasheed.mp3" loop />
      </div>

    
    </div>
  )
}
