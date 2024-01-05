import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import LogInStatus from "../components/logInStatus";

const Profile = () => {
  const { isLoggedIn, login, logout, currentUser } = useAuth();
  return (
    <div>
      <LogInStatus />
      <h2>Profile</h2>
      <p> Name: {currentUser.displayName} </p>
      <p> Email: {currentUser.email} </p>
      <p>
        {" "}
        Email Verification:{" "}
        {currentUser.emailVerified ? (
          <t> Verified </t>
        ) : (
          <t> Not Verified </t>
        )}{" "}
      </p>
      <p>
        {" "}
        Phone number:{" "}
        {currentUser.phoneNumber ? (
          <t> Unknown </t>
        ) : (
          <t> {currentUser.phoneNumber} </t>
        )}{" "}
      </p>
      <p> Account created: {currentUser.metadata.creationTime}</p>
      <p> Last login: {currentUser.metadata.lastSignInTime}</p>
    </div>
  );
};

export default Profile;
