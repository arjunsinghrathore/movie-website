import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationForm from './RegistrationForm';
import Homepage from './Homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
