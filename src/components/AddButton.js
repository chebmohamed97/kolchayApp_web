import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/addButtonStyles.scss";
export default function AddButton() {
  const { isLoggedIn, login, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? (
        <>
          <div className="NewAdLinkContainer">
            <a href="/newad" className="linkToPostNewAd">
              POSTER UNE ANNONCE
            </a>
          </div>
          <a
            className="circle-container-new-ad"
            onClick={() => navigate("/newad")}
          >
            +
          </a>
        </>
      ) : (
        <div className="messageToLoginHomeContainer">
          <p className="messageToLogin">
            Vous pouvez poster votre annonce que si vous possedez un compte!
          </p>
          <a href="/login" className="linkToLogin">
            Connectez vous ou créer un compte
          </a>
        </div>
      )}
    </div>
  );
}
