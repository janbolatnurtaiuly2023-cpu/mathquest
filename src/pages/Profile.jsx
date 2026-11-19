import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function Profile() {
  const name = localStorage.getItem('playerName') || 'User';
  
  // Барлық деректерді state-ке жинау
  const [stats, setStats] = useState({
    xp: 0,
    coins: 250,
    diamonds: 12,
    completed: 0,
    correct: 0,
    wrong: 0
  });

  useEffect(() => {
    setStats({
      xp: parseInt(localStorage.getItem('playerXp') || '0'),
      coins: parseInt(localStorage.getItem('playerCoins') || '250'),
      diamonds: 12,
      completed: parseInt(localStorage.getItem('completedLevels') || '0'),
      correct: parseInt(localStorage.getItem('correctAnswers') || '0'),
      wrong: parseInt(localStorage.getItem('wrongAnswers') || '0'),
    });
  }, []);

  // Деңгейді есептеу (әр 300 XP = 1 деңгей)
  const level = Math.floor(stats.xp / 300) + 1;
  const xpProgress = stats.xp % 300; // Келесі деңгейге дейінгі прогресс
  const progressPercent = (xpProgress / 300) * 100;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-6">Профиль</h1>

        {/* Жоғарғы карточка: Аватар және деңгей */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center gap-8 mb-6">
          <div className="w-32 h-32 rounded-full bg-blue-900 flex items-center justify-center overflow-hidden border-4 border-slate-700">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
            <p className="text-gray-400 mb-4">Деңгей: {level}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-900 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="text-gray-300 text-sm whitespace-nowrap">{xpProgress} / 300 XP</span>
            </div>
          </div>
        </div>

        {/* 6 статистика карточкасы */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-2xl">⭐</div>
            <div>
              <p className="text-gray-400 text-sm">Жалпы XP</p>
              <p className="text-white font-bold text-2xl">{stats.xp}</p>
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500 text-2xl">🪙</div>
            <div>
              <p className="text-gray-400 text-sm">Жиналған монета</p>
              <p className="text-white font-bold text-2xl">{stats.coins}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl">💎</div>
            <div>
              <p className="text-gray-400 text-sm">Жиналған кристал</p>
              <p className="text-white font-bold text-2xl">{stats.diamonds}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-2xl">🌱</div>
            <div>
              <p className="text-gray-400 text-sm">Аяқталған деңгейлер</p>
              <p className="text-white font-bold text-2xl">{stats.completed}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-2xl">✔️</div>
            <div>
              <p className="text-gray-400 text-sm">Дұрыс жауаптар</p>
              <p className="text-white font-bold text-2xl">{stats.correct}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-2xl">✖️</div>
            <div>
              <p className="text-gray-400 text-sm">Қате жауаптар</p>
              <p className="text-white font-bold text-2xl">{stats.wrong}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition flex items-center gap-2 mx-auto shadow-lg shadow-purple-500/30">
            📝 Профильді өзгерту
          </button>
        </div>

      </div>
    </div>
  );
}