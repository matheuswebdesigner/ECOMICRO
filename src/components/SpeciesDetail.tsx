import React from 'react';
import { ArrowLeft, Clock, Sun, Droplets, Puzzle, Star, CheckSquare, Video, Library } from 'lucide-react';
import { Species, TimelineStep, getSpeciesById } from '../data/speciesData'; // Import types and getter

// Helper to get Lucide icon component by name string
const getIcon = (iconName: string): React.ElementType => {
  // Add more icons as needed for timeline steps
  const icons: { [key: string]: React.ElementType } = {
    Clock, Sun, Droplets, Puzzle, Star, CheckSquare, Video, Library, ArrowLeft,
    // Add timeline icons based on speciesData.ts
    Moon: Droplets, // Placeholder, replace with actual Moon icon if available or needed
    Sprout: Droplets, // Placeholder
    Scissors: Droplets, // Placeholder
  };
  return icons[iconName] || Library; // Default to Library icon if not found
};


interface SpeciesDetailProps {
  speciesId: string;
  onBack: () => void; // Function to go back to the list
  // Add props for favorite status and toggle if managed outside
}

const SpeciesDetail: React.FC<SpeciesDetailProps> = ({ speciesId, onBack }) => {
  const species = getSpeciesById(speciesId);
  const [isFavorite, setIsFavorite] = React.useState(false); // Local state for demo
  const [isCultivated, setIsCultivated] = React.useState(false); // Local state for demo

  if (!species) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-eco-light-bg dark:bg-eco-dark-bg p-4">
        <p className="text-red-500 dark:text-red-400 mb-4">Espécie não encontrada.</p>
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 bg-eco-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar
        </button>
      </div>
    );
  }

  const toggleFavorite = () => setIsFavorite(!isFavorite); // Placeholder
  const toggleCultivated = () => setIsCultivated(!isCultivated); // Placeholder

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24">
      {/* Back Button */}
       <button
          onClick={onBack}
          className="absolute top-4 left-4 z-50 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </button>

      {/* Main Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> {/* Optional gradient overlay */}
         <p className="absolute bottom-2 left-4 text-xs text-white/80 italic">
           Imagem real do microverde pronto para colheita
         </p>
      </div>

      <div className="container mx-auto px-4 py-6 -mt-16 relative z-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-md">{species.name}</h1>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Clock, label: 'Duração', value: species.cultivationTime },
            { icon: Sun, label: 'Luz', value: species.light },
            { icon: Droplets, label: 'Regas', value: species.watering },
            { icon: Puzzle, label: 'Dificuldade', value: species.difficulty },
          ].map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex items-center space-x-2">
                <Icon className="w-5 h-5 text-eco-primary dark:text-eco-accent-light flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                  <p className="text-sm font-medium">{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <h2 className="text-xl font-bold text-eco-primary dark:text-eco-accent-light mb-4">📆 Linha do Tempo</h2>
        <div className="space-y-4">
          {species.timeline.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                 {/* Icon and Day */}
                 <div className="flex flex-col items-center mr-2 flex-shrink-0">
                   <div className="bg-eco-secondary/50 dark:bg-eco-primary/50 p-2 rounded-full mb-1">
                     <Icon className="w-6 h-6 text-eco-primary dark:text-eco-accent-light" />
                   </div>
                   <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">Dia {step.day}</span>
                 </div>

                 {/* Text Content */}
                 <div className="flex-grow">
                   <h4 className="font-semibold mb-1">{step.title}</h4>
                   <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{step.description}</p>
                   {step.details && <p className="text-xs text-gray-500 dark:text-gray-400 italic">{step.details}</p>}
                 </div>

                 {/* Optional Step Image */}
                 {step.image && (
                   <img src={step.image} alt={`Etapa ${step.day}`} className="w-20 h-16 object-cover rounded-md flex-shrink-0 ml-4 hidden sm:block" />
                 )}

                 {/* TODO: Add Checkbox for step completion */}
                 {/* <input type="checkbox" className="ml-auto form-checkbox h-5 w-5 text-eco-primary rounded focus:ring-eco-primary/50" /> */}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:space-x-4">
           <button
            onClick={toggleCultivated}
            className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-colors ${
              isCultivated
                ? 'bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-300'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <CheckSquare size={18} className="mr-2" /> {isCultivated ? 'Cultivado!' : 'Marcar Cultivado'}
          </button>
          <button
            onClick={toggleFavorite}
            className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-700 dark:text-yellow-300'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Star size={18} className="mr-2" fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Favorito!' : 'Favoritar'}
          </button>
           {/* Conditionally render Video button */}
           {/* <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
             <Video size={18} className="mr-2" /> Ver Vídeo
           </button> */}
        </div>
      </div>

      {/* TODO: Add Bottom Navigation if needed */}
    </div>
  );
};

export default SpeciesDetail;
