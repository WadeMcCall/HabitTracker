import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cookies = new Cookies();
  const authToken = cookies.get('authToken');

  useEffect(() => {
    const verifyToken = async () => {
      if (!authToken) {
        setIsLoading(false);
        return;
      }
      try {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/verifyToken`, {
          headers: { Authorization: authToken },
        });
        setIsVerified(true);
      } catch (err) {
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [authToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
