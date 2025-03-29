import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Clock, Sun, Droplets, Puzzle, Star, CheckSquare, Video, Library, Moon, Sprout, Scissors, Share2, CheckCircle, Award, Lightbulb, Wind, Zap // Added Zap
} from 'lucide-react';
import { Species, TimelineStep, getSpeciesById } from '../data/speciesData';

// Expanded Icon Map
const getIcon = (iconName: string): React.ElementType => {
  const icons: { [key: string]: React.ElementType } = {
    Clock, Sun, Droplets, Puzzle, Star, CheckSquare, Video, Library, ArrowLeft, Share2, CheckCircle, Award, Lightbulb, Wind, Zap, // Added Zap here too
    Moon, Sprout, Scissors,
    // Add more specific icons if needed based on timeline step titles/themes
    'Gotas d’água': Droplets, // Example mapping
    'Pote escorrendo': Droplets, // Example mapping
    'Broto abrindo': Sprout,
    'Janela': Sun,
    'Tesoura': Scissors,
    // Map common titles if icon names are missing/inconsistent in data
    'Hidratação': Droplets,
    'Semear': Sprout, // Or a more specific seeding icon if available
    'Drenagem + Escuro': Moon,
    'Escuro & Úmido': Moon,
    'Germinação': Sprout,
    'Germinação Visível': Sprout,
    'Luz Suave': Sun,
    'Luz Indireta': Sun,
    'Colheita': Scissors,
    'Semear Direto': Sprout,
    'Escuro Inicial': Moon,
    'Primeiros Brotos': Sprout,
    'Luz e Crescimento': Sun,
    'Hidratar Sementes': Droplets,
    'Germinação no Escuro': Moon,
    'Exposição à Luz': Sun,
    'Enxágue e Drenagem': Droplets,
    'Luz e Colheita': Sun,
  };
  // Try direct icon name first, then title mapping, then default
  return icons[iconName] || icons[iconName.split(' ')[0]] || Library; // Try matching first word too
};


interface SpeciesDetailProps {
  speciesId: string;
  onBack: () => void;
}

const SpeciesDetail: React.FC<SpeciesDetailProps> = ({ speciesId, onBack }) => {
  const species = getSpeciesById(speciesId);

  // State Management using localStorage for persistence
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return new Set(favorites).has(speciesId);
  });
  const [isCultivated, setIsCultivated] = useState<boolean>(() => {
    const cultivated = JSON.parse(localStorage.getItem('cultivated') || '{}');
    return cultivated[speciesId] || false;
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const progress = JSON.parse(localStorage.getItem('cultivationProgress') || '{}');
    return progress[speciesId] || [];
  });

  // Update localStorage when state changes
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = new Set(favorites);
    if (isFavorite) {
      newFavorites.add(speciesId);
    } else {
      newFavorites.delete(speciesId);
    }
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
  }, [isFavorite, speciesId]);

  useEffect(() => {
    const cultivated = JSON.parse(localStorage.getItem('cultivated') || '{}');
    cultivated[speciesId] = isCultivated;
    localStorage.setItem('cultivated', JSON.stringify(cultivated));
  }, [isCultivated, speciesId]);

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('cultivationProgress') || '{}');
    progress[speciesId] = completedSteps;
    localStorage.setItem('cultivationProgress', JSON.stringify(progress));
  }, [completedSteps, speciesId]);


  if (!species) {
    // Improved Not Found State
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-eco-light-bg dark:bg-eco-dark-bg p-6 text-center">
         <Zap size={64} className="text-yellow-500 mb-4" /> {/* Now Zap is imported */}
        <h2 className="text-2xl font-bold text-eco-primary dark:text-eco-accent-light mb-2">Oops! Espécie não encontrada.</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Não conseguimos encontrar os detalhes para esta espécie.</p>
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 bg-eco-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar para o Guia
        </button>
      </div>
    );
  }

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleCultivated = () => setIsCultivated(!isCultivated);

  const toggleStepCompletion = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Share functionality (basic example using Web Share API if available)
  const handleShare = async () => {
    const shareData = {
      title: `Guia de Cultivo: ${species.name}`,
      text: `Aprenda a cultivar ${species.name} com o ECOMICRO! Pronto em ${species.cultivationTime}.`,
      url: window.location.href, // Or a specific link to the species
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Conteúdo compartilhado com sucesso!');
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(`${shareData.text} Veja mais em: ${shareData.url}`);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
      alert('Não foi possível compartilhar no momento.');
    }
  };

  // Map difficulty levels to icons or display text
  // Use difficultyLevel for mapping, but display difficulty text
  const difficultyMap: { [key in Species['difficultyLevel']]: { icon: React.ElementType, text: string } } = {
    'Iniciante': { icon: Award, text: species.difficulty }, // Display 'Fácil'
    'Intermediário': { icon: Lightbulb, text: species.difficulty }, // Display 'Médio'
    'Avançado': { icon: Zap, text: species.difficulty }, // Display 'Difícil'
  };
  const DifficultyIcon = difficultyMap[species.difficultyLevel]?.icon || Puzzle;
  const difficultyText = difficultyMap[species.difficultyLevel]?.text || species.difficulty; // Fallback to original text


  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24">
      {/* Back Button - Premium Style */}
       <button
          onClick={onBack}
          className="fixed top-5 left-4 z-50 p-2.5 bg-white/80 dark:bg-black/60 text-gray-800 dark:text-white rounded-full shadow-lg hover:bg-white dark:hover:bg-black/80 transition-colors backdrop-blur-sm"
          aria-label="Voltar"
        >
          <ArrowLeft size={22} />
        </button>

      {/* Header: Banner Image */}
      <div className="relative h-64 md:h-80 w-full">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover"
          onError={(e) => { // Basic image error handling
             console.error(`Failed to load image: ${species.image}`);
             // Optional: Replace with a placeholder or hide the image
             // e.currentTarget.src = '/path/to/placeholder.png';
             // e.currentTarget.style.display = 'none'; // Hide broken image
           }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
         {/* Species Name Overlay */}
         <div className="absolute bottom-4 left-4 md:left-6 text-white z-10">
           <h1 className="text-3xl md:text-4xl font-bold drop-shadow-md">{species.name}</h1>
           {/* Caption Below Name */}
           <p className="text-sm md:text-base opacity-90 drop-shadow-sm">{species.name} – Pronto em {species.cultivationTime}</p>
         </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">

        {/* Quick Info Cards - Premium Style */}
        <h2 className="text-xl font-semibold mb-4 text-eco-primary dark:text-eco-accent-light">Informações Rápidas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock, label: 'Duração', value: species.cultivationTime },
            { icon: Droplets, label: 'Regas', value: species.watering },
            { icon: Sun, label: 'Luz', value: species.light }, // Display user-friendly text
            { icon: DifficultyIcon, label: 'Dificuldade', value: difficultyText }, // Use mapped icon/text
          ].map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-3 transition-shadow hover:shadow-md">
                <div className="p-2 bg-eco-secondary/50 dark:bg-eco-primary/30 rounded-full">
                   <Icon className="w-5 h-5 text-eco-primary dark:text-eco-accent-light" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{info.label}</p>
                  <p className="text-sm font-medium">{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline - Premium Visuals */}
        <h2 className="text-xl font-semibold mb-6 text-eco-primary dark:text-eco-accent-light">📆 Linha do Tempo do Cultivo</h2>
        <div className="relative pl-8 space-y-8 border-l-2 border-eco-secondary dark:border-eco-primary/50">
          {species.timeline && species.timeline.length > 0 ? species.timeline.map((step, index) => {
            // Improved Icon fetching: Use step.icon first, then try mapping step.title
            const Icon = getIcon(step.icon) || getIcon(step.title) || Library; // Fallback to Library icon
            const isCompleted = completedSteps.includes(index);
            return (
              <div key={index} className="relative flex items-start space-x-5">
                 {/* Timeline Dot & Icon - Enhanced */}
                 <div className="absolute -left-[42px] top-0 flex flex-col items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ring-4 ring-eco-light-bg dark:ring-eco-dark-bg transition-colors ${isCompleted ? 'bg-green-500 dark:bg-green-600' : 'bg-eco-secondary dark:bg-eco-primary/80'}`}>
                      <Icon className={`w-6 h-6 transition-colors ${isCompleted ? 'text-white' : 'text-eco-primary dark:text-eco-accent-light'}`} />
                    </div>
                    {/* Vertical line connecting dots (optional, adds complexity) */}
                    {/* {index < species.timeline.length - 1 && <div className="mt-2 w-0.5 h-full bg-eco-secondary dark:bg-eco-primary/50"></div>} */}
                 </div>

                 {/* Content Card - Premium Style */}
                 <div className={`flex-grow p-5 rounded-lg shadow-sm w-full transition-all duration-300 ${isCompleted ? 'bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700/50 opacity-80' : 'bg-white dark:bg-gray-800'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Dia {step.day}</span>
                        <h4 className={`font-semibold text-base mb-1 ${isCompleted ? 'text-green-800 dark:text-green-200 line-through' : 'text-eco-text-dark dark:text-eco-text-light'}`}>{step.title}</h4>
                        <p className={`text-sm ${isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'} mb-1`}>{step.description}</p>
                        {step.details && <p className={`text-xs italic ${isCompleted ? 'text-green-600 dark:text-green-400/80' : 'text-gray-500 dark:text-gray-400'}`}>{step.details}</p>}
                      </div>
                      {/* Checkbox - Enhanced */}
                      <label className="flex items-center cursor-pointer ml-4 mt-1 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => toggleStepCompletion(index)}
                          className="opacity-0 w-0 h-0 peer" // Hide default checkbox
                          aria-label={`Marcar etapa ${step.title} como concluída`}
                        />
                         <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-eco-primary border-eco-primary dark:bg-eco-accent-light dark:border-eco-accent-light' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-eco-primary/50 dark:peer-focus:ring-offset-gray-800'}`}>
                           {isCompleted && <CheckCircle size={16} className="text-white dark:text-eco-dark-bg" />}
                         </span>
                      </label>
                    </div>
                 </div>
              </div>
            );
          }) : (
            <div className="relative flex items-start space-x-5">
               {/* Placeholder Dot */}
               <div className="absolute -left-[42px] top-0 flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full ring-4 ring-eco-light-bg dark:ring-eco-dark-bg bg-gray-300 dark:bg-gray-600">
                    <Library className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
               </div>
               {/* Placeholder Content */}
               <div className="flex-grow p-5 rounded-lg shadow-sm w-full bg-white dark:bg-gray-800">
                 <p className="text-gray-500 dark:text-gray-400 italic">Linha do tempo ainda não disponível para esta espécie.</p>
               </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Premium Layout & Style */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-center gap-4">
           {/* Mark as Cultivated */}
           <button
            onClick={toggleCultivated}
            className={`flex items-center justify-center px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 w-full sm:w-auto ${
              isCultivated
                ? 'bg-green-600 border-green-600 text-white hover:bg-green-700 shadow-md'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm'
            }`}
          >
            <CheckSquare size={18} className="mr-2" /> {isCultivated ? 'Cultivo Concluído!' : 'Marcar como Cultivado'}
          </button>

          {/* Favorite */}
          <button
            onClick={toggleFavorite}
            className={`flex items-center justify-center px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 w-full sm:w-auto ${
              isFavorite
                ? 'bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 shadow-md'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm'
            }`}
          >
            <Star size={18} className="mr-2 transition-transform duration-150" fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Remover Favorito' : 'Adicionar Favorito'}
          </button>

           {/* Share */}
           <button
             onClick={handleShare}
             className="flex items-center justify-center px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 w-full sm:w-auto bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm"
           >
             <Share2 size={18} className="mr-2" /> Compartilhar
           </button>

           {/* Video Guide (Conditional) */}
           {species.videoUrl && (
             <a
               href={species.videoUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center justify-center px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 w-full sm:w-auto bg-blue-500 border-blue-500 text-white hover:bg-blue-600 shadow-md"
             >
               <Video size={18} className="mr-2" /> Ver Vídeo Guia
             </a>
           )}
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail;
