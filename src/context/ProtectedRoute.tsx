import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirigir al usuario si no está autenticado
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // Este retorno es principalmente para evitar un breve destello de contenido protegido.
    // Puedes incluso devolver un componente de carga si lo prefieres.
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
