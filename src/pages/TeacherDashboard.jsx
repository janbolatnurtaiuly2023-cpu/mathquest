import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Қосылды
import Sidebar from '../components/Sidebar';

export default function TeacherDashboard() {
  const navigate = useNavigate(); // Қосылды
  const role = localStorage.getItem('userRole'); // Пайдаланушы рөлін алу
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Егер мұғалім болмаса, картаға қайтару
    if (role !== 'teacher') {
      navigate('/map');
      return;
    }

    // 2. Мұғалім болса, оқушылардың тізімін алу
    fetch('/api/teacher/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Қате:", err);
        setLoading(false);
      });
  }, [navigate, role]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-8">Мұғалім панелі (Оқушылардың прогресі)</h1>

        {loading ? (
          <p className="text-gray-400">Жүктелуде...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-400">Әзірге ешқандай оқушы тіркелмеген.</p>
        ) : (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-gray-400 text-sm">
                <tr>
                  <th className="p-4">Оқушы аты</th>
                  <th className="p-4">Деңгей</th>
                  <th className="p-4">XP</th>
                  <th className="p-4">Монета</th>
                  <th className="p-4">Соңғы белсенділік</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-t border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="p-4 text-white font-bold">{s.name}</td>
                    <td className="p-4 text-gray-300">{s.level}</td>
                    <td className="p-4 text-yellow-400">{s.xp}</td>
                    <td className="p-4 text-yellow-400">🪙 {s.coins}</td>
                    <td className="p-4 text-gray-400 text-sm">{s.last_active}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}