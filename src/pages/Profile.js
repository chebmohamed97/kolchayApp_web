import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/profileStyles.scss";
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
      <div className="profileContainer">
        <div className="profile-image-container">
          <img
            src={userInfo.photoURL}
            alt="profileImg"
            className="profile-image"
          />
        </div>
        <div className="profileInfosContainer">
          <h2> Informations generales</h2>
          <h1>Nom:</h1>
          <p>{userInfo.nom}</p>
          <h1>Prenom::</h1>
          <p>{userInfo.prenom}</p>
          <h1>Nom d'utilisateur:</h1>
          <p>{userInfo.displayName}</p>
          <h1>Email: </h1>
          <p>{currentUser.email}</p>
          <h1>Email Verification:</h1>

          {currentUser.emailVerified ? (
            <span>Verified</span>
          ) : (
            <span>Not Verified</span>
          )}
          <h1>Phone number:</h1>

          {currentUser.phoneNumber ? (
            <span>{currentUser.phoneNumber}</span>
          ) : (
            <span>Unknown</span>
          )}
          <h1>Account created: </h1>
          <p>{currentUser.metadata?.creationTime || "N/A"}</p>
          <h1>Last login: </h1>
          <p>{currentUser.metadata?.lastSignInTime || "N/A"}</p>

          <h2> Bio</h2>
          <p> {userInfo.bio}</p>
          <h2> Informations Kolchayy:</h2>
          <h1>KolChayy Rating: </h1>
          <p>{userInfo.rating}</p>
          <h1>Nombre de travails fait: </h1>
          <p>{userInfo.jobs_done} </p>
          <h1>Permis de conduite: </h1>
          {userInfo.driving_licence ? <p>Oui </p> : <p>Non</p>}
          <h1>Voiture disponible: </h1>
          {userInfo.has_car ? <p>Oui </p> : <p>Non</p>}
          <h1>Outils disponibles:</h1>
          <p> {userInfo.tools_for_work}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
