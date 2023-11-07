import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import ProtectedRoute from './context/ProtectedRoute';
import TeamPage from './pages/TeamPage/TeamPage';
import EmployeePage from './pages/EmployeePage/EmployeePage';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
      <Router>
          {isLoggedIn && <Navbar />}
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={
                  <ProtectedRoute>
                    <div className="wrapper">
                        <HomePage />
                    </div>
                  </ProtectedRoute>
              } />
              <Route path="/team" element={
                  <ProtectedRoute>
                    <div className="wrapper">
                        <TeamPage />
                    </div>
                  </ProtectedRoute>
              } />
              <Route path="/employees" element={
                  <ProtectedRoute>
                    <div className="wrapper">
                        <EmployeePage />
                    </div>
                  </ProtectedRoute>
              } />
              <Route path="/logout" element={
                  <ProtectedRoute>
                      <LogoutPage />
                  </ProtectedRoute>
              } />
              <Route path="*" element={<LoginPage />} />
          </Routes>
      </Router>
  );
}

export default App;
