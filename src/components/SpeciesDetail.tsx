import React from 'react';
import { ArrowLeft, Clock, Sun, Droplets, Puzzle, Star, CheckSquare, Video, Library, Moon, Sprout, Scissors } from 'lucide-react'; // Added more specific icons
import { Species, TimelineStep, getSpeciesById } from '../data/speciesData'; // Import types and getter

// Helper to get Lucide icon component by name string
const getIcon = (iconName: string): React.ElementType => {
  const icons: { [key: string]: React.ElementType } = {
    Clock, Sun, Droplets, Puzzle, Star, CheckSquare, Video, Library, ArrowLeft,
    // Timeline icons (using more specific ones now)
    Moon: Moon,
    Sprout: Sprout,
    Scissors: Scissors,
    // Add more as needed based on speciesData.ts
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
  // State to track completed timeline steps (using index for simplicity)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

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

  // Toggle completion state for a timeline step
  const toggleStepCompletion = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24"> {/* Increased pb */}
      {/* Back Button - Improved Style */}
       <button
          onClick={onBack}
          className="absolute top-5 left-4 z-50 p-2 bg-white/70 dark:bg-black/50 text-gray-800 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-black/70 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft size={20} />
        </button>

      {/* Main Image */}
      <div className="relative h-72 md:h-96"> {/* Increased height */}
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-6 -mt-16 md:-mt-20 relative z-10"> {/* Adjusted negative margin */}
        {/* Title - Moved below image */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{species.name}</h1>

        {/* Quick Info Cards - Improved Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"> {/* Increased gap and mb */}
          {[
            { icon: Clock, label: 'Duração', value: species.cultivationTime },
            { icon: Sun, label: 'Luz', value: species.light },
            { icon: Droplets, label: 'Regas', value: species.watering },
            { icon: Puzzle, label: 'Dificuldade', value: species.difficulty },
          ].map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105"> {/* Changed to flex-col, centered, added hover */}
                <Icon className="w-7 h-7 text-eco-primary dark:text-eco-accent-light mb-2" /> {/* Increased icon size */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">{info.label}</p> {/* Uppercase label */}
                  <p className="text-base font-semibold">{info.value}</p> {/* Increased value size */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline - Enhanced Visuals */}
        <h2 className="text-2xl font-bold text-eco-primary dark:text-eco-accent-light mb-6">📆 Linha do Tempo do Cultivo</h2> {/* Increased size and mb */}
        <div className="relative pl-6 space-y-6 border-l-2 border-eco-secondary dark:border-eco-primary/50"> {/* Added left border for timeline */}
          {species.timeline.map((step, index) => {
            const Icon = getIcon(step.icon);
            const isCompleted = completedSteps.includes(index);
            return (
              <div key={index} className="relative flex items-start space-x-4">
                 {/* Timeline Dot & Icon */}
                 <div className="absolute -left-[30px] top-1 flex flex-col items-center"> {/* Position icon on the line */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isCompleted ? 'bg-green-500 dark:bg-green-600' : 'bg-eco-secondary dark:bg-eco-primary/80'} ring-4 ring-eco-light-bg dark:ring-eco-dark-bg`}>
                      <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-eco-primary dark:text-eco-accent-light'}`} />
                    </div>
                    <span className="mt-1 text-xs font-semibold text-gray-600 dark:text-gray-400">Dia {step.day}</span>
                 </div>

                 {/* Content Card */}
                 <div className={`flex-grow p-4 rounded-lg shadow-sm w-full ${isCompleted ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50' : 'bg-white dark:bg-gray-800'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-semibold mb-1 ${isCompleted ? 'text-green-800 dark:text-green-200' : ''}`}>{step.title}</h4>
                        <p className={`text-sm ${isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'} mb-1`}>{step.description}</p>
                        {step.details && <p className={`text-xs italic ${isCompleted ? 'text-green-600 dark:text-green-400/80' : 'text-gray-500 dark:text-gray-400'}`}>{step.details}</p>}
                      </div>
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleStepCompletion(index)}
                        className="ml-4 mt-1 form-checkbox h-5 w-5 text-eco-primary dark:text-eco-accent-light rounded border-gray-300 dark:border-gray-600 focus:ring-eco-primary/50 bg-white dark:bg-gray-700 flex-shrink-0 cursor-pointer"
                        aria-label={`Marcar etapa ${step.title} como concluída`}
                      />
                    </div>
                     {/* REMOVED: Optional Step Image */}
                     {/* {step.image && (
                       <img src={step.image} alt={`Etapa ${step.day}`} className="mt-3 w-full h-24 object-cover rounded-md sm:w-32 sm:h-20" />
                     )} */}
                 </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons - Improved Layout & Style */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-center gap-4"> {/* Added top border, centered */}
           <button
            onClick={toggleCultivated}
            className={`flex items-center justify-center px-6 py-3 rounded-lg border text-base font-medium transition-colors w-full sm:w-auto ${
              isCultivated
                ? 'bg-green-600 border-green-600 text-white hover:bg-green-700'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <CheckSquare size={20} className="mr-2" /> {isCultivated ? 'Cultivo Concluído!' : 'Marcar como Cultivado'}
          </button>
          <button
            onClick={toggleFavorite}
            className={`flex items-center justify-center px-6 py-3 rounded-lg border text-base font-medium transition-colors w-full sm:w-auto ${
              isFavorite
                ? 'bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <Star size={20} className="mr-2" fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Remover Favorito' : 'Adicionar aos Favoritos'}
          </button>
           {/* Conditionally render Video button - Example */}
           {/* <button className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-base font-medium w-full sm:w-auto">
             <Video size={20} className="mr-2" /> Ver Vídeo Guia
           </button> */}
        </div>
      </div>

      {/* Bottom Navigation is handled by App.tsx */}
    </div>
  );
};

export default SpeciesDetail;
