import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import "../styles/addButtonStyles.scss";
export default function AddButton() {
  const { isLoggedIn, login, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? (
        <a
          className="circle-container-new-ad"
          onClick={() => navigate("/newad")}
        >
          +
        </a>
      ) : (
        <div>
          <p className="messageToLogin">
            Vous pouvez poster votre annonce que si vous possedez un compte!
          </p>
          <a href="/login" className="messageToLogin">
            Connectez vous ou creer un compte
          </a>
        </div>
      )}
    </div>
  );
}
