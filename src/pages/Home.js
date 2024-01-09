import React, { useState, useEffect } from "react";
import Annonce from "../components/annonce";
import FilterBarRegion from "../components/FilterBarRegion";
import FilterBarCategory from "../components/FilterBarCategory";
import Banner from "../components/banner";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import AddButton from "../components/AddButton";
import Regions from "../components/Regions";
import CategorieHome from "../components/categorieHome";
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
          setjsonData(snapshot.val());
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
      <p>Choisissez votre ville</p>
      <div className="regionsContainer">
        <Regions />
      </div>
      <p>Choisissez la categorie</p>
      <CategorieHome />
      {/* <div className="filterBar">
        <FilterBarRegion data={jsonData} setFilteredData={setFilteredData} />
      </div>
      <div className="filterBar">
        <FilterBarCategory data={jsonData} setFilteredData={setFilteredData} />
      </div> */}
      <p>Annonces publié récemment</p>
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
