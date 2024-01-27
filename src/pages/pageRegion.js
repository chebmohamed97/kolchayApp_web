import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import Annonce from "../components/Annonce";
import "../styles/pageRegion.scss";
const database = getDatabase();

const PageRegion = () => {
  const { region } = useParams();
  const [jsonData, setjsonData] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert the object into an array of its values
          const dataArray = Object.values(data);
          const filteredData = dataArray.filter(
            (item) => item.region === region
          );
          setjsonData(filteredData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h3> {region} </h3>
      <div className="adsContainer">
        {jsonData.length === 0 ? (
          <p> On a pas trouve d'annonces dans votre region ! </p>
        ) : (
          jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)
        )}
      </div>
    </div>
  );
};

export default PageRegion;
