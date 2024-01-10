// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Retrieve login state from local storage on initialization
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [currentUser, setCurrentUser] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const login = () => {
    // Your login logic here
    setLoggedIn(true);
  };

  const logout = () => {
    // Your logout logic here
    setLoggedIn(false);
  };
  const fetchUserData = async () => {
    try {
      if (currentUser && currentUser.uid) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("currentUser or currentUser.uid is undefined");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Update local storage when login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, [isLoggedIn]);

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, currentUser, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
