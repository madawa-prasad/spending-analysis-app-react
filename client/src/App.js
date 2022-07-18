import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Summary from './pages/Summary';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
