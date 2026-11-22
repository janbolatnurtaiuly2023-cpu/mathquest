import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAchievements } from '../data/achievements';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Бет ашылғанда жетістіктерді жүктеу
    const data = getAchievements();
    console.log("Жүктелген жетістіктер:", data); // Консольде тексеру үшін
    setAchievements(data);
  }, []);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 bg-slate-900 min-h-screen pt-16 md:pt-8">
        
        {/* Тақырып және статистика */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl font-bold text-white">Жетістіктер</h1>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
            <span className="text-yellow-400 font-bold text-lg">{unlockedCount}</span>
            <span className="text-gray-400 text-sm">/ {achievements.length} ашылды</span>
          </div>
        </div>

        {/* Жетістіктер торы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {achievements.map((ach) => (
            <div 
              key={ach.id} 
              className={`p-4 md:p-6 rounded-2xl border flex items-center gap-4 md:gap-6 transition duration-300 ${
                ach.isUnlocked 
                  ? 'bg-slate-800 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)]' 
                  : 'bg-slate-800/50 border-slate-700 opacity-60 grayscale'
              }`}
            >
              {/* Иконка */}
              <div className={`text-4xl md:text-6xl ${ach.isUnlocked ? 'drop-shadow-lg' : ''}`}>
                {ach.icon}
              </div>

              {/* Мәтін және прогресс */}
              <div className="flex-1">
                <h3 className={`text-lg md:text-xl font-bold mb-1 ${ach.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                  {ach.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-3">{ach.description}</p>
                
                {/* Прогресс бар */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-900 rounded-full h-2 md:h-3 overflow-hidden">
                    <div 
                      className={`h-2 md:h-3 rounded-full ${ach.isUnlocked ? 'bg-yellow-500' : 'bg-blue-500'}`} 
                      style={{ width: `${(ach.progress / ach.target) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium min-w-[40px] text-right">
                    {ach.progress}/{ach.target}
                  </span>
                </div>
              </div>

              {/* Ашылған белгісі */}
              {ach.isUnlocked && (
                <div className="hidden md:block text-green-500 text-2xl">✔️</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}