import React from 'react'
import {
  BookOpen, // Keep for potential future use or replace with Library if needed
  Heart,
  Bug,
  Scissors,
  Library, // Used for Biblioteca
  Home as HomeIcon,
  Star,
  Bell,
  ChevronRight,
  Sprout, // Icon for Guia de Cultivo
} from 'lucide-react'

// Placeholder data for suggestions
const suggestions = [
  { id: 1, name: 'Rúcula', benefit: 'Rica em vitamina K', image: 'https://images.unsplash.com/photo-1618511863161-a11b86016d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Rabanete', benefit: 'Fonte de antioxidantes', image: 'https://images.unsplash.com/photo-1629087140320-4a7f07a1f0c1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Brócolis', benefit: 'Alto teor de fibras', image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Mostarda', benefit: 'Sabor picante', image: 'https://images.unsplash.com/photo-1589137201472-eb691e5b997c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
]

// Define props if Home needs to trigger navigation
interface HomeProps {
  navigateToGuideList?: () => void; // Function to navigate to the guide list
}

const Home: React.FC<HomeProps> = ({ navigateToGuideList }) => {
  const hasActiveCultivation = false // Set to true to show the cultivation card

  // Placeholder actions for quick access buttons
  const handleQuickAccessClick = (label: string) => {
    console.log(`Quick Access Clicked: ${label}`);
    if (label === 'Guia de Cultivo' && navigateToGuideList) {
      navigateToGuideList(); // Trigger navigation if function is provided
    }
    // Add other navigation logic here if needed
  }

  // Placeholder action for suggestion button
  const handleSuggestionClick = (id: number) => {
    console.log(`Suggestion Clicked: ${id}`);
    // Example: Navigate to specific species detail page
    // navigateToSpeciesDetail(id); // Needs implementation in App.tsx and passed down
  }

  // Define Quick Access Items
  const quickAccessItems = [
    { icon: Sprout, label: 'Guia de Cultivo', color: 'text-eco-primary' }, // Added Guia de Cultivo
    { icon: Library, label: 'Biblioteca', color: 'text-green-600' },
    { icon: Heart, label: 'Benefícios', color: 'text-red-500' },
    { icon: Bug, label: 'Controle de Pragas', color: 'text-yellow-600' },
    { icon: Scissors, label: 'Colheita', color: 'text-purple-500' },
  ];


  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-20"> {/* Added padding-bottom for nav */}
      <div className="container mx-auto px-4 py-6">
        {/* 1. Greeting */}
        <h1 className="text-2xl font-bold text-eco-primary dark:text-eco-accent-light mb-6">
          🌱 Bem-vindo ao EcoMicro! Vamos cultivar juntos?
        </h1>

        {/* 2. Conditional Cultivation Card */}
        {hasActiveCultivation && (
          <div className="bg-white dark:bg-gray-800 rounded-card shadow-card p-4 mb-6 flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/60" // Replace with actual image
              alt="Microverde"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">Nome da Espécie</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Etapa: Germinação</p>
              {/* Progress Bar Placeholder */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-eco-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <button className="bg-eco-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Continuar
            </button>
          </div>
        )}

        {/* 3. Quick Access Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickAccessItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuickAccessClick(item.label)}
              // Add col-span-2 to the last item if there's an odd number for better centering,
              // but with 5 items, the default grid flow might be acceptable.
              // className={`... ${quickAccessItems.length % 2 !== 0 && index === quickAccessItems.length - 1 ? 'col-span-2 mx-auto w-1/2' : ''}`}
              className={`bg-white dark:bg-gray-800 rounded-card shadow-card p-4 flex flex-col items-center justify-center text-center aspect-square transform transition-transform duration-250 hover:shadow-card-hover hover:-translate-y-1`}
            >
              <item.icon className={`w-10 h-10 mb-2 ${item.color} dark:text-eco-secondary`} strokeWidth={1.5} />
              <span className="text-sm font-medium text-eco-text-dark dark:text-eco-text-light">{item.label}</span>
            </button>
          ))}
        </div>


        {/* 4. Suggestions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-eco-primary dark:text-eco-accent-light mb-4">🌟 Sugestões para você</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"> {/* Horizontal scroll */}
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex-shrink-0 w-40 bg-white dark:bg-gray-800 rounded-card shadow-card overflow-hidden">
                <img src={suggestion.image} alt={suggestion.name} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h4 className="font-semibold text-sm mb-1">{suggestion.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{suggestion.benefit}</p>
                  <button
                    onClick={() => handleSuggestionClick(suggestion.id)}
                    className="w-full bg-eco-secondary dark:bg-eco-primary text-eco-primary dark:text-white px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-1"
                  >
                    <span>Ver guia</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation is now rendered in App.tsx */}
    </div>
  )
}

export default Home;
