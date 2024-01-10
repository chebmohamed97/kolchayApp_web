import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
const NewAdPage = () => {
  const [err, setErr] = useState(false);
  const { isLoggedIn, login, logout, currentUser, userInfo } = useAuth();
  const [jsonData, setjsonData] = useState([]);
  const [lastObject, setLastObject] = useState({});
  const [lastAdID, setLastAdID] = useState(0);
  const [newAd, setNewAd] = useState({});
  const db = getDatabase();
  const navigate = useNavigate();
  const writeUserData = (adJson) => {
    set(ref(db, "ads/" + adJson.idAnnonce), adJson);
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

    console.log(currentUser);
  }, []);

  useEffect(() => {
    if (jsonData && jsonData.length > 0) {
      const lastObject = jsonData[jsonData.length - 1];
      setLastObject(lastObject);
    }
  }, [jsonData]);

  useEffect(() => {
    if (lastObject) {
      setLastAdID(lastObject.idAnnonce + 1);
    }
  }, [lastObject]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titre = e.target[0].value;
    const region = e.target[1].value;
    const categorie = e.target[2].value;
    const contenu = e.target[3].value;
    const offre = e.target[4].value;
    const nomEtPrenom = userInfo.nom + userInfo.prenom;
    const adJson = {
      title: titre,
      author: nomEtPrenom,
      author_uid: currentUser.uid,
      region: region,
      offre: offre,
      serviceType: "Recherche de Service",
      category: categorie,
      content: contenu,
      idAnnonce: lastAdID,
    };

    console.log(adJson);
    try {
      writeUserData(adJson);
      navigate(`/annonce/${adJson.idAnnonce}`);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="newAdContainer">
      {isLoggedIn ? (
        <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">Kolchayy.tn</span>
            <form onSubmit={handleSubmit}>
              <input required type="text" placeholder="Titre" />
              <input required type="text" placeholder="Region" />
              <input required type="text" placeholder="Categorie" />
              <input required type="text" placeholder="Contenu" />
              <input required type="text" placeholder="Prix" />
              <button>Add new ad</button>
              {err && <span>Something went wrong</span>}
            </form>
          </div>
        </div>
      ) : (
        <p>You need to log in to add a new ad ! </p>
      )}
    </div>
  );
};

export default NewAdPage;
