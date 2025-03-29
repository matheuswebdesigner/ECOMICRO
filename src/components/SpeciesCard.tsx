import React from 'react';
import { Heart, Clock, Sun, ChevronRight } from 'lucide-react';
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

  // Use difficultyLevel for consistency if needed, but display `difficulty`
  const difficultyColors = {
    'Fácil': 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300',
    'Médio': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300',
    'Difícil': 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300',
  };
  const difficultyColorClass = difficultyColors[species.difficulty] || 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'; // Fallback

  return (
    <div
      onClick={() => onSelect(species.id)}
      // Use off-white for light mode card background
      className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-card overflow-hidden group cursor-pointer transform transition-all duration-250 hover:shadow-card-hover hover:-translate-y-1 flex flex-col"
    >
      <div className="relative">
        {/* Image: Ensure high resolution, aspect ratio might need adjustment */}
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" // Increased height
          loading="lazy"
          onError={(e) => { // Basic error handling for images
            console.error(`Failed to load image: ${species.image}`);
            // Optionally replace with a placeholder:
            // e.currentTarget.src = 'path/to/placeholder.png';
          }}
        />
        {/* Favorite Button - Subtle Animation on Hover/Active */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 ease-in-out transform active:scale-90 ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600 shadow-md'
              : 'bg-white/80 dark:bg-gray-900/70 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900/90 hover:text-red-500 dark:hover:text-red-400 backdrop-blur-sm'
          }`}
          aria-label={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
         {/* Difficulty Badge */}
         <span className={`absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-xs font-semibold ${difficultyColorClass} backdrop-blur-sm shadow-sm`}>
           {species.difficulty}
         </span>
      </div>

      <div className="p-4 flex flex-col flex-grow"> {/* Increased padding */}
        <h3 className="font-semibold text-lg mb-2 truncate text-eco-text-dark dark:text-eco-text-light">{species.name}</h3>

        {/* Info Icons - Use display text */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1.5" title={`Tempo: ${species.cultivationTime}`}>
            <Clock size={14} />
            {/* Display "Pronto em X dias" */}
            <span>Pronto em {species.cultivationTimeValue} dias</span>
          </div>
          {/* Optionally add light icon back if desired */}
          {/* <div className="flex items-center space-x-1.5" title={`Luz: ${species.light}`}>
            <Sun size={14} />
            <span className="truncate">{species.light}</span>
          </div> */}
        </div>

        {/* View Guide Button - Premium Style */}
        <button
          className="mt-auto w-full bg-eco-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-primary dark:focus:ring-offset-gray-800 dark:bg-eco-accent-light dark:text-eco-dark-bg dark:focus:ring-eco-accent-light"
        >
          <span>Ver Passo a Passo</span>
          <ChevronRight size={16} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1"/>
        </button>
      </div>
    </div>
  );
};

export default SpeciesCard;
