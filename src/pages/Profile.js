import React from "react";
import { useAuth } from "../contexts/AuthContext";
import LogInStatus from "../components/logInStatus";

const Profile = () => {
  const { isLoggedIn, currentUser } = useAuth();

  if (!isLoggedIn) {
    return (
      <div>
        <LogInStatus />
        <p>You are not logged in</p>
      </div>
    );
  }

  return (
    <div>
      <LogInStatus />
      <h2>Profile</h2>
      <p>Name: {currentUser.displayName}</p>
      <p>Email: {currentUser.email}</p>
      <p>
        Email Verification:{" "}
        {currentUser.emailVerified ? (
          <span>Verified</span>
        ) : (
          <span>Not Verified</span>
        )}
      </p>
      <p>
        Phone number:{" "}
        {currentUser.phoneNumber ? (
          <span>{currentUser.phoneNumber}</span>
        ) : (
          <span>Unknown</span>
        )}
      </p>
      <p>Account created: {currentUser.metadata?.creationTime || "N/A"}</p>
      <p>Last login: {currentUser.metadata?.lastSignInTime || "N/A"}</p>
    </div>
  );
};

export default Profile;
