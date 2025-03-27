import React, { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOnboarding, setIsOnboarding] = useState(false)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isLoading])

  const handleSplashComplete = () => {
    setIsLoading(false)
    setIsOnboarding(true) // For now, always show onboarding after splash
  }

  const handleOnboardingComplete = () => {
    setIsOnboarding(false)
  }

  return (
    <div className="app">
      {isLoading ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : isOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p>Welcome to Eco Micro! App content will go here.</p>
        </div>
      )}
    </div>
  )
}

export default App
