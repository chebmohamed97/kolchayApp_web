import React, { useState, useEffect } from "react";
import Annonce from "../components/annonce";
import FilterBarRegion from "../components/FilterBarRegion";
import FilterBarCategory from "../components/FilterBarCategory";
import Banner from "../components/banner";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import annonces from "../data/exemples-annonces.json";
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

  const writeUserData = (adID) => {
    const db = getDatabase();
    // Example usage with your jsonData array
    const randomObject = getRandomObject(annonces);

    set(ref(db, "ads/" + adID), {
      ...randomObject,
      idAnnonce: adID,
    });
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
      <div className="filterBar">
        <button
          className="filterBar"
          onClick={() => writeUserData(lastAdID + 1)}
        >
          Add new Ad
        </button>
      </div>

      <div className="filterBar">
        <FilterBarRegion data={jsonData} setFilteredData={setFilteredData} />
      </div>
      <div className="filterBar">
        <FilterBarCategory data={jsonData} setFilteredData={setFilteredData} />
      </div>
      <div>
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
