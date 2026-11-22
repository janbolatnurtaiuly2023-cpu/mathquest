import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [teacherPass, setTeacherPass] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem('playerName', name);
      
      if (isTeacherMode) {
        // Мұғалім паролі (қарапайым мысал)
        if (teacherPass === 'teacher123') {
          localStorage.setItem('userRole', 'teacher');
          navigate('/teacher');
          return;
        } else {
          alert("Қате пароль!");
          return;
        }
      }
      
      // Қарапайым оқушы ретінде кіру
      localStorage.setItem('userRole', 'student');
      navigate('/map');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-purple-900 relative overflow-hidden px-4">
      <div className="relative z-10 text-center w-full max-w-md">
        {/* Телефонда жазу кішірек болады (text-4xl), компьютерде үлкен (md:text-6xl) */}
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2 drop-shadow-lg">MATHQUEST</h1>
        <p className="text-gray-300 mb-8 text-sm md:text-base">Математикалық приключение әлемі</p>

        {/* w-80 орнына w-full max-w-sm қолданылды */}
        <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 w-full mx-auto shadow-2xl">
          <p className="text-white mb-2 text-left text-sm md:text-base">Ойыншы атын енгіз:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Атың"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-purple-500"
          />

          {isTeacherMode && (
            <div className="mb-4">
              <p className="text-white mb-2 text-left text-sm md:text-base">Мұғалім паролі:</p>
              <input
                type="password"
                value={teacherPass}
                onChange={(e) => setTeacherPass(e.target.value)}
                placeholder="Пароль"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          <button
            onClick={handleStart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition mb-2"
          >
            {isTeacherMode ? 'Мұғалім ретінде кіру' : 'Бастау'}
          </button>
          
          <button
            onClick={() => setIsTeacherMode(!isTeacherMode)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition text-sm"
          >
            {isTeacherMode ? 'Оқушы ретінде кіру' : 'Мұғалімсіз бе?'}
          </button>
        </div>

        <p className="mt-6 text-yellow-400 text-sm md:text-base">👑 Ең үздік математик бол!</p>
      </div>
    </div>
  );
}