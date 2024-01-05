import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";

export default function LogInStatus() {
  const { isLoggedIn, login, logout } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [emailAdress, setEmailAdress] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      // The user object has basic properties such as display name, email, etc.
      if (user.displayName) {
        setDisplayName(user.displayName);
      }
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      setEmailAdress(email);

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="logInStatus">
      {isLoggedIn ? (
        <div>
          <p> {displayName.toUpperCase()}</p>
          <button onClick={logout}>logout</button>{" "}
        </div>
      ) : (
        <p> Guest</p>
      )}
      <div className="circle-container">
        <img
          src="https://source.unsplash.com/random/200x200"
          alt="profileImg"
          className="profile-image"
        />
      </div>
    </div>
  );
}
