import React from "react";
import { useAuth } from "../contexts/AuthContext";
import LogInStatus from "../components/logInStatus";

const Settings = () => {
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
      <h2>Settings</h2>
    </div>
  );
};

export default Settings;
