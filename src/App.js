import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import EmployeesPage from './pages/EmployeesPage';
import Login from './components/auth/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { isUserLogged } from './services/authService';
import Logout from './components/auth/Logout';
import AreasPage from './pages/AreasPage';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeDetail from './components/employees/EmployeeDetail';

function App() {
  const is_logged_in = isUserLogged() === 'true';
  return (
    <Provider theme={defaultTheme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {is_logged_in ? null : <Route path="login" element={<Login />} />}
          <Route path="teams" element={<AreasPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/new" element={<EmployeeForm />} />
          <Route path="employees/edit/:id" element={<EmployeeForm />} />
          <Route path="employees/view/:id" element={<EmployeeDetail />} />

          <Route path='logout' element={<Logout />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
