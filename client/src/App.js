import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummaryPage from './pages/SummaryPage';
import { SummaryContainer } from './containers/summaryStore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/summary"
            element={
              <SummaryContainer.Provider>
                <SummaryPage />
              </SummaryContainer.Provider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
