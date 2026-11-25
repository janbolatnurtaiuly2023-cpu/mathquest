import Sidebar from '../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

export default function Levels() {
  const navigate = useNavigate();
  const { worldId } = useParams();

  // Деңгейлердің ашылу логикасын localStorage-тен алу (Әлемге байланысты)
  const getLevels = () => {
    const baseLevels = [
      { id: 1, status: 'unlocked', stars: 0 }, // 1-деңгей әрқашан ашық
      { id: 2, status: 'locked', stars: 0 },
      { id: 3, status: 'locked', stars: 0 },
      { id: 4, status: 'locked', stars: 0 },
      { id: 5, status: 'locked', stars: 0 },
      { id: 6, status: 'locked', stars: 0 },
    ];

    return baseLevels.map((level) => {
      // Тексеру кезінде әлем нөмірін де қосамыз!
      const isCompleted = localStorage.getItem(`level_completed_${worldId}_${level.id}`) === 'true';
      const isUnlocked = localStorage.getItem(`level_unlocked_${worldId}_${level.id}`) === 'true';

      if (isCompleted) {
        return { ...level, status: 'completed', stars: 3 }; // Аяқталған, 3 жұлдыз
      }
      if (isUnlocked || level.id === 1) {
        return { ...level, status: 'unlocked', stars: 0 }; // Ашық
      }
      return level; // Құлыпталған
    });
  };

  const levels = getLevels();

  return (
    <div className="flex">
      <Sidebar />
      {/* Негізгі бет */}
      <div className="flex-1 relative min-h-screen overflow-hidden flex flex-col">
        
        {/* 1. АРТҚЫ ФОН СУРЕТІ */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/${worldId === '1' ? 'forest_bg.jfif' : worldId === '2' ? 'temple_bg.jfif' : 'background.jfif'}')` 
          }}
        ></div>
        {/* Фонды сәл қараңғылау */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Жоғарғы панель */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm border-b border-white/10 gap-2 md:gap-0">
          <h1 className="text-lg md:text-xl font-bold text-white text-center md:text-left mt-10 md:mt-0">
            {worldId === '1' ? '1. Теңдеулер орманы' : 
             worldId === '2' ? '2. Геометрия гибадаттанасы' : 
             worldId === '3' ? '3. Функциялар обсерваториясы' : 
             '4. Финалдық сынақ'}
          </h1>
          <div className="flex gap-4 text-sm">
            <span className="text-yellow-400">🪙 {localStorage.getItem('playerCoins') || '250'}</span>
            <span className="text-blue-400">💎 12</span>
          </div>
        </div>

        {/* Орталық бөлік: Деңгейлер */}
        <div className="relative z-10 flex-1 flex justify-center items-center py-10">
          <div className="flex justify-center items-center gap-2 md:gap-6 relative w-full max-w-5xl px-2 md:px-10">
            
            {/* 2. ҚИСЫҚ СЫЗЫҚ (SVG) - Деңгейлерді қосады */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
              <path
                d="M 50 200 Q 250 120 450 200 T 850 200"
                stroke="#fbbf24"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
                opacity="0.8"
              />
            </svg>

            {/* Деңгей шеңберлері */}
            {levels.map((level) => (
              <div 
                key={level.id} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => level.status !== 'locked' && navigate(`/question/${worldId}/${level.id}`)}
              >
                {/* Телефонда кішірек (w-14 h-14), компьютерде үлкенірек (md:w-20 md:h-20) */}
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl md:text-3xl font-bold border-4 transition-transform duration-300 group-hover:scale-110 ${
                  level.status === 'completed' 
                    ? 'bg-green-800/80 border-yellow-400 text-yellow-400' 
                    : level.status === 'locked'
                    ? 'bg-slate-900/80 border-gray-600 text-gray-500'
                    : 'bg-slate-800/80 border-gray-400 text-white'
                }`}>
                  {level.status === 'locked' ? '🔒' : level.id}
                </div>
                
                {/* Жұлдыздар */}
                <div className="mt-2 md:mt-3 text-yellow-400 text-sm md:text-xl tracking-widest drop-shadow-md">
                  {level.stars > 0 ? '⭐'.repeat(level.stars) : (
                    <span className="text-gray-500 text-xs md:text-lg">☆☆☆</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Төменгі прогресс панелі */}
        <div className="relative z-10 p-4 md:p-6 mt-auto">
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center shadow-2xl gap-4 md:gap-0">
            <div className="w-full md:w-1/3 md:border-r border-white/10 text-center md:text-left">
              <p className="text-gray-400 text-xs md:text-sm mb-1">Жиналған жұлдыздар:</p>
              <p className="text-yellow-400 font-bold text-lg md:text-2xl flex items-center justify-center md:justify-start gap-2">⭐ 15/30</p>
            </div>
            <div className="w-full md:w-2/3 md:pl-8">
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span className="text-gray-400">Даралық прогресс:</span>
                <span className="text-white font-bold">50%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 md:h-3 overflow-hidden">
                <div className="bg-blue-500 h-2 md:h-3 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}