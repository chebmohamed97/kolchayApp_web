// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Retrieve login state from local storage on initialization
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [currentUser, setCurrentUser] = useState({});

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
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
