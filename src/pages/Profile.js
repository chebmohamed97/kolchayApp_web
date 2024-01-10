import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";

const Profile = () => {
  const { isLoggedIn, currentUser, userInfo } = useAuth();

  if (!isLoggedIn) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>
      <div className="profileContainer">
        <div className="profile-image-container">
          <img
            src={userInfo.photoURL}
            alt="profileImg"
            className="profile-image"
          />
        </div>
        <div className="profileInfosContainer">
          <p>Nom: {userInfo.nom}</p>
          <p>Prenom: {userInfo.prenom}</p>
          <p>Nom d'utilisateur: {userInfo.displayName}</p>
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
          <h2> Bio</h2>
          <p> {userInfo.bio}</p>
          <h2> Informations Kolchayy:</h2>
          <p>KolChayy Rating: {userInfo.rating}</p>
          <p>Nombre de travails fait: {userInfo.jobs_done} </p>
          {userInfo.driving_licence ? (
            <p>Permis de conduite: Oui </p>
          ) : (
            <p>Permis de conduite: Non</p>
          )}
          {userInfo.has_car ? (
            <p>Voiture disponible: Oui </p>
          ) : (
            <p>Voiture disponible: Non</p>
          )}
          <p>Outils disponibles: {userInfo.tools_for_work}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
