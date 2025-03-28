import React, { useEffect, useRef } from 'react'
import { Leaf } from 'lucide-react'

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const animationFrame = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for timeout

  useEffect(() => {
    // Use requestAnimationFrame to ensure the animation starts smoothly
    animationFrame.current = requestAnimationFrame(() => {
      // Set timeout to trigger onComplete after the splash duration
      timeoutRef.current = setTimeout(onComplete, 3000); // 3 seconds duration
    });

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrame.current); // Cancel animation frame on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear the timeout if component unmounts
      }
    };
  }, [onComplete]); // Dependency array includes onComplete

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-lime-50 dark:bg-eco-dark-bg overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cover bg-center animate-background-kenzo" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1679669299845-0991aa4c990b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="absolute inset-0 bg-lime-50 dark:bg-eco-dark-bg opacity-40 dark:opacity-60 backdrop-blur-sm"></div> {/* Light blur overlay */}
      </div>

      {/* Logo Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="logo-container">
          <Leaf className="w-20 h-20 text-lime-700 dark:text-eco-accent-light animate-logo-grow" />
        </div>
        <h1 className="text-3xl font-extrabold text-lime-700 dark:text-eco-accent-light mt-4 animate-fade-in">Eco Micro</h1>
        <p className="text-sm text-lime-600 dark:text-lime-300 mt-2 italic animate-slide-up">
          Cultive saúde, colha vitalidade.
        </p>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-10 z-10 w-12 h-1 bg-lime-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-lime-700 dark:bg-eco-accent-light animate-loading-bar"></div>
      </div>
    </div>
  )
}

export default SplashScreen
