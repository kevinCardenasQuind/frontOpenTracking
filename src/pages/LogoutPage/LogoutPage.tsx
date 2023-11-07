import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authServices';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    navigate('/');
    window.location.reload();
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default LogoutPage;
