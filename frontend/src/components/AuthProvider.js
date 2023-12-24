import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;