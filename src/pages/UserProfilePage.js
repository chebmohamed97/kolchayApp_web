import "../styles/profileStyles.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FetchUserDataByDisplayName } from "../utils/fetchDataFunctions.js";
import { useNavigate } from "react-router-dom";
import ContactButton from "../components/ContactButton.js";
import { useAuth } from "../contexts/AuthContext";
import MyProfilePage from "./MyProfilePage";
import {
  StarFill,
  ListTask,
  FilePerson,
  CarFrontFill,
  Tools,
} from "react-bootstrap-icons";
import SubmitUserReview from "../components/SubmitUserReview.js";
import ReviewItem from "../components/ReviewItem.js";
import ReviewCollection from "../components/Reviewcollection.js";
export default function UserProfilePage() {
  const { userDisplayName } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { isLoggedIn, login, logout, currentUser } = useAuth();

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
    <div>
      {" "}
      {currentUser.displayName === userDisplayName ? (
        <MyProfilePage />
      ) : (
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
          <div className="ratingInfo">
            <StarFill className="starIcon" />
            <p className="bold">Note: </p>
            <p className="ratingContent">{userData.rating}/5</p>
          </div>
          <div className="tasksDoneInfo">
            <ListTask className="taskIcon" />
            <p className="bold">Nombre de travails fait: </p>
            <p className="tasksDoneContent">{userData.jobs_done} </p>
          </div>
          <div className="drivingPermitInfo">
            <FilePerson className="drivingPermitIcon" />
            <p className="bold">Permis de conduite: </p>
            {userData.driving_licence ? (
              <p className="drivingPermitContent">Oui </p>
            ) : (
              <p className="drivingPermitContent">Non</p>
            )}
          </div>
          <div className="carInfo">
            <CarFrontFill className="carIcon" />
            <p className="bold">Voiture disponible: </p>
            {userData.has_car ? (
              <p className="carInfoContent">Oui </p>
            ) : (
              <p className="carInfoContent">Non</p>
            )}
          </div>
          <div className="toolsInfo">
            <Tools className="toolsIcon" />
            <p className="bold">Outils disponibles:</p>
            <p className="toolsInfoContent"> {userData.tools_for_work}</p>
          </div>

          <h2> Informations generales</h2>
          <div className="nameInfo">
            <p className="bold">Nom:</p>
            <p className="nameInfoContent"> {userData.nom}</p>
          </div>
          <div className="firstNameInfo">
            <p className="bold">Prenom:</p>
            <p className="firstNameInfoContent"> {userData.prenom}</p>
          </div>

          <div className="displayNameInfo">
            <p className="bold">Nom d'utilisateur:</p>
            <p className="displayNameInfoContent"> {userData.displayName}</p>
          </div>

          <div className="emailInfo">
            <p className="bold">Email: </p>
            <p className="emailInfoContent"> {userData.email}</p>
          </div>
          <SubmitUserReview userData={userData} />
          <ReviewCollection userDataIncomming={userData} />
        </div>
      )}
    </div>
  );
}
