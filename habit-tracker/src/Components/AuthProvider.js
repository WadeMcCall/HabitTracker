import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('authToken');
    setAuthToken(token);

    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/verifyToken`, {
          headers: { Authorization: token },
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        isLoading,
        setAuthToken,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
