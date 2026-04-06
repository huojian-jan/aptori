import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import TypingPage from './components/TypingPage';
import { ALL_MODES } from './config/modes';

function App() {
  const basename =
    import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

  return (
    <Router basename={basename}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {ALL_MODES.map((mode) => (
            <Route
              key={mode.id}
              path={mode.route}
              element={<TypingPage mode={mode} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
