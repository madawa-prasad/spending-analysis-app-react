import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummaryPage from './pages/SummaryPage';
import { SummaryContainer } from './containers/summaryContainer';
import { HomeContainer } from './containers/homeContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            exact
            path="/"
            element={
              <HomeContainer.Provider>
                <HomePage />
              </HomeContainer.Provider>
            }
          />
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
