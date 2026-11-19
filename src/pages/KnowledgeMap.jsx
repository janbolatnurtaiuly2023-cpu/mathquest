import Sidebar from '../components/Sidebar';

const topics = [
  { name: 'Сызықтық теңдеулер', percent: 75, color: 'bg-green-500' },
  { name: 'Бөлшектер және аралас сандар', percent: 60, color: 'bg-green-500' },
  { name: 'Пропорциялар', percent: 80, color: 'bg-green-500' },
  { name: 'Проценттер', percent: 40, color: 'bg-yellow-500' },
  { name: 'Геометрия (Аудан, периметр)', percent: 50, color: 'bg-yellow-500' },
  { name: 'Пифагор теоремасы', percent: 70, color: 'bg-green-500' },
  { name: 'Функциялар және графиктер', percent: 30, color: 'bg-red-500' },
];

export default function KnowledgeMap() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-8">Білім картасы</h1>

        <div className="flex gap-8">
          {/* Сол жақ: Тақырыптар */}
          <div className="flex-1 bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="flex gap-4 mb-6 border-b border-slate-700 pb-4">
              <button className="text-white font-bold bg-purple-600 px-4 py-2 rounded-lg">Тақырыптар бойынша</button>
              <button className="text-gray-400 hover:text-white px-4 py-2">Қателер тарихы</button>
            </div>

            <div className="flex flex-col gap-4">
              {topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-gray-300 w-64 text-sm">{topic.name}</span>
                  <div className="flex-1 bg-slate-900 rounded-full h-3">
                    <div className={`${topic.color} h-3 rounded-full`} style={{ width: `${topic.percent}%` }}></div>
                  </div>
                  <span className="text-gray-400 text-sm w-10 text-right">{topic.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Оң жақ: Ең әлсіз тақырып */}
          <div className="w-72 bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center flex flex-col justify-center">
            <p className="text-gray-400 mb-2">Ең әлсіз тақырып</p>
            <h3 className="text-white font-bold text-lg mb-4">Функциялар және графиктер</h3>
            <p className="text-4xl font-bold text-red-500 mb-6">30%</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
              Қайталау тапсырмалары
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}