import React, { useState } from 'react';
import { ArrowRight, Leaf, Zap, Droplets } from 'lucide-react';

interface OnboardingStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ icon: Icon, title, description, image }) => (
  <div className="flex flex-col items-center text-center px-6 h-full justify-center">
    <img src={image} alt={title} className="w-48 h-48 md:w-64 md:h-64 object-contain mb-8 rounded-lg shadow-lg" />
    <div className="mb-4 bg-eco-primary/10 dark:bg-eco-accent-light/10 p-3 rounded-full">
       <Icon className="w-8 h-8 text-eco-primary dark:text-eco-accent-light" />
    </div>
    <h2 className="text-2xl font-bold text-eco-primary dark:text-eco-accent-light mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 max-w-xs">{description}</p>
  </div>
);

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: Leaf,
      title: 'Cultivo Simplificado',
      description: 'Aprenda a cultivar microverdes em casa de forma fácil e rápida.',
      image: 'https://images.unsplash.com/photo-1598060024967-4641f866a2d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with relevant image URL
    },
    {
      icon: Zap,
      title: 'Nutrição Potente',
      description: 'Descubra os incríveis benefícios dos microverdes para sua saúde.',
      image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with relevant image URL
    },
    {
      icon: Droplets,
      title: 'Dicas e Guias',
      description: 'Acesse guias completos, da semente à colheita, na palma da sua mão.',
      image: 'https://images.unsplash.com/photo-1530836131658-d06a8a3a59a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with relevant image URL
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-eco-light-bg dark:bg-eco-dark-bg flex flex-col justify-between items-center p-6 font-sans">
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-sm text-gray-500 dark:text-gray-400 hover:text-eco-primary dark:hover:text-eco-accent-light transition-colors"
      >
        Pular
      </button>

      {/* Content Area */}
      <div className="flex-grow flex items-center justify-center w-full max-w-md">
         {/* Render the current step */}
         <OnboardingStep {...steps[step]} />
      </div>


      {/* Pagination and Next Button */}
      <div className="w-full max-w-md flex items-center justify-between mt-8">
        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`block w-2 h-2 rounded-full transition-colors ${
                index === step ? 'bg-eco-primary dark:bg-eco-accent-light' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="bg-eco-primary text-white dark:bg-eco-accent-light dark:text-eco-dark-bg rounded-full p-3 shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Próximo"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
