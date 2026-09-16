import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InterSchool from './pages/InterSchool';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inter-school" element={<InterSchool />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
