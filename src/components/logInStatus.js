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
    console.log(user);
    if (user) {
      // The user object has basic properties such as display name, email, etc.
      if (user.displayName) {
        setDisplayName(user.displayName);
      }
    }
  }, [currentUser]);
  return (
    <div className="logInStatus">
      {isLoggedIn ? (
        <div>
          <Link to="/profile">
            <p className="logInStatus"> {displayName.toUpperCase()}</p>
          </Link>
          <div className="logInLogoutBtn">
            <button onClick={logout}>logout</button>{" "}
          </div>
        </div>
      ) : (
        <div>
          <p> Guest</p>
          <button onClick={() => navigate("/login")}>login</button>
        </div>
      )}
      <Link to="/profile">
        <div className="circle-container">
          <img
            src="https://source.unsplash.com/random/200x200"
            alt="profileImg"
            className="profile-image"
          />
        </div>
      </Link>
    </div>
  );
}
