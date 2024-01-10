import React, { useState, useEffect } from "react";
import Annonce from "../components/annonce";
import Banner from "../components/banner";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import AddButton from "../components/AddButton";
import Regions from "../components/Regions";
import CategoriesHome from "../components/CategoriesHome";
import { json } from "react-router-dom";
const Home = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [jsonData, setjsonData] = useState([]);
  const [lastObject, setLastObject] = useState({});
  const [lastAdID, setLastAdID] = useState(0);
  const database = getDatabase();
  const getRandomObject = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          data.reverse();
          setjsonData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //writeUserData(3);
  }, []);

  useEffect(() => {
    if (jsonData && jsonData.length > 0) {
      const lastObject = jsonData[jsonData.length - 1];
      setLastObject(lastObject);
    }
  }, [jsonData]);

  useEffect(() => {
    if (lastObject) {
      setLastAdID(lastObject.idAnnonce);
    }
  }, [lastObject]);

  return (
    <div>
      <Banner />
      <AddButton />
      <p className="boldCenteredText">Choisissez votre ville</p>
      <div className="regionsContainer">
        <Regions />
      </div>
      <p className="boldCenteredText">Choisissez la categorie</p>
      <div className="regionsContainer">
        <CategoriesHome />
      </div>
      <p className="boldCenteredText">Annonces publié récemment</p>
      <div className="allAdsHomePage">
        {filteredData.length === 0
          ? jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)
          : filteredData.map((item) => (
              <Annonce key={item.idAnnonce} item={item} />
            ))}
      </div>
    </div>
  );
};

export default Home;
