import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import authService from '../../services/authServices';
import './loginStyles.css';

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const token = await authService.authenticate(values.username, values.password);
        console.log(token)
        localStorage.setItem('Token', token);
        localStorage.setItem('isLoggedIn', 'true');

        navigate('/home');
        window.location.reload();
      } catch (error) {
        console.error(error);
        setErrorMessage('Unauthorized');
      }
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    formik.handleSubmit(event as FormEvent<HTMLFormElement>);
  };

  return (
    <div className="App">
      <div className=".inner-container">
        <div className="login-container">
          <form onSubmit={handleSubmit} aria-label="Login Form">
            <img src="https://quind.io/wp-content/uploads/2022/01/Logo-Quind-web-01-600x393.png" alt="logo" className="logo-login" />
            <h1 className="login-title">LOGIN</h1>
            <p className="login-subtitle">Welcome back! Please login to your account</p>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username*"
              className="input-field"
            />
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password*"
              className="input-field"
            />
            <button type="submit" className="submit-button">Login</button>
          </form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
