import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationForm from './RegistrationForm';
import Homepage from './Homepage';
import LoginForm from './LoginForm'; // Import LoginForm
import UserPage from './UserPage'; // Import UserPage

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} /> {/* Add Login route */}
            <Route path="/userpage" element={<UserPage />} /> {/* Add UserPage route */}
            <Route path="/" element={<Homepage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
