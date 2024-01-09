import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import guestImage from "../images/guestImage.png";
import { useNavigate, Link } from "react-router-dom";
import { getDatabase, ref, child, get, equalTo } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const database = getDatabase();
export default function LogInStatus() {
  const navigate = useNavigate();

  const { isLoggedIn, login, logout, currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");

  const user = currentUser;
  useEffect(() => {
    console.log(user);
    if (user) {
      // The user object has basic properties such as display name, email, etc.
      if (user.displayName) {
        setDisplayName(user.displayName);
      }
    }
  }, [currentUser]);

  return (
    <div className="circle-container">
      <Link to="/profile">
        {isLoggedIn ? (
          <img
            src="https://source.unsplash.com/random/200x200"
            alt="profileImg"
            className="profile-image"
          />
        ) : (
          <img src={guestImage} alt="profileImg" className="profile-image" />
        )}
      </Link>
    </div>
  );
}
