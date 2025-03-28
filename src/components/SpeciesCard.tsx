import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Species } from '../data/speciesData'; // Import the interface

interface SpeciesCardProps {
  species: Species;
  onSelect: (id: string) => void; // Function to handle card click
  onFavorite: (id: string) => void; // Function to handle favorite click
  isFavorite: boolean; // Is this species favorited?
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, onSelect, onFavorite, isFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    onFavorite(species.id);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-card shadow-card overflow-hidden cursor-pointer transform transition-transform duration-250 hover:shadow-card-hover hover:-translate-y-1 flex flex-col"
      onClick={() => onSelect(species.id)}
    >
      <div className="relative">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-32 object-cover" // Fixed height for consistency
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
            isFavorite
              ? 'bg-yellow-400/80 text-white'
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
          aria-label={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        >
          <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-eco-primary dark:text-eco-accent-light mb-1">{species.name}</h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Clock size={14} className="mr-1.5" />
          <span>{species.cultivationTime}</span>
        </div>
        <button
          className="mt-auto w-full bg-eco-secondary dark:bg-eco-primary text-eco-primary dark:text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Ver Passo a Passo
        </button>
      </div>
    </div>
  );
};

export default SpeciesCard;
