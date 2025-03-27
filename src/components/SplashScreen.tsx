import React, { useEffect, useRef } from 'react'
import { Leaf } from 'lucide-react'

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const animationFrame = useRef<number>(0)

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(() => {
      setTimeout(onComplete, 3000) // Simulate splash screen duration
    })
    return () => {
      cancelAnimationFrame(animationFrame.current)
      clearTimeout(0) // Clear the timeout if component unmounts
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-lime-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cover bg-center animate-background- Kenzo from Unsplash [Unsplash]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1679669299845-0991aa4c990b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="absolute inset-0 bg-lime-50 opacity-40 backdrop-blur-sm"></div> {/* Light blur overlay */}
      </div>

      {/* Logo Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="logo-container">
          <Leaf className="w-20 h-20 text-lime-700 animate-logo-grow" />
        </div>
        <h1 className="text-3xl font-extrabold text-lime-700 mt-4 animate-fade-in">Eco Micro</h1>
        <p className="text-sm text-lime-600 mt-2 italic animate-slide-up">
          Cultive saúde, colha vitalidade.
        </p>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-10 z-10 w-12 h-1 bg-lime-200 rounded-full overflow-hidden">
        <div className="h-full bg-lime-700 animate-loading-bar"></div>
      </div>
    </div>
  )
}

export default SplashScreen
