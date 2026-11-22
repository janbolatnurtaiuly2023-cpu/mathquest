export const getAchievements = () => {
  const xp = parseInt(localStorage.getItem('playerXp') || '0');
  const coins = parseInt(localStorage.getItem('playerCoins') || '0');
  const correctAnswers = parseInt(localStorage.getItem('correctAnswers') || '0');
  const wrongAnswers = parseInt(localStorage.getItem('wrongAnswers') || '0');

  return [
    {
      id: 1,
      icon: '🏆',
      title: 'Алғашқы қадам',
      description: 'Бірінші дұрыс жауапты бер',
      isUnlocked: correctAnswers >= 1,
      progress: Math.min(correctAnswers, 1),
      target: 1
    },
    {
      id: 2,
      icon: '🧠',
      title: 'Математик',
      description: '10 сұраққа дұрыс жауап бер',
      isUnlocked: correctAnswers >= 10,
      progress: Math.min(correctAnswers, 10),
      target: 10
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Дәл мерген',
      description: '20 сұраққа дұрыс жауап бер',
      isUnlocked: correctAnswers >= 20,
      progress: Math.min(correctAnswers, 20),
      target: 20
    },
    {
      id: 4,
      icon: '💰',
      title: 'Байлық',
      description: '500 монета жина',
      isUnlocked: coins >= 500,
      progress: Math.min(coins, 500),
      target: 500
    },
    {
      id: 5,
      icon: '⭐',
      title: 'Тәжірибелі',
      description: '200 XP жина',
      isUnlocked: xp >= 200,
      progress: Math.min(xp, 200),
      target: 200
    },
    {
      id: 6,
      icon: '👑',
      title: 'Көшбасшы',
      description: '1000 XP жина',
      isUnlocked: xp >= 1000,
      progress: Math.min(xp, 1000),
      target: 1000
    },
    {
      id: 7,
      icon: '🛡️',
      title: 'Төзімді',
      description: '10 қате жауап бер (тәжірибе жинау)',
      isUnlocked: wrongAnswers >= 10,
      progress: Math.min(wrongAnswers, 10),
      target: 10
    }
  ];
};