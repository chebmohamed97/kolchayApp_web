import "../styles/profileStyles.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FetchUserDataByDisplayName } from "../utils/fetchDataFunctions.js";
import { useNavigate } from "react-router-dom";
import ContactButton from "../components/ContactButton.js";
export default function UserProfilePage() {
  const { userDisplayName } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchUserDataByDisplayName(userDisplayName);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userDisplayName]);

  return (
    <div className="profilePageContainer">
      <ContactButton userData={userData} />
      <div className="profileContainer">
        <div className="profile-image-container">
          <img
            src={userData.photoURL}
            alt="profileImg"
            className="profile-image"
          />
        </div>
      </div>
      <div className="bioContainer">
        <h2> Bio</h2>
      </div>
      <div className="bioContent"> {userData.bio}</div>

      <h2> Informations Kolchayy:</h2>
      <div>
        <p className="bold">KolChayy Rating: </p>
        <p>{userData.rating}</p>
      </div>
      <div>
        <p className="bold">Nombre de travails fait: </p>
        <p>{userData.jobs_done} </p>
      </div>
      <div>
        <p className="bold">Permis de conduite: </p>
        {userData.driving_licence ? <p>Oui </p> : <p>Non</p>}
      </div>
      <div>
        <p className="bold">Voiture disponible: </p>
        {userData.has_car ? <p>Oui </p> : <p>Non</p>}
      </div>
      <div>
        <p className="bold">Outils disponibles:</p>
        <p> {userData.tools_for_work}</p>
      </div>

      <h2> Informations generales</h2>
      <div>
        <p className="bold">Nom:</p>
        <p> {userData.nom}</p>
      </div>
      <div>
        <p className="bold">Prenom:</p>
        <p> {userData.prenom}</p>
      </div>

      <div>
        <p className="bold">Nom d'utilisateur:</p>
        <p> {userData.displayName}</p>
      </div>
    </div>
  );
}
