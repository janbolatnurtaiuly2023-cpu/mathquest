import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const myName = localStorage.getItem('playerName') || 'User';

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Рейтингті алу қатесі:", err);
        setLoading(false);
      });
  }, []);

  const myRank = players.find(p => p.name === myName)?.rank || '-';

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-8">Рейтинг (Көшбасшылар)</h1>

        {loading ? (
          <p className="text-gray-400">Жүктелуде...</p>
        ) : (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-gray-400 text-sm">
                <tr>
                  <th className="p-4">Орын</th>
                  <th className="p-4">Ойыншы</th>
                  <th className="p-4">Деңгей</th>
                  <th className="p-4">XP</th>
                  <th className="p-4">Монета</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={i} className={`border-t border-slate-700 ${p.name === myName ? 'bg-purple-900/30' : ''}`}>
                    <td className="p-4 text-white font-bold">
                      {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                    </td>
                    <td className="p-4 text-white">
                      {p.name === myName ? '👤 ' + p.name + ' (Сіз)' : p.name}
                    </td>
                    <td className="p-4 text-gray-300">{p.level}</td>
                    <td className="p-4 text-yellow-400">{p.xp}</td>
                    <td className="p-4 text-yellow-400">🪙 {p.coins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-slate-900 text-center text-gray-400 border-t border-slate-700">
              Сенің орның: {myRank} / {players.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}