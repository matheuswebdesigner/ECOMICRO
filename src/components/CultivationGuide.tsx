import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { speciesList, Species } from '../data/speciesData'; // Import data and type
import SpeciesCard from './SpeciesCard'; // Import the card component

interface CultivationGuideProps {
  onSelectSpecies: (id: string) => void; // Callback to navigate to detail view
}

const CultivationGuide: React.FC<CultivationGuideProps> = ({ onSelectSpecies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });
  const [showFilters, setShowFilters] = useState(false); // State for filter panel (optional)

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  // Filtering logic
  const filteredSpecies = speciesList.filter(species =>
    species.name.toLowerCase().includes(searchTerm.toLowerCase())
    // TODO: Add more filtering options based on difficulty, time, etc.
  );

  // Handle favorite toggle
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24"> {/* Padding for bottom nav */}

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-eco-light-bg dark:bg-eco-dark-bg shadow-sm pt-6 pb-4 px-4">
        <h1 className="text-2xl font-bold text-eco-primary dark:text-eco-accent-light mb-4 text-center">
          Guia de Cultivo
        </h1>
        <div className="flex items-center space-x-2">
          {/* Enhanced Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Procure por espécie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 dark:focus:ring-eco-accent-light/50 text-sm" // Adjusted padding and text size
            />
            <Search
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={18} // Slightly smaller icon
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Limpar busca"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)} // Toggle filter panel visibility
            className="p-2.5 bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 text-eco-primary dark:text-eco-accent-light hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-shrink-0" // Adjusted padding
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
        {/* TODO: Implement Filter Panel */}
        {/* {showFilters && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p>Opções de Filtro Aqui...</p>
          </div>
        )} */}
      </div>

      {/* Grid of Species Cards */}
      <div className="container mx-auto px-4 py-6">
        {filteredSpecies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6"> {/* Consistent gap */}
            {filteredSpecies.map(species => (
              <SpeciesCard
                key={species.id}
                species={species}
                onSelect={onSelectSpecies}
                onFavorite={toggleFavorite}
                isFavorite={favorites.has(species.id)}
              />
            ))}
          </div>
        ) : (
          // Improved Empty State
          <div className="text-center mt-12 px-6">
             <Search size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
              Nenhuma espécie encontrada
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tente ajustar seus termos de busca ou filtros.
            </p>
            {/* Optional: Button to clear search/filters */}
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="mt-4 px-4 py-2 bg-eco-secondary dark:bg-eco-primary text-eco-primary dark:text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Limpar Busca
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CultivationGuide;
