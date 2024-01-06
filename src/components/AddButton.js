import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

export default function AddButton() {
  const { isLoggedIn, login, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? (
        <a className="addNewAdButton" onClick={() => navigate("/newad")}>
          Add new Ad
        </a>
      ) : (
        <p className="messageToLogin">You need to log in to add a new ad ! </p>
      )}
    </div>
  );
}
