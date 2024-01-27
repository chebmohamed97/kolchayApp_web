import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchUserDataByUID } from "../utils/fetchDataFunctions.js";
import getTimeSincePublishing from "../utils/helper.js";
import "../styles/annonce.scss";
export default function Annonce({ item }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchUserDataByUID(item.author_uid);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [item.author_uid]);
  return (
    <div className="annonce">
      <div className="annonceHeader">
        <img
          src={userData.photoURL}
          alt="userImg"
          className="UserImageAnnonce"
        />
        <span
          className="nameOfAuthorAd"
          onClick={() => navigate(`/profile/${userData.displayName}`)}
        >
          {userData.displayName}
        </span>
        <div className="timeOfPublishingAd">
          {getTimeSincePublishing(item.date_of_publishing.seconds)}
        </div>
      </div>

      <div
        className="titreAnnonce"
        onClick={() => {
          navigate(`/annonce/${item.idAnnonce}`);
        }}
      >
        {item.title}
      </div>

      <div className="keyWords">
        <div className="TypeDeService">{item.serviceType}</div>
        <div className="CategorieDuService">{item.category}</div>
        <div className="RegionDuService">{item.region}</div>
      </div>

      <div className="contenuAnnonce">{item.content}</div>
      <div className="priceDisplay"> {item.offre} DT </div>
    </div>
  );
}
