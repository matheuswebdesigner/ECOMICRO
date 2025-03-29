import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Clock, Zap, Sun, Heart, ChevronRight, Filter, XCircle } from 'lucide-react';
import {
  speciesList,
  Species,
  cultivationTimeOptions,
  difficultyOptions,
  lightTypeOptions,
  benefitOptions
} from '../data/speciesData';
import SpeciesCard from './SpeciesCard';

interface CultivationGuideProps {
  onSelectSpecies: (id: string) => void;
}

interface Filters {
  time: { min: number; max: number } | null;
  difficulty: Species['difficultyLevel'] | null;
  light: Species['lightType'] | null;
  benefit: string | null;
}

const CultivationGuide: React.FC<CultivationGuideProps> = ({ onSelectSpecies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    time: null,
    difficulty: null,
    light: null,
    benefit: null,
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const clearSearch = () => setSearchTerm('');
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) newFavorites.delete(id);
      else newFavorites.add(id);
      return newFavorites;
    });
  };

  const handleFilterChange = <K extends keyof Filters>(filterType: K, value: Filters[K]) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setActiveFilters({ time: null, difficulty: null, light: null, benefit: null });
    setShowFilters(false); // Optionally close panel on clear
  };

  const filteredSpecies = speciesList.filter(species => {
    // Search Term Filter
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      species.name.toLowerCase().includes(searchTermLower) ||
      (species.flavorProfile && species.flavorProfile.toLowerCase().includes(searchTermLower)) ||
      species.benefits.some(b => b.toLowerCase().includes(searchTermLower));

    // Time Filter
    const matchesTime = activeFilters.time
      ? species.cultivationTimeValue >= activeFilters.time.min && species.cultivationTimeValue <= activeFilters.time.max
      : true;

    // Difficulty Filter
    const matchesDifficulty = activeFilters.difficulty
      ? species.difficultyLevel === activeFilters.difficulty
      : true;

    // Light Filter
    const matchesLight = activeFilters.light
      ? species.lightType === activeFilters.light
      : true;

    // Benefit Filter
    const matchesBenefit = activeFilters.benefit
      ? species.benefits.includes(activeFilters.benefit)
      : true;

    return matchesSearch && matchesTime && matchesDifficulty && matchesLight && matchesBenefit;
  });

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== null);

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24">

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-eco-light-bg dark:bg-eco-dark-bg shadow-sm pt-6 pb-4 px-4">
        <h1 className="text-3xl font-bold text-eco-primary dark:text-eco-accent-light mb-5 text-center">
          Guia de Cultivo
        </h1>
        <div className="flex items-center space-x-2">
          {/* Enhanced Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por espécie, sabor ou benefício..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 dark:focus:ring-eco-accent-light/50 text-base" // Increased padding/text size
            />
            <Search
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={20} // Slightly larger icon
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Limpar busca"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-full border border-gray-300 dark:border-gray-600 text-eco-primary dark:text-eco-accent-light transition-colors flex-shrink-0 relative ${showFilters || hasActiveFilters ? 'bg-eco-secondary/50 dark:bg-eco-primary/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            aria-label="Abrir filtros"
            aria-expanded={showFilters}
          >
            <SlidersHorizontal size={22} />
             {hasActiveFilters && !showFilters && ( // Show dot if filters active and panel closed
               <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
             )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md mb-4 mx-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center"><Filter size={18} className="mr-2"/> Filtros</h3>
            <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <XCircle size={20} />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Time Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">⏱️ Tempo</label>
              <select
                value={activeFilters.time ? `${activeFilters.time.min}-${activeFilters.time.max}` : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  const option = cultivationTimeOptions.find(opt => `${opt.min}-${opt.max}` === value);
                  handleFilterChange('time', option ? { min: option.min, max: option.max } : null);
                }}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todos</option>
                {cultivationTimeOptions.map(opt => (
                  <option key={opt.label} value={`${opt.min}-${opt.max}`}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">💡 Dificuldade</label>
              <select
                value={activeFilters.difficulty ?? ''}
                onChange={(e) => handleFilterChange('difficulty', e.target.value as Filters['difficulty'] || null)}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todas</option>
                {difficultyOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Light Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">🌤️ Luz</label>
              <select
                value={activeFilters.light ?? ''}
                onChange={(e) => handleFilterChange('light', e.target.value as Filters['light'] || null)}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todos</option>
                {lightTypeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Benefit Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">🎯 Objetivo</label>
              <select
                value={activeFilters.benefit ?? ''}
                onChange={(e) => handleFilterChange('benefit', e.target.value || null)}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todos</option>
                {benefitOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="text-right">
              <button
                onClick={clearFilters}
                className="text-sm text-eco-primary dark:text-eco-accent-light hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      )}


      {/* Grid of Species Cards */}
      <div className="container mx-auto px-4 py-6">
        {filteredSpecies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6">
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
          <div className="text-center mt-12 px-6 py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
             <Search size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Nenhuma espécie encontrada
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Tente ajustar seus termos de busca ou limpar os filtros aplicados.
            </p>
            {(searchTerm || hasActiveFilters) && (
              <button
                onClick={() => { clearSearch(); clearFilters(); }}
                className="px-5 py-2.5 bg-eco-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Limpar Busca e Filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CultivationGuide;
