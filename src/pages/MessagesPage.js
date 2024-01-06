import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
const MessagesPage = () => {
  const { isLoggedIn, currentUser } = useAuth();

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Coming soon !</h2>
        <p>You are not logged in</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Coming soon !</h2>
      <h2>Messages</h2>
    </div>
  );
};

export default MessagesPage;
