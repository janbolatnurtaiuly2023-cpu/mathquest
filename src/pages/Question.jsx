import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { questions } from '../data/questions';

export default function Question() {
  // worldId-ді де аламыз
  const { worldId, levelId } = useParams();
  const navigate = useNavigate();
  
  // Әлемге және деңгейге сәйкес сұрақты табу
  const questionData = questions.find(
    q => q.world === parseInt(worldId) && q.level === parseInt(levelId)
  ) || questions[0];

  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'

  // Дыбыстарды ойнату функциясы
  const playSound = (type) => {
    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.play().catch(e => console.log("Дыбыс ойнату мүмкін болмады:", e));
    } catch (e) {
      console.log("Дыбыс файлы табылмады");
    }
  };

  const handleCheck = () => {
    playSound('click');

    if (answer.trim() === questionData.correctAnswer) {
      setStatus('correct');
      setTimeout(() => playSound('correct'), 100);
      
      // XP, монета, дұрыс жауапты сақтау
      localStorage.setItem('playerXp', parseInt(localStorage.getItem('playerXp') || '0') + 20);
      localStorage.setItem('playerCoins', parseInt(localStorage.getItem('playerCoins') || '0') + 15);
      localStorage.setItem('correctAnswers', parseInt(localStorage.getItem('correctAnswers') || '0') + 1);
      
      // Келесі деңгейді ашу (әлем нөмірін де ескереміз)
      const currentLevel = parseInt(levelId);
      localStorage.setItem(`level_unlocked_${worldId}_${currentLevel + 1}`, 'true');
      
      // Бұл деңгейдің аяқталғанын сақтау
      localStorage.setItem(`level_completed_${worldId}_${currentLevel}`, 'true');

    } else {
      setStatus('wrong');
      setTimeout(() => playSound('wrong'), 100);
      
      // Қате жауапты сақтау
      localStorage.setItem('wrongAnswers', parseInt(localStorage.getItem('wrongAnswers') || '0') + 1);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-900 min-h-screen relative flex flex-col">
        {/* Жоғарғы панель */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-white">
            {worldId === '1' ? '1. Теңдеулер орманы' : 
             worldId === '2' ? '2. Геометрия гибадаттанасы' : 
             worldId === '3' ? '3. Функциялар обсерваториясы' : 
             '4. Финалдық сынақ'} &gt; Деңгей {levelId}
          </h1>
          <div className="flex gap-4 text-sm">
            <span className="text-yellow-400">🪙 {localStorage.getItem('playerCoins') || '250'}</span>
            <span className="text-blue-400">💎 12</span>
          </div>
        </div>

        {/* Негізгі сұрақ блогы */}
        <div className="max-w-3xl mx-auto w-full bg-slate-800 rounded-2xl border border-slate-700 p-8 relative">
          <div className="flex justify-between text-gray-400 text-sm mb-6">
            <span>Сұрақ {questionData.level} / 5</span>
            <span className="text-blue-400 cursor-pointer hover:underline">💡 Кеңес</span>
          </div>

          <div className="bg-slate-700/50 p-6 rounded-xl mb-6 text-center">
            <p className="text-white text-lg font-medium">{questionData.text}</p>
          </div>

          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Жауабыңызды енгізіңіз:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Жауабыңызды жазыңыз..."
              className="w-full bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleCheck}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Тексеру
            </button>
            <button
              onClick={() => {
                playSound('click');
                navigate(`/levels/${worldId}`); // Өткізіп жіберсе, сол әлемге қайтады
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Өткізіп жіберу
            </button>
          </div>
        </div>

        {/* Төменгі XP панелі */}
        <div className="mt-auto pt-8 flex justify-between text-sm text-gray-400">
          <span>⭐ XP: {localStorage.getItem('playerXp') || '0'}</span>
          <span>Қиындық деңгейі: Орташа</span>
        </div>

        {/* Нәтиже терезесі */}
        {status !== 'idle' && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`bg-slate-800 border-2 ${status === 'correct' ? 'border-green-500' : 'border-red-500'} p-8 rounded-2xl max-w-md w-full text-center shadow-2xl`}>
              
              {status === 'correct' ? (
                <>
                  <h2 className="text-3xl font-bold text-green-500 mb-4">Дұрыс жауап!</h2>
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-yellow-400 font-bold text-xl mb-2">+20 XP</p>
                  <p className="text-yellow-400 font-bold text-xl mb-6">+15 🪙</p>
                  <button 
                    onClick={() => {
                      setStatus('idle');
                      setAnswer('');
                      navigate(`/levels/${worldId}`); // Деңгейлер бетіне қайту
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Келесі сұрақ
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-red-500 mb-4">Қате жауап!</h2>
                  <p className="text-white mb-2">Дұрыс жауап:</p>
                  <p className="text-2xl font-bold text-white mb-4">{questionData.correctAnswer}</p>
                  <div className="bg-slate-900 p-4 rounded-lg text-left text-sm text-gray-300 mb-6 whitespace-pre-line">
                    <span className="font-bold text-white block mb-2">Түсіндірме:</span>
                    {questionData.explanation}
                  </div>
                  <button 
                    onClick={() => { setStatus('idle'); setAnswer(''); }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Қайта тексеру
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}