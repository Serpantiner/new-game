import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import MainSquare from './components/screens/MainSquare';
import FishingArea from './components/screens/FishingArea';
import Coliseum from './components/screens/Coliseum';
import HuntingGrounds from './components/screens/HuntingGrounds';
import HerbGarden from './components/screens/HerbGarden';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/" /> : <RegistrationForm />
        } />
        <Route path="/" element={
          user ? <MainSquare user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        <Route path="/fishing" element={
          user ? <FishingArea /> : <Navigate to="/login" />
        } />
        <Route path="/coliseum" element={
          user ? <Coliseum /> : <Navigate to="/login" />
        } />
        <Route path="/hunting" element={
          user ? <HuntingGrounds /> : <Navigate to="/login" />
        } />
        <Route path="/herbs" element={
          user ? <HerbGarden /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
};

export default App;