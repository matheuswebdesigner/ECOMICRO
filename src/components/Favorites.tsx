import React, { useState, useEffect } from 'react';
import {
  Heart,
  Clock,
  Trash2,
  BookOpen,
  PlusCircle,
  Calendar,
  ArrowLeft,
  Filter,
  XCircle,
  Search,
  Zap,
  Sun,
  Droplets,
  Puzzle,
  Star,
  CheckSquare,
  Video,
  Library,
  Moon,
  Sprout,
  Scissors,
  Share2,
  CheckCircle,
  Award,
  Lightbulb,
  Wind,
} from 'lucide-react';
import { speciesList, Species, getSpeciesById } from '../data/speciesData'; // Import species data
import SpeciesCard from './SpeciesCard'; // Import SpeciesCard
import { useNavigate } from 'react-router-dom';

// Define type for filter options
interface Filters {
  benefit: string | null;
  time: { min: number; max: number } | null;
  color: string | null;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    benefit: null,
    time: null,
    color: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) newFavorites.delete(id);
      else newFavorites.add(id);
      return newFavorites;
    });
  };

  const handleSelectSpecies = (id: string) => {
    setSelectedSpecies(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleClearSelection = () => {
    setSelectedSpecies([]);
  };

  const handleRemoveSelected = () => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      selectedSpecies.forEach(id => newFavorites.delete(id));
      return newFavorites;
    });
    setSelectedSpecies([]);
  };

  const handleFilterChange = <K extends keyof Filters>(filterType: K, value: Filters[K]) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setActiveFilters({ benefit: null, time: null, color: null });
    setShowFilters(false); // Optionally close panel on clear
  };

  const filteredSpecies = speciesList.filter(species => {
    const isFavorite = favorites.has(species.id);
    if (!isFavorite) return false; // Only show favorites

    // Benefit Filter
    const matchesBenefit = activeFilters.benefit
      ? species.benefits.includes(activeFilters.benefit)
      : true;

    // Time Filter
    const matchesTime = activeFilters.time
      ? species.cultivationTimeValue >= activeFilters.time.min && species.cultivationTimeValue <= activeFilters.time.max
      : true;

    // Color Filter (example: assuming species data has a 'color' property)
    const matchesColor = activeFilters.color ? species.color === activeFilters.color : true;

    return matchesBenefit && matchesTime && matchesColor;
  });

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== null);
  const hasFavorites = favorites.size > 0;

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-eco-light-bg dark:bg-eco-dark-bg shadow-sm pt-6 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-eco-primary dark:text-eco-accent-light">
            ⭐ Meus Microverdes Favoritos
          </h1>
          <button className="bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-300 dark:hover:bg-green-600 transition-colors">
            🗓️ Criar plano semanal
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-full border border-gray-300 dark:border-gray-600 text-eco-primary dark:text-eco-accent-light transition-colors flex-shrink-0 relative ${showFilters || hasActiveFilters ? 'bg-eco-secondary/50 dark:bg-eco-primary/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            aria-label="Abrir filtros"
            aria-expanded={showFilters}
          >
            <Filter size={22} />
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
            <h3 className="text-lg font-semibold flex items-center">
              <Filter size={18} className="mr-2" /> Filtros
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XCircle size={20} />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Benefit Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">🎯 Benefício</label>
              <select
                value={activeFilters.benefit ?? ''}
                onChange={e => handleFilterChange('benefit', e.target.value || null)}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todos</option>
                {['Foco', 'Energia', 'Detox', 'Imunidade'].map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">⏱️ Tempo de Cultivo</label>
              <select
                value={activeFilters.time ? `${activeFilters.time.min}-${activeFilters.time.max}` : ''}
                onChange={e => {
                  const value = e.target.value;
                  const timeOptions = [
                    { label: 'Até 7 dias', min: 0, max: 7 },
                    { label: '7-14 dias', min: 7, max: 14 },
                    { label: 'Mais de 14 dias', min: 14, max: 100 },
                  ];
                  const option = timeOptions.find(opt => `${opt.min}-${opt.max}` === value);
                  handleFilterChange('time', option ? { min: option.min, max: option.max } : null);
                }}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todos</option>
                <option value="0-7">Até 7 dias</option>
                <option value="7-14">7-14 dias</option>
                <option value="14-100">Mais de 14 dias</option>
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">🟢 Cor da Planta</label>
              <select
                value={activeFilters.color ?? ''}
                onChange={e => handleFilterChange('color', e.target.value || null)}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-sm"
              >
                <option value="">Todas</option>
                {['Verde', 'Roxo', 'Vermelho', 'Amarelo'].map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
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
                onSelect={() => {
                  navigate(`/species/${species.id}`);
                }}
                onFavorite={toggleFavorite}
                isFavorite={favorites.has(species.id)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center mt-12 px-6 py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Heart size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Você ainda não favoritou nenhum microverde.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Explore a biblioteca e toque no ⭐ para salvar seus preferidos.
            </p>
            <button
              onClick={() => navigate('/cultivation-guide')}
              className="px-5 py-2.5 bg-eco-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Explorar Biblioteca
            </button>
          </div>
        )}
      </div>

      {/* Batch Actions (Footer) */}
      {selectedSpecies.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedSpecies.length} selecionados
            </span>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // Implement start cultivation logic here
                  console.log('Iniciar cultivo dos selecionados', selectedSpecies);
                }}
                className="px-4 py-2 bg-eco-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Iniciar Cultivo
              </button>
              <button
                onClick={() => {
                  // Implement compare logic here
                  console.log('Comparar nutricionalmente', selectedSpecies);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Comparar
              </button>
              <button
                onClick={handleRemoveSelected}
                className="px-4 py-2 bg-red-200 dark:bg-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-300 dark:hover:bg-red-600 transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
          <button
            onClick={handleClearSelection}
            className="text-sm text-eco-primary dark:text-eco-accent-light hover:underline block w-full text-center mt-2"
          >
            Limpar seleção
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
