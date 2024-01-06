import React from "react";
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import Annonce from "../components/annonce";
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
          const filteredData = data.filter((item) => item.region === region);
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
    <div>
      <div>
        <p> {region} </p>
      </div>
      <div className="allAdsHomePage">
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
