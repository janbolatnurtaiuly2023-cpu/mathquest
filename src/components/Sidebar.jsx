import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/map', label: 'Карта', icon: '🗺️' },
  { path: '/profile', label: 'Профиль', icon: '👤' },
  { path: '/knowledge', label: 'Білім картасы', icon: '📊' },
  { path: '/leaderboard', label: 'Рейтинг', icon: '👑' },
];

export default function Sidebar() {
  const location = useLocation();
  const name = localStorage.getItem('playerName') || 'User';

  return (
    <div className="w-56 bg-black/60 backdrop-blur-md min-h-screen p-4 flex flex-col border-r border-white/10">
      <div className="flex items-center gap-2 mb-6 p-2 bg-white/5 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">👤</div>
        <span className="text-white">{name}</span>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
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
      </nav>

      <Link
        to="/"
        className="mt-auto flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition"
      >
        <span>🚪</span>
        <span>Шығу</span>
      </Link>
    </div>
  );
}