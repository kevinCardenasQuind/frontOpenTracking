import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import Login from './components/auth/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { isUserLogged } from './services/authService';
import Logout from './components/auth/Logout';
import AreasPage from './pages/AreasPage';

function App() {
  const is_logged_in = isUserLogged() === 'true';
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {is_logged_in ? null : <Route path="login" element={<Login />} />}
        <Route path="teams" element={<AreasPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path='logout' element={<Logout />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
