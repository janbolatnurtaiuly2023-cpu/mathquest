export const questions = [
  // ================= 1-ӘЛЕМ: Теңдеулер орманы =================
  {
    id: 1,
    world: 1,
    level: 1,
    text: "Теңдеуді шешіңіз: 2x + 5 = 15",
    correctAnswer: "5",
    explanation: "2x = 15 - 5\n2x = 10\nx = 5"
  },
  {
    id: 2,
    world: 1,
    level: 2,
    text: "Теңдеуді шешіңіз: 3(x - 4) + 2(x + 5) = 5x - 6",
    correctAnswer: "8",
    explanation: "3x - 12 + 2x + 10 = 5x - 6\n5x - 2 = 5x - 6\nx = 8"
  },
  {
    id: 3,
    world: 1,
    level: 3,
    text: "Теңдеуді шешіңіз: x/2 + 3 = 7",
    correctAnswer: "8",
    explanation: "x/2 = 7 - 3\nx/2 = 4\nx = 8"
  },
  {
    id: 4,
    world: 1,
    level: 4,
    text: "Теңдеуді шешіңіз: 4x - 7 = 2x + 5",
    correctAnswer: "6",
    explanation: "4x - 2x = 5 + 7\n2x = 12\nx = 6"
  },
  {
    id: 5,
    world: 1,
    level: 5,
    text: "Теңдеуді шешіңіз: 5(x - 2) = 3x + 4",
    correctAnswer: "7",
    explanation: "5x - 10 = 3x + 4\n5x - 3x = 4 + 10\n2x = 14\nx = 7"
  },

  // ================= 2-ӘЛЕМ: Геометрия ғибадатханасы =================
  {
    id: 6,
    world: 2,
    level: 1,
    text: "Тікбұрыштың ұзындығы 8 см, ені 5 см. Оның ауданын табыңыз.",
    correctAnswer: "40",
    explanation: "Аудан = ұзындық × ені\nS = 8 × 5 = 40 см²"
  },
  {
    id: 7,
    world: 2,
    level: 2,
    text: "Қабырғасы 6 см болатын квадраттың периметрін табыңыз.",
    correctAnswer: "24",
    explanation: "Периметр = 4 × қабырға\nP = 4 × 6 = 24 см"
  },
  {
    id: 8,
    world: 2,
    level: 3,
    text: "Үшбұрыштың бұрыштарының қосындысы неше градус?",
    correctAnswer: "180",
    explanation: "Кез келген үшбұрыштың ішкі бұрыштарының қосындысы 180°-қа тең."
  },
  {
    id: 9,
    world: 2,
    level: 4,
    text: "Радиусы 5 см болатын шеңбердің диаметрі неше см?",
    correctAnswer: "10",
    explanation: "Диаметр = 2 × радиус\nD = 2 × 5 = 10 см"
  },
  {
    id: 10,
    world: 2,
    level: 5,
    text: "Тікбұрышты параллелепипедтің ұзындығы 4, ені 3, биіктігі 2. Көлемін табыңыз.",
    correctAnswer: "24",
    explanation: "Көлем = ұзындық × ені × биіктік\nV = 4 × 3 × 2 = 24"
  },

  // ================= 3-ӘЛЕМ: Функциялар обсерваториясы =================
  {
    id: 11,
    world: 3,
    level: 1,
    text: "y = 2x + 3 функциясында x = 4 болса, y нешеге тең?",
    correctAnswer: "11",
    explanation: "y = 2(4) + 3\ny = 8 + 3 = 11"
  },
  {
    id: 12,
    world: 3,
    level: 2,
    text: "y = x² функциясының графигі қандай пішінде болады?",
    correctAnswer: "парабола",
    explanation: "Квадраттық функцияның графигі парабола деп аталады."
  },
  {
    id: 13,
    world: 3,
    level: 3,
    text: "y = 3x - 5 функциясының бұрыштық коэффициенті (k) нешеге тең?",
    correctAnswer: "3",
    explanation: "y = kx + b түріндегі функцияда k — бұрыштық коэффициент. Мұнда k = 3."
  },
  {
    id: 14,
    world: 3,
    level: 4,
    text: "y = 5x функциясы өспелі ме, әлде кемімелі ме?",
    correctAnswer: "өспелі",
    explanation: "Егер k > 0 болса (мұнда k=5), функция өспелі болады."
  },
  {
    id: 15,
    world: 3,
    level: 5,
    text: "y = x² - 4 функциясында x = 3 болса, y нешеге тең?",
    correctAnswer: "5",
    explanation: "y = 3² - 4\ny = 9 - 4 = 5"
  },

  // ================= 4-ӘЛЕМ: Финалдық сынақ =================
  {
    id: 16,
    world: 4,
    level: 1,
    text: "Теңдеуді шешіңіз: 2(x + 3) = 14",
    correctAnswer: "4",
    explanation: "2x + 6 = 14\n2x = 8\nx = 4"
  },
  {
    id: 17,
    world: 4,
    level: 2,
    text: "Үшбұрыштың ауданы 24 см², табаны 8 см. Биіктігін табыңыз.",
    correctAnswer: "6",
    explanation: "Аудан = (табан × биіктік) / 2\n24 = (8 × h) / 2\n48 = 8h\nh = 6 см"
  },
  {
    id: 18,
    world: 4,
    level: 3,
    text: "y = 2x + 1 функциясының графигі қай нүктеден өтеді? (x=0 болғанда)",
    correctAnswer: "1",
    explanation: "x = 0 болғанда, y = 2(0) + 1 = 1. Яғни график (0, 1) нүктесінен өтеді."
  },
  {
    id: 19,
    world: 4,
    level: 4,
    text: "Пропорцияны шешіңіз: 3/4 = x/12",
    correctAnswer: "9",
    explanation: "3 × 12 = 4 × x\n36 = 4x\nx = 9"
  },
  {
    id: 20,
    world: 4,
    level: 5,
    text: "Финалдық сұрақ: 5! (5 факториал) нешеге тең?",
    correctAnswer: "120",
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
  },
    // ================= 5-ӘЛЕМ: Пропорциялар алаңы =================
  {
    id: 33,
    world: 5,
    level: 1,
    text: "Пропорцияны шешіңіз: 2/5 = x/10",
    correctAnswer: "4",
    explanation: "2 × 10 = 5 × x\n20 = 5x\nx = 4"
  },
  {
    id: 34,
    world: 5,
    level: 2,
    text: "Пропорцияны шешіңіз: 3/4 = 9/x",
    correctAnswer: "12",
    explanation: "3 × x = 4 × 9\n3x = 36\nx = 12"
  },
  {
    id: 35,
    world: 5,
    level: 3,
    text: "Пропорцияны шешіңіз: 5/8 = x/24",
    correctAnswer: "15",
    explanation: "5 × 24 = 8 × x\n120 = 8x\nx = 15"
  },
  {
    id: 36,
    world: 5,
    level: 4,
    text: "Пропорцияны шешіңіз: 7/10 = 14/x",
    correctAnswer: "20",
    explanation: "7 × x = 10 × 14\n7x = 140\nx = 20"
  },
  {
    id: 37,
    world: 5,
    level: 5,
    text: "Пропорцияны шешіңіз: 4/6 = x/15",
    correctAnswer: "10",
    explanation: "4 × 15 = 6 × x\n60 = 6x\nx = 10"
  },

  // ================= 6-ӘЛЕМ: Проценттер мұнарасы =================
  {
    id: 38,
    world: 6,
    level: 1,
    text: "200-дің 10%-ы нешеге тең?",
    correctAnswer: "20",
    explanation: "200 × 0.10 = 20"
  },
  {
    id: 39,
    world: 6,
    level: 2,
    text: "50-дің 20%-ы нешеге тең?",
    correctAnswer: "10",
    explanation: "50 × 0.20 = 10"
  },
  {
    id: 40,
    world: 6,
    level: 3,
    text: "Егер тауар 1000 теңге тұрса және оған 15% жеңілдік жасалса, оның бағасы қанша болады?",
    correctAnswer: "850",
    explanation: "Жеңілдік = 1000 × 0.15 = 150\nЖаңа баға = 1000 - 150 = 850"
  },
  {
    id: 41,
    world: 6,
    level: 4,
    text: "120-ның 25%-ы нешеге тең?",
    correctAnswer: "30",
    explanation: "120 × 0.25 = 30"
  },
  {
    id: 42,
    world: 6,
    level: 5,
    text: "80-нің 50%-ы нешеге тең?",
    correctAnswer: "40",
    explanation: "80 × 0.50 = 40"
  },

  // ================= 7-ӘЛЕМ: Ұлы финал =================
  {
    id: 43,
    world: 7,
    level: 1,
    text: "Теңдеуді шешіңіз: 2x - 5 = x + 3",
    correctAnswer: "8",
    explanation: "2x - x = 3 + 5\nx = 8"
  },
  {
    id: 44,
    world: 7,
    level: 2,
    text: "Тікбұрыштың ұзындығы 12, ені 4. Периметрін табыңыз.",
    correctAnswer: "32",
    explanation: "Периметр = 2 × (ұзындық + ені)\nP = 2 × (12 + 4) = 2 × 16 = 32"
  },
  {
    id: 45,
    world: 7,
    level: 3,
    text: "y = 3x + 2 функциясында x = 5 болса, y нешеге тең?",
    correctAnswer: "17",
    explanation: "y = 3(5) + 2\ny = 15 + 2 = 17"
  },
  {
    id: 46,
    world: 7,
    level: 4,
    text: "Пропорцияны шешіңіз: 5/7 = x/21",
    correctAnswer: "15",
    explanation: "5 × 21 = 7 × x\n105 = 7x\nx = 15"
  },
  {
    id: 47,
    world: 7,
    level: 5,
    text: "300-дің 30%-ы нешеге тең?",
    correctAnswer: "90",
    explanation: "300 × 0.30 = 90"
  },
  {
    id: 48,
    world: 7,
    level: 6,
    text: "Ұлы финал: 7! (7 факториал) нешеге тең?",
    correctAnswer: "5040",
    explanation: "7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040"
  }
  
];