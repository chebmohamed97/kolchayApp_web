import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PencilSquare } from "react-bootstrap-icons";
import UpdateProfileImage from "../components/UpdateProfileImage";
import "../styles/profileStyles.scss";
const MyProfilePage = () => {
  const { isLoggedIn, currentUser, userInfo } = useAuth();
  const [changingBio, setChangingBio] = useState(false);

  const toggleChangingBio = () => {
    setChangingBio(!changingBio);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  }

  return (
    <div className="profilePageContainer">
      <div className="profileContainer">
        <UpdateProfileImage />
      </div>
      <div className="bioContainer">
        <h2> Bio</h2>
        <div className="changeBioIcon" onClick={toggleChangingBio}>
          <PencilSquare size={20} />
        </div>
      </div>
      {changingBio ? (
        <form onSubmit={toggleChangingBio}>
          <input type="text" placeholder="Bio" />
        </form>
      ) : (
        <p className="bioContent"> {userInfo.bio}</p>
      )}

      <h2> Informations Kolchayy:</h2>
      <div>
        <p className="bold">KolChayy Rating: </p>
        <p>{userInfo.rating}</p>
      </div>
      <div>
        <p className="bold">Nombre de travails fait: </p>
        <p>{userInfo.jobs_done} </p>
      </div>
      <div>
        <p className="bold">Permis de conduite: </p>
        {userInfo.driving_licence ? <p>Oui </p> : <p>Non</p>}
      </div>
      <div>
        <p className="bold">Voiture disponible: </p>
        {userInfo.has_car ? <p>Oui </p> : <p>Non</p>}
      </div>
      <div>
        <p className="bold">Outils disponibles:</p>
        <p> {userInfo.tools_for_work}</p>
      </div>

      <h2> Informations generales</h2>
      <div>
        <p className="bold">Nom:</p>
        <p> {userInfo.nom}</p>
      </div>
      <div>
        <p className="bold">Prenom:</p>
        <p> {userInfo.prenom}</p>
      </div>

      <div>
        <p className="bold">Nom d'utilisateur:</p>
        <p> {userInfo.displayName}</p>
      </div>

      <div>
        <p className="bold">Email: </p>
        <p> {currentUser.email}</p>
      </div>

      <div>
        <p className="bold">Email Verification:</p>

        {currentUser.emailVerified ? (
          <span> Verified</span>
        ) : (
          <span> Not Verified</span>
        )}
      </div>

      <div>
        <p className="bold">Phone number:</p>

        {currentUser.phoneNumber ? (
          <span>{currentUser.phoneNumber}</span>
        ) : (
          <span>Unknown</span>
        )}
      </div>
      <div>
        <p className="bold">Account created: </p>
        <p>{currentUser.metadata?.creationTime || "N/A"}</p>
      </div>

      <div>
        <p className="bold">Last login: </p>
        <p>{currentUser.metadata?.lastSignInTime || "N/A"}</p>
      </div>
    </div>
  );
};

export default MyProfilePage;
