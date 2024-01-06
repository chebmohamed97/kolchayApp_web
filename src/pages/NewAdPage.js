import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
const NewAdPage = () => {
  const [err, setErr] = useState(false);

  const { isLoggedIn, login, logout, currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [jsonData, setjsonData] = useState([]);
  const [lastObject, setLastObject] = useState({});
  const [lastAdID, setLastAdID] = useState(0);
  const [newAd, setNewAd] = useState({});
  const db = getDatabase();
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
      setLastAdID(lastObject.idAnnonce + 1);
    }
  }, [lastObject]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titre = e.target[0].value;
    const nomEtPrenom = e.target[1].value;
    const region = e.target[2].value;
    const categorie = e.target[3].value;
    const contenu = e.target[4].value;

    const adJson = {
      title: titre,
      author: nomEtPrenom,
      region: region,
      serviceType: "Recherche de Service",
      category: categorie,
      content: contenu,
      idAnnonce: lastAdID,
    };

    console.log(adJson);
    writeUserData(adJson);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">Kolchayy.tn</span>
            <form onSubmit={handleSubmit}>
              <input required type="text" placeholder="Titre" />
              <input required type="text" placeholder="Nom et Prenom" />
              <input required type="text" placeholder="Region" />
              <input required type="text" placeholder="Categorie" />
              <input required type="text" placeholder="Contenu" />
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
