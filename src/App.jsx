import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Map from './pages/Map';
import Levels from './pages/Levels';
import Question from './pages/Question';
import Profile from './pages/Profile';
import KnowledgeMap from './pages/KnowledgeMap';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<Map />} />
        <Route path="/levels/:worldId" element={<Levels />} />
        <Route path="/question/:worldId/:levelId" element={<Question />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/knowledge" element={<KnowledgeMap />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;