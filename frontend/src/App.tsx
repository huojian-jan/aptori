import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  const basename =
    import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

  return (
    <Router basename={basename}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
