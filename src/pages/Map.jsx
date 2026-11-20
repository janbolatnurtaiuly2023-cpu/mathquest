import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const worlds = [
  {
    id: 1,
    name: '1. Теңдеулер орманы',
    unlocked: true,
    progress: '15/30',
    stars: 3,
    image: '/images/world1.jfif', // Өз форматыңызды қойыңыз
    x: '20%',
    y: '50%',
  },
  {
    id: 2,
    name: '2. Геометрия гибадаттанасы',
    unlocked: true, // Ашылған етіп қоямыз (тексеру үшін)
    progress: '10/30',
    stars: 2,
    image: '/images/world2.jfif',
    x: '50%',
    y: '25%',
  },
  {
    id: 3,
    name: '3. Функциялар обсерваториясы',
    unlocked: false, // Құлыпталған
    progress: '0/30',
    stars: 0,
    image: '/images/world3.jfif', // Жаңа сурет
    x: '80%',
    y: '40%',
  },
  {
    id: 4,
    name: '4. Финалдық сынақ',
    unlocked: false, // Құлыпталған
    progress: '0/30',
    stars: 0,
    image: '/images/world4.jfif', // Жаңа сурет
    x: '65%',
    y: '75%',
  },
];

export default function Map() {
  const navigate = useNavigate();

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

        {/* Қисық сызықтар */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 300 500 Q 400 400 550 300 T 800 250"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="none"
            opacity="0.5"
          />
        </svg>

        {/* Әлемдер */}
        <div className="relative z-10 w-full h-screen">
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
                  <div className="w-48 h-48 flex items-center justify-center text-8xl">
                    🏝️
                  </div>
                )}
                
                {/* Құлып иконкасы */}
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
    </div>
  );
}