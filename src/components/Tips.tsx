import React, { useState } from 'react';
import {
  Droplets,
  Sun,
  Bug,
  FlaskConical,
  SprayCan,
  Clock,
  Award,
  Search,
  ChevronRight,
  Star,
} from 'lucide-react';

// Placeholder data for tips
const tipsData = [
  {
    id: 'tip1',
    category: '💧 Regas',
    title: 'Como saber a hora certa de regar seus microverdes',
    description: 'Observe o substrato: se estiver seco ao toque, regue...',
    imageUrl: 'https://images.unsplash.com/photo-1603562424154-7f964d742523?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullDescription: 'Regue pela manhã para evitar fungos. Use um borrifador...',
    bonusTip: 'Evite regar em excesso, o encharcamento favorece o aparecimento de fungos.',
    relatedSpecies: ['rabanete', 'brocolis'],
  },
  {
    id: 'tip2',
    category: '☀️ Iluminação',
    title: 'A importância da luz solar para o crescimento',
    description: 'Microverdes precisam de luz para fotossíntese...',
    imageUrl: 'https://images.unsplash.com/photo-1517588217475-efc49d5a7e18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullDescription: 'A luz ideal é indireta. Evite exposição direta ao sol forte...',
    bonusTip: 'Use luz artificial se não houver luz natural suficiente.',
    relatedSpecies: ['alfafa', 'girassol'],
  },
  {
    id: 'tip3',
    category: '🐛 Pragas',
    title: 'Como identificar e combater pulgões',
    description: 'Pulgões são pequenos insetos que se alimentam da seiva...',
    imageUrl: 'https://images.unsplash.com/photo-1617385321847-2a9937ca5c14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullDescription: 'Lave as folhas com água e sabão neutro. Use óleo de neem...',
    bonusTip: 'Inspecione regularmente as folhas para detectar pragas.',
    relatedSpecies: ['mostarda', 'rucula'],
  },
  {
    id: 'tip4',
    category: '🧪 Nutrientes',
    title: 'A importância dos nutrientes no substrato',
    description: 'Nutrientes essenciais para o crescimento saudável...',
    imageUrl: 'https://images.unsplash.com/photo-1563723922448-4e5749891ff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullDescription: 'Use substrato rico em matéria orgânica. Adicione fertilizantes...',
    bonusTip: 'Evite o excesso de fertilizantes, pode prejudicar o crescimento.',
    relatedSpecies: ['ervilha', 'couve'],
  },
  {
    id: 'tip5',
    category: '🧼 Higiene',
    title: 'A importância da higiene no cultivo',
    description: 'A higiene é fundamental para evitar doenças...',
    imageUrl: 'https://images.unsplash.com/photo-1557426664-28b0b198271a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullDescription: 'Lave bem as mãos antes de manusear as sementes. Limpe os recipientes...',
    bonusTip: 'Use água filtrada para evitar contaminação.',
    relatedSpecies: ['chia', 'linhaça'],
  },
  {
    id: 'tip6',
    category: '⏳ Tempo de cultivo',
    title: 'Como otimizar o tempo de cultivo',
    description: 'O tempo de cultivo varia de acordo com a espécie...',
    imageUrl: 'https://images.unsplash.com/photo-1563723922448-4e5749891ff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullDescription: 'Escolha espécies com tempo de cultivo curto. Use técnicas de germinação...',
    bonusTip: 'Monitore a temperatura e a umidade para acelerar o crescimento.',
    relatedSpecies: ['mostarda', 'rucula'],
  },
  {
    id: 'tip7',
    category: '🌈 Dicas avançadas',
    title: 'Técnicas avançadas de cultivo',
    description: 'Aprenda técnicas avançadas para aumentar a produtividade...',
    imageUrl: 'https://images.unsplash.com/photo-1563723922448-4e5749891ff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D',
    fullDescription: 'Use hidroponia. Faça aeração do substrato...',
    bonusTip: 'Monitore a temperatura e a umidade para acelerar o crescimento.',
    relatedSpecies: ['ervilha', 'couve'],
  },
];

const categoryIcons = {
  '💧 Regas': Droplets,
  '☀️ Iluminação': Sun,
  '🐛 Pragas': Bug,
  '🧪 Nutrientes': FlaskConical,
  '🧼 Higiene': SprayCan,
  '⏳ Tempo de cultivo': Clock,
  '🌈 Dicas avançadas': Award,
};

const Tips = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) newFavorites.delete(id);
      else newFavorites.add(id);
      return newFavorites;
    });
  };

  const filteredTips = tipsData.filter(tip => {
    const matchesCategory = !activeCategory || tip.category === activeCategory;
    const matchesSearch =
      searchTerm === '' || tip.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prevCategory => (prevCategory === category ? null : category));
  };

  const clearSearch = () => setSearchTerm('');

  return (
    <div className="min-h-screen bg-eco-light-bg dark:bg-eco-dark-bg text-eco-text-dark dark:text-eco-text-light font-sans pb-24">
      {/* Top of Page */}
      <div className="bg-eco-light-bg dark:bg-eco-dark-bg shadow-md pt-6 pb-4 px-4 sticky top-0 z-40">
        <h1 className="text-3xl font-bold text-eco-primary dark:text-eco-accent-light mb-2 text-center">
          🌿 Dicas de Cultivo Inteligente
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          Pequenas ações que fazem grande diferença no seu cultivo.
        </p>

        {/* Search Bar (Optional) */}
        <div className="relative flex items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por problema, dúvida ou tema..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 dark:focus:ring-eco-accent-light/50 text-base"
          />
          <Search
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Limpar busca"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Intelligent Filter by Category */}
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-4">
          {Object.keys(categoryIcons).map(category => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-eco-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon size={16} />
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips Cards */}
      <div className="py-6 px-4">
        {filteredTips.length > 0 ? (
          <ul className="space-y-6">
            {filteredTips.map(tip => (
              <li
                key={tip.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
              >
                <img src={tip.imageUrl} alt={tip.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{tip.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                    {tip.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="text-eco-primary dark:text-eco-accent-light hover:underline">
                      Ver mais
                    </button>
                    <Star
                      size={20}
                      className={`cursor-pointer ${
                        favorites.has(tip.id) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-500'
                      }`}
                      onClick={() => toggleFavorite(tip.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // Empty State
          <div className="text-center mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Nenhuma dica encontrada para esse filtro.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Que tal explorar outro tema?
            </p>
            <button className="bg-eco-primary text-white rounded-full px-4 py-2">
              Ver todas as dicas
            </button>
          </div>
        )}
      </div>

      {/* Dica do Dia (Bloco Especial) */}
      <div className="bg-eco-secondary dark:bg-eco-primary text-eco-primary dark:text-white p-4 rounded-2xl shadow-md mx-4 mb-6">
        <div className="flex items-start space-x-3">
          <Award size={24} />
          <div>
            <h3 className="font-semibold">💡 Dica do Dia</h3>
            <p className="text-sm">
              Evite regar no final da tarde — isso pode favorecer fungos!
            </p>
            <div className="flex justify-end mt-2">
              <button className="text-sm hover:underline">Salvar</button>
              <button className="text-sm hover:underline">Compartilhar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Curadoria Personalizada */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold text-eco-text-dark dark:text-eco-text-light mb-3">
          Dicas para você, Matheus
        </h3>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {/* Placeholder for personalized tips */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md w-64 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Baseado nas suas espécies cultivadas.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md w-64 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Baseado nos benefícios que você busca.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
