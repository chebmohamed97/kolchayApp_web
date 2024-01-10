import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

const PageAnnonce = () => {
  const { id } = useParams();
  const [jsonData, setjsonData] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setjsonData(snapshot.val());
          console.log(snapshot.val());
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
    <div>
      <h1>{announcement.title}</h1>
      <p>Author: {announcement.author}</p>
      <p>Region: {announcement.region}</p>
      <p>Service Type: {announcement.serviceType}</p>
      <p>Category: {announcement.category}</p>
      <p>Content: {announcement.content}</p>
    </div>
  );
};

export default PageAnnonce;
