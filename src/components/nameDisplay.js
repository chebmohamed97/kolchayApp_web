import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function NameDisplay() {
  const { isLoggedIn, login, logout, currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const user = currentUser;
    if (user) {
      // The user object has basic properties such as display name, email, etc.
      if (user.displayName) {
        setDisplayName(user.displayName);
      }
    }
  }, [currentUser]);

  return (
    <>
      {isLoggedIn ? (
        <div className="nameDisplay">{displayName.toUpperCase()}</div>
      ) : (
        <div className="nameDisplay">GUEST</div>
      )}
    </>
  );
}
