// Placeholder data for microgreens species
// IMPORTANT: Replace placeholder image URLs with actual high-quality images.
// IMPORTANT: Ensure icon names match available Lucide icons or the getIcon map.

export interface TimelineStep {
  day: number | string;
  title: string;
  icon: string; // Icon name (e.g., 'Droplets', 'Moon', 'Sprout', 'Sun', 'Scissors')
  description: string;
  details?: string;
  image?: string; // Small illustration for the step (use real or consistent placeholders)
}

export interface Species {
  id: string;
  name: string;
  image: string; // Main image URL (high quality)
  cultivationTime: string; // e.g., "5 dias"
  light: string; // e.g., "Indireta"
  watering: string; // e.g., "2x por dia"
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  timeline: TimelineStep[];
  // Add other properties as needed, like benefits, taste profile etc.
}

export const speciesList: Species[] = [
  {
    id: 'rabanete-roxo',
    name: 'Rabanete Roxo',
    image: 'https://images.unsplash.com/photo-1629087140320-4a7f07a1f0c1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cultivationTime: '5 dias',
    light: 'Indireta',
    watering: '2x por dia',
    difficulty: 'Fácil',
    timeline: [
      { day: 1, title: 'Hidratação', icon: 'Droplets', description: 'Deixe as sementes de molho por 6-8 horas.', details: 'Use água filtrada. Recipiente de vidro com voal/gaze.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Hidratar' },
      { day: 2, title: 'Drenagem + Escuro', icon: 'Moon', description: 'Escorra bem. Mantenha coberto e úmido por 24h.', details: 'Use um pano escuro e úmido.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Drenar' },
      { day: 3, title: 'Germinação', icon: 'Sprout', description: 'Brotos começam a surgir. Mantenha úmido, sem luz direta.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Germinar' },
      { day: 4, title: 'Luz Suave', icon: 'Sun', description: 'Exponha à luz indireta. Borrife água 2x ao dia.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Luz' },
      { day: 5, title: 'Colheita', icon: 'Scissors', description: 'Com 5-7cm, corte rente à base com uma tesoura.', details: 'Pronto para consumir fresco!', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Colher' },
    ],
  },
  {
    id: 'brocolis',
    name: 'Brócolis',
    image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cultivationTime: '7 dias',
    light: 'Indireta',
    watering: '1-2x por dia',
    difficulty: 'Fácil',
    timeline: [
        { day: 1, title: 'Semear', icon: 'Droplets', description: 'Espalhe as sementes sobre substrato úmido.', details: 'Não precisa hidratar antes.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Semear' },
        { day: '2-3', title: 'Escuro & Úmido', icon: 'Moon', description: 'Cubra o recipiente para manter escuro e úmido.', details: 'Verifique a umidade diariamente.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Escuro' },
        { day: 4, title: 'Germinação Visível', icon: 'Sprout', description: 'Pequenos brotos aparecem. Remova a cobertura.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Germinar' },
        { day: '5-6', title: 'Luz Indireta', icon: 'Sun', description: 'Mova para local com luz indireta. Regue suavemente.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Luz' },
        { day: 7, title: 'Colheita', icon: 'Scissors', description: 'Corte quando as primeiras folhas verdadeiras aparecerem.', details: 'Idealmente com 5-8cm.', image: 'https://via.placeholder.com/150x100/E7F2EB/2D6A4F?text=Colher' },
    ], // Added example timeline
  },
  {
    id: 'mostarda',
    name: 'Mostarda',
    image: 'https://images.unsplash.com/photo-1589137201472-eb691e5b997c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cultivationTime: '6 dias',
    light: 'Plena/Indireta',
    watering: '2x por dia',
    difficulty: 'Fácil',
    timeline: [ /* Add timeline steps */ ],
  },
  {
    id: 'girassol',
    name: 'Girassol',
    image: 'https://images.unsplash.com/photo-1561051241-368c743649a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cultivationTime: '8 dias',
    light: 'Plena',
    watering: '1x por dia',
    difficulty: 'Médio',
    timeline: [ /* Add timeline steps */ ],
  },
   {
    id: 'rucula',
    name: 'Rúcula',
    image: 'https://images.unsplash.com/photo-1618511863161-a11b86016d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cultivationTime: '7 dias',
    light: 'Indireta',
    watering: '2x por dia',
    difficulty: 'Fácil',
    timeline: [ /* Add timeline steps */ ],
  },
   // ... Add remaining species placeholders
];

// Function to get species by ID (optional, but helpful)
export const getSpeciesById = (id: string): Species | undefined => {
  return speciesList.find(species => species.id === id);
};
