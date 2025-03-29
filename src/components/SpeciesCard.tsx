import React from 'react';
import { Heart, Clock, Sun, ChevronRight } from 'lucide-react'; // Removed Zap as it wasn't used
import { Species } from '../data/speciesData';

interface SpeciesCardProps {
  species: Species;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, onSelect, onFavorite, isFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    onFavorite(species.id);
  };

  const difficultyColors = {
    'Fácil': 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300',
    'Médio': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300',
    'Difícil': 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300',
  };

  return (
    <div
      onClick={() => onSelect(species.id)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden group cursor-pointer transform transition-all duration-250 hover:shadow-card-hover hover:-translate-y-1 flex flex-col"
    >
      <div className="relative">
        {/* Ensure species.image is a valid and accessible URL */}
        <img
          key={species.id} // Added key for potential reconciliation issues (unlikely cause)
          src={species.image}
          alt={species.name}
          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" // Standard classes for card image
          loading="lazy" // Added lazy loading for potential performance benefit
        />
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors duration-200 ${
            isFavorite
              ? 'bg-red-500/80 text-white hover:bg-red-600/90'
              : 'bg-white/70 dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-900/80 backdrop-blur-sm'
          }`}
          aria-label={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
         {/* Difficulty Badge */}
         <span className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[species.difficulty]} backdrop-blur-sm`}>
           {species.difficulty}
         </span>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-base mb-1.5 truncate">{species.name}</h3>

        {/* Info Icons */}
        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1" title={`Tempo: ${species.cultivationTime}`}>
            <Clock size={12} />
            <span>{species.cultivationTime}</span>
          </div>
          <div className="flex items-center space-x-1" title={`Luz: ${species.light}`}>
            <Sun size={12} />
            <span className="truncate">{species.light}</span>
          </div>
        </div>

        {/* View Guide Button */}
        <button
          className="mt-auto w-full bg-eco-secondary dark:bg-eco-primary text-eco-primary dark:text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5"
        >
          <span>Ver guia</span>
          <ChevronRight size={14} strokeWidth={2.5}/>
        </button>
      </div>
    </div>
  );
};

export default SpeciesCard;
