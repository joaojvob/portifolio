import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../services/api';

interface ProtectedRouteProps {
  children: React.ReactNode; 
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/api/user'); 
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // A ÚNICA MUDANÇA É AQUI.
  // Em vez de retornar 'children' diretamente,
  // nós o envolvemos em um Fragmento do React (<> e </>). Isso garante que
  // o retorno seja sempre um elemento JSX válido para o TypeScript.
  return <>{children}</>; 
}