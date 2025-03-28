import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import CultivationGuide from './components/CultivationGuide'; // Import Cultivation Guide
import SpeciesDetail from './components/SpeciesDetail'; // Import Species Detail
import { Library, Home as HomeIcon, Star, Bell, Sprout } from 'lucide-react'; // Import icons for nav, Sprout for Guia

// Define possible application views/screens
type AppView = 'SPLASH' | 'ONBOARDING' | 'HOME' | 'GUIDE_LIST' | 'SPECIES_DETAIL';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('SPLASH');
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Home'); // For bottom nav

  useEffect(() => {
    // Initial setup: Check onboarding status after splash
    if (currentView === 'SPLASH') {
      // Splash screen handles its own timeout
    } else {
      // Handle body overflow based on current view (optional)
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [currentView]);

  const handleSplashComplete = () => {
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    if (!onboardingComplete) {
      setCurrentView('ONBOARDING');
    } else {
      setCurrentView('HOME'); // Go directly to Home if onboarding is done
      setActiveTab('Home');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setCurrentView('HOME');
    setActiveTab('Home');
  };

  // --- Navigation Handlers ---
  const navigateToGuideList = () => {
    setCurrentView('GUIDE_LIST');
    setActiveTab('Guia de Cultivo'); // Update active tab to the new label
  };

  const navigateToHome = () => {
    setCurrentView('HOME');
    setActiveTab('Home');
  };

   const navigateToFavorites = () => {
    // TODO: Implement Favorites View
    console.log("Navigate to Favorites (Not Implemented)");
    setActiveTab('Favoritos');
  };

   const navigateToTips = () => {
    // TODO: Implement Tips View
    console.log("Navigate to Tips (Not Implemented)");
    setActiveTab('Dicas');
  };

  const handleSelectSpecies = (id: string) => {
    setSelectedSpeciesId(id);
    setCurrentView('SPECIES_DETAIL');
    // Keep 'Guia de Cultivo' active when viewing details from the guide list
    setActiveTab('Guia de Cultivo');
  };

  const handleBackToList = () => {
    setSelectedSpeciesId(null);
    setCurrentView('GUIDE_LIST'); // Go back to the list view
    setActiveTab('Guia de Cultivo'); // Keep Guia de Cultivo active
  };

  // --- Render Logic ---
  const renderContent = () => {
    switch (currentView) {
      case 'SPLASH':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'ONBOARDING':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'HOME':
        // Pass the navigation function to Home
        return <Home navigateToGuideList={navigateToGuideList} />;
      case 'GUIDE_LIST':
        return <CultivationGuide onSelectSpecies={handleSelectSpecies} />;
      case 'SPECIES_DETAIL':
        if (selectedSpeciesId) {
          return <SpeciesDetail speciesId={selectedSpeciesId} onBack={handleBackToList} />;
        }
        // Fallback if ID is missing (should not happen with proper flow)
        navigateToGuideList(); // Go back to list if ID is lost
        return null;
      default:
        return <Home navigateToGuideList={navigateToGuideList} />; // Default to Home
    }
  };

  // --- Bottom Navigation Items ---
   const navItems = [
    { icon: HomeIcon, label: 'Home', action: navigateToHome },
    { icon: Sprout, label: 'Guia de Cultivo', action: navigateToGuideList }, // Changed icon and label
    { icon: Star, label: 'Favoritos', action: navigateToFavorites },
    { icon: Bell, label: 'Dicas', action: navigateToTips },
  ];


  // Show bottom nav only after splash and onboarding
  const showBottomNav = currentView !== 'SPLASH' && currentView !== 'ONBOARDING';

  return (
    <div className="app relative min-h-screen">
      {renderContent()}

      {/* Bottom Navigation */}
      {showBottomNav && (
         <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md z-50">
          <div className="container mx-auto flex justify-around items-center h-16 max-w-md">
            {navItems.map((item) => {
               const isActive = item.label === activeTab; // Check against the current activeTab state
               return (
                 <button
                   key={item.label}
                   onClick={item.action}
                   className={`flex flex-col items-center justify-center text-xs font-medium transition-colors w-1/4 pt-1 pb-0.5 ${ // Ensure equal width and padding
                     isActive
                       ? 'text-eco-primary dark:text-eco-accent-light'
                       : 'text-gray-500 dark:text-gray-400 hover:text-eco-primary dark:hover:text-eco-accent-light'
                   }`}
                 >
                   <item.icon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                   {item.label}
                 </button>
               );
             })}
          </div>
        </nav>
      )}
    </div>
  );
}

export default App;
