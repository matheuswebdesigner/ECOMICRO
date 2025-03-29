import React from 'react';
import {
  Heart,
  Bug,
  Scissors,
  Home as HomeIcon, // Keep for nav if needed elsewhere
  Star, // Keep for nav if needed elsewhere
  Bell, // Keep for nav if needed elsewhere
  ChevronRight,
  Sprout, // Icon for Guia de Cultivo
  Search, // Added for potential search bar
} from 'lucide-react';

// Placeholder data for suggestions
const suggestions = [
  { id: 1, name: 'Rúcula', benefit: 'Rica em vitamina K', image: 'https://images.unsplash.com/photo-1618511863161-a11b86016d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Rabanete', benefit: 'Fonte de antioxidantes', image: 'https://images.unsplash.com/photo-1629087140320-4a7f07a1f0c1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Brócolis', benefit: 'Alto teor de fibras', image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Mostarda', benefit: 'Sabor picante', image: 'https://images.unsplash.com/photo-1589137201472-eb691e5b997c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'Girassol', benefit: 'Rico em nutrientes', image: 'https://images.unsplash.com/photo-1561051241-368c743649a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }, // Added one more
];

// Define props if Home needs to trigger navigation
interface HomeProps {
  navigateToGuideList?: () => void; // Function to navigate to the guide list
  navigateToSpeciesDetail?: (id: string) => void; // Function to navigate to species detail
}

const Home: React.FC<HomeProps> = ({ navigateToGuideList, navigateToSpeciesDetail }) => {
  const hasActiveCultivation = false; // Set to true to show the cultivation card

  // Placeholder actions for quick access buttons
  const handleQuickAccessClick = (label: string) => {
    console.log(`Quick Access Clicked: ${label}`);
    if (label === 'Guia de Cultivo' && navigateToGuideList) {
      navigateToGuideList(); // Trigger navigation if function is provided
    }
    // Add other navigation logic here if needed (e.g., navigateToBenefits, navigateToPests)
  };

  // Placeholder action for suggestion button
  const handleSuggestionClick = (id: string) => { // Changed id type to string to match speciesData
    console.log(`Suggestion Clicked: ${id}`);
    if (navigateToSpeciesDetail) {
      // Find the corresponding species ID from suggestions (assuming suggestion.id maps to species.id)
      // This mapping might need adjustment based on actual data structure
      const speciesIdMap: { [key: number]: string } = {
        1: 'rucula',
        2: 'rabanete-roxo',
        3: 'brocolis',
        4: 'mostarda',
        5: 'girassol',
      };
      const speciesId = speciesIdMap[id];
      if (speciesId) {
        navigateToSpeciesDetail(speciesId);
      } else {
        console.warn(`No species ID mapping found for suggestion ID: ${id}`);
      }
    }
  };

  // Define Quick Access Items
  const quickAccessItems = [
    { icon: Sprout, label: 'Guia de Cultivo', color: 'text-eco-primary', bgColor: 'bg-eco-secondary/60 dark:bg-eco-primary/20' },
    { icon: Heart, label: 'Benefícios', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    { icon: Bug, label: 'Pragas', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-700/30' }, // Shortened label
    { icon: Scissors, label: 'Colheita', color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24"> {/* Increased padding-bottom */}
      <div className="container mx-auto px-4 pt-6 pb-8"> {/* Adjusted padding */}

        {/* 1. Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bem-vindo de volta,</p>
            <h1 className="text-2xl font-bold text-eco-primary dark:text-eco-accent-light">
              Cultivador! 🌱 {/* Simplified Greeting */}
            </h1>
          </div>
          {/* Optional: Add a notification or profile icon here */}
          {/* <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Bell size={20} />
          </button> */}
        </div>

        {/* Optional: Search Bar */}
        {/* <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar espécies, guias..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 dark:focus:ring-eco-accent-light/50 text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div> */}


        {/* 2. Conditional Cultivation Card */}
        {hasActiveCultivation && (
          <div className="bg-gradient-to-r from-eco-primary to-green-600 dark:from-eco-dark-secondary dark:to-eco-primary text-white rounded-xl shadow-lg p-5 mb-8 flex items-center space-x-4 relative overflow-hidden">
             {/* Subtle background pattern (optional) */}
            <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
            <img
              src="https://via.placeholder.com/60x60/ffffff/2D6A4F?text=Micro" // Placeholder with better contrast
              alt="Microverde Ativo"
              className="w-16 h-16 rounded-lg object-cover border-2 border-white/50 flex-shrink-0"
            />
            <div className="flex-grow z-10">
              <h3 className="font-semibold text-lg mb-0.5">Rabanete Roxo</h3> {/* Example Name */}
              <p className="text-sm opacity-90 mb-2">Etapa: Germinação (Dia 3)</p>
              {/* Enhanced Progress Bar */}
              <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors z-10 flex-shrink-0">
              Ver Etapa
            </button>
          </div>
        )}

        {/* 3. Quick Access Cards */}
        <div className="mb-8">
           <h2 className="text-lg font-semibold text-eco-text-dark dark:text-eco-text-light mb-4">Acesso Rápido</h2>
           <div className="grid grid-cols-4 gap-3 sm:gap-4"> {/* Changed to 4 columns, adjusted gap */}
            {quickAccessItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuickAccessClick(item.label)}
                className={`${item.bgColor} rounded-lg shadow-sm p-3 flex flex-col items-center justify-center text-center aspect-square transform transition-all duration-250 hover:shadow-md hover:-translate-y-0.5 group`}
              >
                <div className={`p-2 rounded-full mb-1.5 transition-colors ${item.bgColor} group-hover:brightness-110`}> {/* Subtle background for icon */}
                   <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color} transition-transform group-hover:scale-110`} strokeWidth={1.5} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-eco-text-dark dark:text-eco-text-light leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>


        {/* 4. Suggestions Section */}
        <div> {/* Removed mb-8 to rely on pb-24 of the main div */}
          <h2 className="text-lg font-semibold text-eco-text-dark dark:text-eco-text-light mb-4">🌟 Sugestões para você</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"> {/* Horizontal scroll */}
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex-shrink-0 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden group transform transition-transform duration-250 hover:shadow-card-hover hover:-translate-y-1">
                <img src={suggestion.image} alt={suggestion.name} className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="p-3">
                  <h4 className="font-semibold text-base mb-1 truncate">{suggestion.name}</h4> {/* Increased font size */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 h-8 overflow-hidden">{suggestion.benefit}</p> {/* Fixed height for benefit */}
                  <button
                    onClick={() => handleSuggestionClick(suggestion.id)}
                    className="w-full bg-eco-secondary dark:bg-eco-primary text-eco-primary dark:text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5"
                  >
                    <span>Ver guia</span>
                    <ChevronRight size={14} strokeWidth={2.5}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation is rendered in App.tsx */}
    </div>
  );
};

export default Home;
