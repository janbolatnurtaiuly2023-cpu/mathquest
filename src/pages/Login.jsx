import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem('playerName', name);
      navigate('/map');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-purple-900 relative overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-yellow-400 mb-2 drop-shadow-lg">MATHQUEST</h1>
        <p className="text-gray-300 mb-8">Математикалық приключение әлемі</p>

        <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 w-80">
          <p className="text-white mb-2 text-left">Ойыншы атын енгіз:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Атың"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleStart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition mb-2"
          >
            Бастау
          </button>
          <button
            onClick={() => navigate('/map')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            Жалғастыру
          </button>
        </div>

        <p className="mt-6 text-yellow-400">👑 Ең үздік математик бол!</p>
      </div>
    </div>
  );
}