import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import InterSchool from './pages/InterSchool';
import Preloader from './components/ui/preloader';

// Wrapper to handle scroll restoration on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 transition-opacity duration-1000'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inter-school" element={<InterSchool />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
