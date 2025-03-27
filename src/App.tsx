import React, { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)

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
  }

  return (
    <div className="app">
      {isLoading ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p>Welcome to Eco Micro! App content will go here.</p>
        </div>
      )}
    </div>
  )
}

export default App
