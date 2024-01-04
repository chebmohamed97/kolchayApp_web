// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Retrieve login state from local storage on initialization
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  });

  const login = () => {
    // Your login logic here
    setLoggedIn(true);
  };

  const logout = () => {
    // Your logout logic here
    setLoggedIn(false);
  };

  // Update local storage when login state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
