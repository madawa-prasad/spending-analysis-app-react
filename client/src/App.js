import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummaryPage from './pages/SummaryPage';
// import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* <Route exact path="/" element={<LandingPage />} /> */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
