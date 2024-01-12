import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/profileStyles.scss";
import UpdateProfileImage from "../components/UpdateProfileImage";
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
        <UpdateProfileImage />
        <div className="profileInfosContainer">
          <div>
            <h2> Bio</h2>
            <p> {userInfo.bio}</p>
          </div>

          <h2> Informations Kolchayy:</h2>
          <div>
            <text className="bold">KolChayy Rating: </text>
            <text>{userInfo.rating}</text>
          </div>
          <div>
            <text className="bold">Nombre de travails fait: </text>
            <text>{userInfo.jobs_done} </text>
          </div>
          <div>
            <text className="bold">Permis de conduite: </text>
            {userInfo.driving_licence ? <text>Oui </text> : <text>Non</text>}
          </div>
          <div>
            <text className="bold">Voiture disponible: </text>
            {userInfo.has_car ? <text>Oui </text> : <text>Non</text>}
          </div>
          <div>
            <text className="bold">Outils disponibles:</text>
            <p> {userInfo.tools_for_work}</p>
          </div>

          <h2> Informations generales</h2>
          <div>
            <text className="bold">Nom:</text>
            <text> {userInfo.nom}</text>
          </div>
          <div>
            <text className="bold">Prenom::</text>
            <text> {userInfo.prenom}</text>
          </div>

          <div>
            <text className="bold">Nom d'utilisateur:</text>
            <text> {userInfo.displayName}</text>
          </div>

          <div>
            <text className="bold">Email: </text>
            <text> {currentUser.email}</text>
          </div>

          <div>
            <text className="bold">Email Verification:</text>

            {currentUser.emailVerified ? (
              <span> Verified</span>
            ) : (
              <span> Not Verified</span>
            )}
          </div>

          <div>
            <text className="bold">Phone number:</text>

            {currentUser.phoneNumber ? (
              <span>{currentUser.phoneNumber}</span>
            ) : (
              <span>Unknown</span>
            )}
          </div>
          <div>
            <text className="bold">Account created: </text>
            <text>{currentUser.metadata?.creationTime || "N/A"}</text>
          </div>

          <div>
            <text className="bold">Last login: </text>
            <text>{currentUser.metadata?.lastSignInTime || "N/A"}</text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
