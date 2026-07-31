import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ToastContainer from './components/ui/Toast';
import { useTheme } from './hooks/useTheme';

import Home from './pages/Home';
import Play from './pages/Play';
import Statistics from './pages/Statistics';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import HowToPlay from './pages/HowToPlay';
import About from './pages/About';

function AppContent() {
  useTheme();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <ToastContainer />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
