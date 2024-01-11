import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import "../styles/pageAnnonceStyle.scss";
const PageAnnonce = () => {
  const { id } = useParams();
  const [jsonData, setjsonData] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Transform the object into an array
          const dataArray = Object.keys(data).map((key) => data[key]);
          setjsonData(dataArray);
          console.log(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const findAdById = (idAnnonce, jsonData) => {
    const announcement = jsonData.find(
      (item) => item && item.idAnnonce === idAnnonce
    );

    return announcement || null;
  };

  const announcement = findAdById(Number(id), jsonData);

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    <div className="infoAnnonceContainer">
      <div className="adTitel">{announcement.title}</div>
      <p className="adContentText">{announcement.content}</p>
      <p className="adSubTitel">Author: </p>
      <p>{announcement.author}</p>
      <p className="adSubTitel">Region: </p>
      <p>{announcement.region}</p>
      <p className="adSubTitel">Service Type: </p>
      <p>{announcement.serviceType}</p>
      <p className="adSubTitel">Category: </p>
      <p>{announcement.category}</p>
    </div>
  );
};

export default PageAnnonce;
