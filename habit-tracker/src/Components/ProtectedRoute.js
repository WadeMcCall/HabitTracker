import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoute = ({ children }) => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    children
  );
};

export default ProtectedRoute;
