// src/SignUp.js
import React, { useState } from "react";

import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [jsonData, setJsonData] = useState({
    username: { username },
    password: { password },
  });

  const saveDataToFile = (accountInfo) => {
    axios
      .post("http://localhost:3001/api/accounts", accountInfo)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  };
  const handleSignUp = () => {
    // Basic sign-up check (replace with API call in a real application)
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // Successful sign-up
      const accountInfo = {
        username: username,
        password: password,
      };
      console.log(accountInfo);
      saveDataToFile(accountInfo);
      alert("Sign-up successful!");
      // You can redirect the user or perform other actions
    }
  };

  return (
    <div className="loginPage">
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
