import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.role === 'admin'
      });
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    localStorage.setItem('token', response.token);
    setToken(response.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout,
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};