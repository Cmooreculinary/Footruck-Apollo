import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authRequestVersion = useRef(0);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    const requestVersion = ++authRequestVersion.current;
    setLoading(true);
    try {
      const userData = await apiClient.getCurrentUser();
      if (requestVersion === authRequestVersion.current) {
        setUser(userData);
      }
    } catch (error) {
      if (error.status !== 401) {
        console.warn('Auth check unavailable:', error.message);
      }
      if (requestVersion === authRequestVersion.current) {
        setUser(null);
      }
    } finally {
      if (requestVersion === authRequestVersion.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = () => {
    navigate('/login');
  };

  const completeSignIn = useCallback((authenticatedUser) => {
    authRequestVersion.current += 1;
    setUser(authenticatedUser);
    setLoading(false);
  }, []);

  const logout = async () => {
    authRequestVersion.current += 1;
    try {
      await apiClient.logout();
    } catch (error) {
      console.warn('Logout request failed:', error.message);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    completeSignIn,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
