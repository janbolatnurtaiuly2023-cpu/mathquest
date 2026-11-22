export const getDailyQuests = () => {
  const today = new Date().toDateString();
  const lastLogin = localStorage.getItem('lastQuestDate');
  
  // Егер бүгін кірмеген болса, тапсырмаларды жаңартамыз
  if (lastLogin !== today) {
    localStorage.setItem('lastQuestDate', today);
    localStorage.setItem('quest_correct_answers', '0');
    localStorage.setItem('quest_earned_xp', '0');
    localStorage.setItem('quest_earned_coins', '0');
    localStorage.setItem('quests_completed', 'false');
  }

  const correctAnswers = parseInt(localStorage.getItem('quest_correct_answers') || '0');
  const earnedXp = parseInt(localStorage.getItem('quest_earned_xp') || '0');
  const earnedCoins = parseInt(localStorage.getItem('quest_earned_coins') || '0');
  const isCompleted = localStorage.getItem('quests_completed') === 'true';

  // Тапсырмалардың мақсаттары
  const quests = [
    {
      id: 1,
      title: "5 сұраққа дұрыс жауап бер",
      target: 5,
      current: correctAnswers > 5 ? 5 : correctAnswers,
      reward: "50 🪙",
      isDone: correctAnswers >= 5
    },
    {
      id: 2,
      title: "100 XP жина",
      target: 100,
      current: earnedXp > 100 ? 100 : earnedXp,
      reward: "100 🪙",
      isDone: earnedXp >= 100
    },
    {
      id: 3,
      title: "Барлық тапсырманы орында",
      target: 2,
      current: (correctAnswers >= 5 ? 1 : 0) + (earnedXp >= 100 ? 1 : 0),
      reward: "💎 1 Кристалл",
      isDone: correctAnswers >= 5 && earnedXp >= 100
    }
  ];

  return quests;
};