import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function LogInStatus() {
  const navigate = useNavigate();

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
    <div className="topRightCorner">
      <Link to="/profile">
        <div className="circle-container">
          <img
            src="https://source.unsplash.com/random/200x200"
            alt="profileImg"
            className="profile-image"
          />
        </div>
      </Link>
      {isLoggedIn ? (
        <div>
          <Link to="/profile">
            <p> {displayName.toUpperCase()}</p>
          </Link>
        </div>
      ) : (
        <div className="UsernameAndButton">
          <p> Guest</p>
        </div>
      )}
    </div>
  );
}
