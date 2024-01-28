import React, { useState } from "react";
import { Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileIconHeader() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, currentUser } = useAuth();
  const [showWindow, setShowWindow] = useState(false);

  const navigateToProfile = () => {
    if (isLoggedIn) {
      navigate(`/profile/${currentUser.displayName}`);
      toggleWindow();
    } else {
      navigate("/login");
      toggleWindow();
    }
  };
  const navigateToLogin = () => {
    navigate("/login");
    toggleWindow();
  };
  const logoutAndNavigateHome = () => {
    logout();
    navigate("/");
    toggleWindow();
  };
  const toggleWindow = () => {
    if (showWindow) {
      setShowWindow(false);
    } else {
      setShowWindow(true);
    }
  };
  const navigateToMesAnnonces = () => {
    if (isLoggedIn) {
      navigate("/mesannonces");
      toggleWindow();
    } else {
      navigate("/login");
      toggleWindow();
    }
  };
  return (
    <div>
      <div className="profileIconTopRight" onClick={toggleWindow}>
        <Person size={35} />
      </div>
      {showWindow ? (
        <div className="profileIconClickWindowContainer">
          <div className="profileMenuItem" onClick={navigateToProfile}>
            Voir mon profil
          </div>
          <div className="profileMenuItem" onClick={navigateToMesAnnonces}>
            Mes annonces
          </div>
          <div className="profileMenuItem">Parametres</div>
          {isLoggedIn ? (
            <div className="profileMenuItem" onClick={logoutAndNavigateHome}>
              Se deconnecter
            </div>
          ) : (
            <div className="profileMenuItem" onClick={navigateToLogin}>
              Se connecter
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
