import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getDailyQuests } from '../data/quests';

const worlds = [
  {
    id: 1,
    name: '1. Теңдеулер орманы',
    unlocked: true,
    progress: '15/30',
    stars: 3,
    image: '/images/world1.jfif',
    x: '20%',
    y: '25%',
  },
  {
    id: 2,
    name: '2. Геометрия гибадаттанасы',
    unlocked: true,
    progress: '10/30',
    stars: 2,
    image: '/images/world2.jfif',
    x: '50%',
    y: '20%',
  },
  {
    id: 3,
    name: '3. Функциялар обсерваториясы',
    unlocked: true,
    progress: '0/30',
    stars: 0,
    image: '/images/world3.jfif',
    x: '80%',
    y: '25%',
  },
  {
    id: 4,
    name: '4. Финалдық сынақ',
    unlocked: true,
    progress: '0/30',
    stars: 0,
    image: '/images/world4.jfif',
    x: '35%',
    y: '55%',
  },
  {
    id: 5,
    name: '5. Пропорциялар алаңы',
    unlocked: true,
    progress: '0/30',
    stars: 0,
    image: '/images/world3.jfif', 
    x: '65%',
    y: '55%',
  },
  {
    id: 6,
    name: '6. Проценттер мұнарасы',
    unlocked: true,
    progress: '0/30',
    stars: 0,
    image: '/images/world6.jfif', // 6-әлемнің суреті
    x: '25%', // Сол жаққа жылжыттық
    y: '85%',
  },
  {
    id: 7,
    name: '7. Ұлы финал',
    unlocked: true,
    progress: '0/30',
    stars: 0,
    image: '/images/world7.jfif', // 7-әлемнің суреті
    x: '75%', // Оң жаққа жылжыттық
    y: '85%',
  },
];

export default function Map() {
  const navigate = useNavigate();
  const [showQuests, setShowQuests] = useState(false);
  const quests = getDailyQuests();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 relative min-h-screen overflow-hidden">
        
        {/* Фон суреті */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background.jfif')" }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Қисық сызықтар (тек компьютерде көрінеді) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
          <path
            d="M 200 300 Q 400 200 600 300 T 900 400"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Негізгі контент */}
        <div className="relative z-10 w-full min-h-screen flex flex-col pt-20 pb-16 md:pt-0 md:justify-center">
          
          {/* Күнделікті тапсырмалар батырмасы */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
            <button 
              onClick={() => setShowQuests(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 text-sm md:text-base rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              📅 Күнделікті тапсырмалар
            </button>
          </div>

          {/* ================= КОМПЬЮТЕРГЕ АРНАЛҒАН КАРТА ================= */}
          <div className="hidden md:block relative w-full max-w-6xl h-[650px] mx-auto">
            {worlds.map((world) => (
              <div
                key={world.id}
                onClick={() => world.unlocked && navigate(`/levels/${world.id}`)}
                style={{ left: world.x, top: world.y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 text-center ${
                  world.unlocked ? 'cursor-pointer hover:scale-110' : 'opacity-80'
                } transition-transform duration-300`}
              >
                <div className="relative">
                  {world.image ? (
                    <img
                      src={world.image}
                      alt={world.name}
                      // Ақ жиекті жою үшін border сыныбы алынып тасталды
                      className={`w-36 h-36 lg:w-44 lg:h-44 object-cover rounded-full shadow-[0_0_30px_rgba(139,92,246,0.6)] ${
                        !world.unlocked && 'grayscale brightness-50'
                      }`}
                    />
                  ) : (
                    <div className="w-36 h-36 lg:w-44 lg:h-44 flex items-center justify-center text-8xl">🏝️</div>
                  )}
                  {!world.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/20 shadow-xl">
                        <span className="text-4xl">🔒</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg inline-block">
                  <p className="text-white text-sm font-bold">{world.name}</p>
                  <p className="text-yellow-400 text-xs">
                    {'⭐'.repeat(world.stars) || '☆☆☆'} {world.progress}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= ТЕЛЕФОНҒА АРНАЛҒАН КАРТА ================= */}
          <div className="md:hidden flex flex-col gap-4 w-full px-4 mt-12 pb-24 z-10">
            {worlds.map((world) => (
              <div
                key={world.id}
                onClick={() => world.unlocked && navigate(`/levels/${world.id}`)}
                className={`flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-sm transition ${
                  world.unlocked 
                    ? 'bg-slate-800/80 border-purple-500/50 cursor-pointer hover:bg-slate-700/80' 
                    : 'bg-slate-900/80 border-slate-700 opacity-60'
                }`}
              >
                {world.image ? (
                  <img 
                    src={world.image} 
                    alt={world.name} 
                    className={`w-16 h-16 rounded-full object-cover ${world.unlocked ? '' : 'grayscale'}`} 
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-3xl">🏝️</div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight">{world.name}</h3>
                  <p className="text-yellow-400 text-xs mt-1">
                    {'⭐'.repeat(world.stars) || '☆☆☆'} {world.progress}
                  </p>
                </div>
                
                {!world.unlocked && <span className="text-2xl mr-2">🔒</span>}
              </div>
            ))}
          </div>

        </div>

        {/* Төменгі жазу */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-300 text-xs md:text-sm z-10 text-center w-full">
          Кеңес: деңгейлерді аяқтап, тәжірибе жина!
        </p>
      </div>

      {/* Күнделікті тапсырмалар модальді терезесі */}
      {showQuests && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 border-2 border-yellow-500 p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => setShowQuests(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            
            <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 text-center">📅 Күнделікті тапсырмалар</h2>
            
            <div className="flex flex-col gap-4">
              {quests.map((quest) => (
                <div key={quest.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold text-sm md:text-base ${quest.isDone ? 'text-green-400' : 'text-white'}`}>
                      {quest.title}
                    </span>
                    <span className="text-yellow-400 text-xs md:text-sm">{quest.reward}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-700 rounded-full h-2 md:h-3">
                      <div 
                        className={`h-2 md:h-3 rounded-full ${quest.isDone ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${(quest.current / quest.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-xs md:text-sm w-10 md:w-12 text-right">
                      {quest.current}/{quest.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 text-xs md:text-sm mt-6">
              Тапсырмалар күн сайын жаңарып отырады!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}