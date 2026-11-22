import { useState } from 'react'; // useState қосылды
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getDailyQuests } from '../data/quests'; // Тапсырмаларды импорттау

const worlds = [
  {
    id: 1,
    name: '1. Теңдеулер орманы',
    unlocked: true,
    progress: '15/30',
    stars: 3,
    image: '/images/world1.jfif',
    x: '25%',
    y: '50%',
  },
  {
    id: 2,
    name: '2. Геометрия гибадаттанасы',
    unlocked: true,
    progress: '10/30',
    stars: 2,
    image: '/images/world2.jfif',
    x: '55%',
    y: '30%',
  },
  {
    id: 3,
    name: '3. Функциялар обсерваториясы',
    unlocked: false,
    progress: '0/30',
    stars: 0,
    image: '/images/world3.jfif',
    x: '80%',
    y: '25%',
  },
  {
    id: 4,
    name: '4. Финалдық сынақ',
    unlocked: false,
    progress: '0/30',
    stars: 0,
    image: '/images/world4.jfif',
    x: '60%',
    y: '70%',
  },
];

export default function Map() {
  const navigate = useNavigate();
  const [showQuests, setShowQuests] = useState(false); // Модальді терезе күйі
  const quests = getDailyQuests(); // Тапсырмаларды алу

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

        {/* Қисық сызықтар (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 250 500 Q 400 400 550 300 T 800 250"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="none"
            opacity="0.5"
          />
        </svg>

        {/* Әлемдер және батырмалар */}
        <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center">
          
          {/* Күнделікті тапсырмалар батырмасы */}
          <button 
            onClick={() => setShowQuests(true)}
            className="absolute top-8 right-8 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2 transition z-50"
          >
            📅 Күнделікті тапсырмалар
          </button>

          {/* Әлемдер картасы */}
          <div className="relative w-full max-w-5xl h-[600px]">
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
                      className={`w-40 h-40 object-cover rounded-full border-4 border-purple-500/50 shadow-[0_0_30px_rgba(139,92,246,0.5)] ${
                        !world.unlocked && 'grayscale brightness-50'
                      }`}
                    />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center text-8xl">🏝️</div>
                  )}
                  {!world.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/20 shadow-xl">
                        <span className="text-4xl">🔒</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <p className="text-white text-sm font-bold">{world.name}</p>
                  <p className="text-yellow-400 text-xs">
                    {'⭐'.repeat(world.stars) || '☆☆☆'} {world.progress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Төменгі жазу */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-300 text-sm z-10">
          Кеңес: деңгейлерді аяқтап, тәжірибе жина!
        </p>
      </div>

      {/* Күнделікті тапсырмалар модальді терезесі */}
      {showQuests && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border-2 border-yellow-500 p-8 rounded-2xl max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setShowQuests(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">📅 Күнделікті тапсырмалар</h2>
            
            <div className="flex flex-col gap-4">
              {quests.map((quest) => (
                <div key={quest.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold ${quest.isDone ? 'text-green-400' : 'text-white'}`}>
                      {quest.title}
                    </span>
                    <span className="text-yellow-400 text-sm">{quest.reward}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${quest.isDone ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${(quest.current / quest.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm w-12 text-right">
                      {quest.current}/{quest.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              Тапсырмалар күн сайын жаңарып отырады!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}