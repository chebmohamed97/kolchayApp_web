import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import Annonce from "../components/Annonce";
import "../styles/pageCategory.scss";
const database = getDatabase();

const CategoryPage = () => {
  const { category } = useParams();
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
            (item) => item.category === category
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
      <div>
        <h3> {category} </h3>
      </div>
      <div className="adsContainer">
        {jsonData.length === 0 ? (
          <p> Desole mais y'a pas d'annonces dans cette categorie ! </p>
        ) : (
          jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
