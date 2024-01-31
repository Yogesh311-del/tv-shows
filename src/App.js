// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './MainScreen';
import ShowDetailsScreen from './ShowDetailsScreen';
import './App.css'; // Import CSS file

function App() {
  return (
    <div className="container"> {/* Add container class */}
      <Router>
        <Routes>
        <Route path="/" element={<MainScreen />} exact />
        <Route path="/show/:id" element={<ShowDetailsScreen />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
