import React, { useState, useEffect } from "react";
import Annonce from "../components/annonce";
import Banner from "../components/banner";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import AddButton from "../components/AddButton";
import Regions from "../components/Regions";
import CategoriesHome from "../components/CategoriesHome";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
const NewHome = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [jsonData, setjsonData] = useState([]);

  const fetchPost = async () => {
    try {
      {
        const docRef = doc(db, "annonces", "0");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setFilteredData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

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

export default NewHome;
