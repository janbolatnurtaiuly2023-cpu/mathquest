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

  const handleCheck = async () => {
    playSound('click');

    try {
      // Python API-ға жауапты тексеруге жіберу
      const response = await fetch('/api/check_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: answer,
          correct: questionData.correctAnswer
        })
      });
      
      const result = await response.json();

      if (result.correct) {
        setStatus('correct');
        setTimeout(() => playSound('correct'), 100);
        
        // XP, монета, дұрыс жауапты сақтау
        localStorage.setItem('playerXp', parseInt(localStorage.getItem('playerXp') || '0') + 20);
        localStorage.setItem('playerCoins', parseInt(localStorage.getItem('playerCoins') || '0') + 15);
        localStorage.setItem('correctAnswers', parseInt(localStorage.getItem('correctAnswers') || '0') + 1);
        
        // Күнделікті тапсырмалардың прогресін сақтау
        localStorage.setItem('quest_correct_answers', parseInt(localStorage.getItem('quest_correct_answers') || '0') + 1);
        localStorage.setItem('quest_earned_xp', parseInt(localStorage.getItem('quest_earned_xp') || '0') + 20);
        localStorage.setItem('quest_earned_coins', parseInt(localStorage.getItem('quest_earned_coins') || '0') + 15);
        
        // Келесі деңгейді ашу
        const currentLevel = parseInt(levelId);
        localStorage.setItem(`level_unlocked_${worldId}_${currentLevel + 1}`, 'true');
        localStorage.setItem(`level_completed_${worldId}_${currentLevel}`, 'true');

        // Python-ға ойыншының деректерін жіберу
        const playerName = localStorage.getItem('playerName') || 'User';
        fetch('/api/update_player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playerName,
            xp: parseInt(localStorage.getItem('playerXp') || '0'),
            coins: parseInt(localStorage.getItem('playerCoins') || '0'),
            level: Math.floor(parseInt(localStorage.getItem('playerXp') || '0') / 300) + 1
          })
        }).catch(err => console.log("Деректерді жіберу қатесі:", err));

      } else {
        setStatus('wrong');
        setTimeout(() => playSound('wrong'), 100);
        localStorage.setItem('wrongAnswers', parseInt(localStorage.getItem('wrongAnswers') || '0') + 1);
      }
    } catch (error) {
      console.error("Python API қатесі, ескі әдіспен тексеру:", error);
      
      // Егер Python істемесе, ескі әдіспен тексереміз (қосымша сақтық)
      if (answer.trim().toLowerCase() === questionData.correctAnswer.toLowerCase()) {
        setStatus('correct');
        setTimeout(() => playSound('correct'), 100);
        
        localStorage.setItem('playerXp', parseInt(localStorage.getItem('playerXp') || '0') + 20);
        localStorage.setItem('playerCoins', parseInt(localStorage.getItem('playerCoins') || '0') + 15);
        localStorage.setItem('correctAnswers', parseInt(localStorage.getItem('correctAnswers') || '0') + 1);
        localStorage.setItem('quest_correct_answers', parseInt(localStorage.getItem('quest_correct_answers') || '0') + 1);
        localStorage.setItem('quest_earned_xp', parseInt(localStorage.getItem('quest_earned_xp') || '0') + 20);
        localStorage.setItem('quest_earned_coins', parseInt(localStorage.getItem('quest_earned_coins') || '0') + 15);
        
        const currentLevel = parseInt(levelId);
        localStorage.setItem(`level_unlocked_${worldId}_${currentLevel + 1}`, 'true');
        localStorage.setItem(`level_completed_${worldId}_${currentLevel}`, 'true');

        // Python-ға ойыншының деректерін жіберу (қосымша сақтық)
        const playerName = localStorage.getItem('playerName') || 'User';
        fetch('/api/update_player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playerName,
            xp: parseInt(localStorage.getItem('playerXp') || '0'),
            coins: parseInt(localStorage.getItem('playerCoins') || '0'),
            level: Math.floor(parseInt(localStorage.getItem('playerXp') || '0') / 300) + 1
          })
        }).catch(err => console.log("Деректерді жіберу қатесі:", err));

      } else {
        setStatus('wrong');
        setTimeout(() => playSound('wrong'), 100);
        localStorage.setItem('wrongAnswers', parseInt(localStorage.getItem('wrongAnswers') || '0') + 1);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      {/* Негізгі контейнер: телефонда p-4, компьютерде p-8 */}
      <div className="flex-1 p-4 md:p-8 bg-slate-900 min-h-screen relative flex flex-col pt-16 md:pt-8">
        
        {/* Жоғарғы панель: телефонда тік, компьютерде көлденең */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-2">
          <h1 className="text-lg md:text-xl font-bold text-white leading-tight">
            {worldId === '1' ? '1. Теңдеулер орманы' : 
             worldId === '2' ? '2. Геометрия гибадаттанасы' : 
             worldId === '3' ? '3. Функциялар обсерваториясы' : 
             '4. Финалдық сынақ'} &gt; Деңгей {levelId}
          </h1>
          <div className="flex gap-4 text-xs md:text-sm">
            <span className="text-yellow-400">🪙 {localStorage.getItem('playerCoins') || '250'}</span>
            <span className="text-blue-400">💎 12</span>
          </div>
        </div>

        {/* Негізгі сұрақ блогы */}
        <div className="max-w-3xl mx-auto w-full bg-slate-800 rounded-2xl border border-slate-700 p-4 md:p-8 relative">
          <div className="flex justify-between text-gray-400 text-xs md:text-sm mb-4 md:mb-6">
            <span>Сұрақ {questionData.level} / 5</span>
            <span className="text-blue-400 cursor-pointer hover:underline">💡 Кеңес</span>
          </div>

          <div className="bg-slate-700/50 p-4 md:p-6 rounded-xl mb-4 md:mb-6 text-center">
            <p className="text-white text-base md:text-lg font-medium">{questionData.text}</p>
          </div>

          <div className="mb-4 md:mb-6">
            <label className="text-gray-400 text-xs md:text-sm mb-2 block">Жауабыңызды енгізіңіз:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Жауабыңызды жазыңыз..."
              className="w-full bg-slate-900 border border-slate-600 text-white p-3 md:p-4 rounded-lg focus:outline-none focus:border-purple-500 text-sm md:text-base"
            />
          </div>

          {/* Батырмалар: телефонда бірінің астына бірі түседі */}
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <button
              onClick={handleCheck}
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Тексеру
            </button>
            <button
              onClick={() => {
                playSound('click');
                navigate(`/levels/${worldId}`); // Өткізіп жіберсе, сол әлемге қайтады
              }}
              className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Өткізіп жіберу
            </button>
          </div>
        </div>

        {/* Төменгі XP панелі: телефонда тік, компьютерде көлденең */}
        <div className="mt-auto pt-6 md:pt-8 flex flex-col md:flex-row justify-between text-xs md:text-sm text-gray-400 gap-2">
          <span>⭐ XP: {localStorage.getItem('playerXp') || '0'}</span>
          <span>Қиындық деңгейі: Орташа</span>
        </div>

        {/* Нәтиже терезесі */}
        {status !== 'idle' && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-slate-800 border-2 ${status === 'correct' ? 'border-green-500' : 'border-red-500'} p-6 md:p-8 rounded-2xl max-w-md w-full text-center shadow-2xl`}>
              
              {status === 'correct' ? (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">Дұрыс жауап!</h2>
                  <div className="text-5xl md:text-6xl mb-4">🏆</div>
                  <p className="text-yellow-400 font-bold text-lg md:text-xl mb-2">+20 XP</p>
                  <p className="text-yellow-400 font-bold text-lg md:text-xl mb-6">+15 🪙</p>
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
                  <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">Қате жауап!</h2>
                  <p className="text-white mb-2 text-sm md:text-base">Дұрыс жауап:</p>
                  <p className="text-xl md:text-2xl font-bold text-white mb-4">{questionData.correctAnswer}</p>
                  <div className="bg-slate-900 p-3 md:p-4 rounded-lg text-left text-xs md:text-sm text-gray-300 mb-6 whitespace-pre-line max-h-40 overflow-y-auto">
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