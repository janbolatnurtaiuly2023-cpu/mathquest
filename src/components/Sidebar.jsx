import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { path: '/map', label: 'Карта', icon: '🗺️' },
  { path: '/profile', label: 'Профиль', icon: '👤' },
  { path: '/knowledge', label: 'Білім картасы', icon: '📊' },
  { path: '/leaderboard', label: 'Рейтинг', icon: '👑' },
  { path: '/achievements', label: 'Жетістіктер', icon: '🏆' },
];

export default function Sidebar() {
  const location = useLocation();
  const name = localStorage.getItem('playerName') || 'User';
  const role = localStorage.getItem('userRole') || 'student'; // Пайдаланушы рөлін алу
  const [isOpen, setIsOpen] = useState(false); // Телефон мәзірі үшін

  return (
    <>
      {/* Телефонға арналған мәзір батырмасы */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl bg-slate-800 p-2 rounded-lg shadow-lg">
          ☰
        </button>
      </div>

      {/* Бүйір мәзір */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40 w-56 bg-slate-900/95 md:bg-black/60 backdrop-blur-md min-h-screen p-4 flex flex-col border-r border-white/10 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center gap-2 mb-6 p-2 bg-white/5 rounded-lg mt-12 md:mt-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${role === 'teacher' ? 'bg-green-600' : 'bg-purple-600'}`}>
            {role === 'teacher' ? '👨‍🏫' : '👤'}
          </div>
          <span className="text-white font-medium truncate">{name}</span>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // Телефонда басқанда жабылады
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Тек мұғалімге ғана көрінетін сілтеме */}
          {role === 'teacher' && (
            <Link
              to="/teacher"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === '/teacher'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span>👨‍🏫</span>
              <span>Мұғалім панелі</span>
            </Link>
          )}
        </nav>

        <Link
          to="/"
          onClick={() => localStorage.clear()} // Шыққанда деректерді тазалау (қауіпсіздік үшін)
          className="mt-auto flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition"
        >
          <span>🚪</span>
          <span>Шығу</span>
        </Link>
      </div>

      {/* Телефонда мәзір ашық кезде артқы фонды қараңғылау */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}