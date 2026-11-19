import Sidebar from '../components/Sidebar';

const players = [
  { rank: 1, name: 'Aruzhan', level: 5, xp: 560, coins: 820 },
  { rank: 2, name: 'Daulet', level: 4, xp: 430, coins: 620 },
  { rank: 3, name: 'Amina', level: 4, xp: 410, coins: 580 },
  { rank: 4, name: 'User', level: 3, xp: 160, coins: 250, isMe: true },
  { rank: 5, name: 'Bekzat', level: 2, xp: 120, coins: 180 },
];

export default function Leaderboard() {
  const name = localStorage.getItem('playerName') || 'User';

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-8">Рейтинг (Көшбасшылар)</h1>

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
                <tr key={i} className={`border-t border-slate-700 ${p.isMe ? 'bg-purple-900/30' : ''}`}>
                  <td className="p-4 text-white font-bold">
                    {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                  </td>
                  <td className="p-4 text-white flex items-center gap-2">
                    {p.name === name ? '👤 ' + p.name + ' (Сіз)' : p.name}
                  </td>
                  <td className="p-4 text-gray-300">{p.level}</td>
                  <td className="p-4 text-yellow-400">{p.xp}</td>
                  <td className="p-4 text-yellow-400">🪙 {p.coins}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-slate-900 text-center text-gray-400 border-t border-slate-700">
            Сенің орның: 4 / 25
          </div>
        </div>
      </div>
    </div>
  );
}