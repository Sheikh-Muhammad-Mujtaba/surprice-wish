'use client'

import { useState, useEffect, useRef } from 'react'
import { MusicIcon, Sparkles, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function CelebrationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuote, setCurrentQuote] = useState('')
  const [displayedQuote, setDisplayedQuote] = useState('')
  const [showHeart, setShowHeart] = useState(true)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const quotes = [
    "Two years of love, laughter, and happily ever after!",
    "Wishing you a lifetime of love and happiness!",
    "May your love continue to grow stronger with each passing day!",
    "Congratulations on your cotton anniversary!",
    "Here's to many more years of beautiful memories together!"
  ]

  useEffect(() => {
    if (isPlaying) {
      const quoteInterval = setInterval(() => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setCurrentQuote(newQuote)
        setDisplayedQuote('')
        setShowHeart(true)

        if (quoteIndex >= quotes.length - 1) {
          clearInterval(quoteInterval)
          setTimeout(() => {
            if (audioRef.current) audioRef.current.pause()
            setIsPlaying(false)
            setQuoteIndex(0)
      }, 6000)
    } else {
      setQuoteIndex((prev) => prev + 1)
        }
      }, 6000)
      return () => clearInterval(quoteInterval)
    }
  }, [isPlaying, quoteIndex])

  useEffect(() => {
    if (currentQuote) {
      const typingInterval = setInterval(() => {
        if (displayedQuote.length < currentQuote.length) {
          setDisplayedQuote(currentQuote.slice(0, displayedQuote.length + 1))
        } else {
          clearInterval(typingInterval)
          setTimeout(() => setShowHeart(false), 1000)
        }
      }, 50)
      return () => clearInterval(typingInterval)
    }
  }, [currentQuote, displayedQuote])

  const handleClick = () => {
    setIsPlaying(true)
    setQuoteIndex(0)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-pink-400 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-purple-300/60 to-purple-400/80 opacity-75 z-0"></div>
      
      <div className="relative z-10 text-center flex flex-col items-center mb-5">
        <div className="sm:w-[80vw] flex items-center justify-center mb-6 z-20 px-4">
          <Star size={"10vw"} className="text-yellow-400 mr-2" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
          Happy 2nd Wedding Anniversary!
          </h1>
          <Star size={"10vw"} className="text-yellow-400 ml-2" />
        </div>

        {!isPlaying ? (
          <Button 
            onClick={handleClick}
            className="flex items-center text-2xl py-6 px-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 "
          >
            <MusicIcon className="mr-2 h-6 w-6" /> Celebrate Now!
          </Button>
        ) : (
          <div className="relative w-full max-w-lg h-[50vh] flex items-center justify-center">
            <div className="text-xl sm:text-3xl text-cyan-300 font-mono text-center z-10 bg-black/40 p-4 rounded-xl">
              {displayedQuote}
            </div>
            <RevealingHeart show={showHeart} />
          </div>
        )}

        {isPlaying && <FloatingHearts />}
        <audio ref={audioRef} src="/song/nasheed.mp3" loop /> 
      </div>

      <div className="absolute bottom-4 sm:right-4 text-sm flex items-center">
        <Sparkles className="mr-2 text-yellow-300" /> 
        Happy Wedding Anniversary 💖
      </div>
    </div>
  )
}

function RevealingHeart({ show }: { show: boolean }) {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-cyan-500 text-[200px] animate-ping opacity-70">♥</div>
    </div>
  )
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        >
          <div className="text-cyan-400 text-4xl transform rotate-45 opacity-50 hover:opacity-100 transition-opacity">♥</div>
        </div>
      ))}
    </div>
  )
}