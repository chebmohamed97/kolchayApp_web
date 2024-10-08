import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import { listeGouvernerat } from "../components/Regions";
import { liste_categories } from "../components/CategoriesHome";
import "../styles/NewAdStyle.scss";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
const NewAdPage = () => {
  const [err, setErr] = useState(false);
  const { isLoggedIn, login, logout, currentUser, userInfo } = useAuth();
  const [jsonData, setjsonData] = useState([]);
  const [lastObject, setLastObject] = useState({});
  const [lastAdID, setLastAdID] = useState(0);
  const db = getDatabase();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("Ariana");
  const [selectedCategory, setSelectedCategory] = useState(
    "Assistance personelle"
  );

  // Handle change
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const writeUserData = (adJson) => {
    set(ref(db, "ads/" + adJson.idAnnonce), adJson);
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.keys(data).map((key) => data[key]);
          setjsonData(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    const contenu = e.target[1].value;
    const offre = e.target[2].value;
    const nomEtPrenom = userInfo.nom + userInfo.prenom;
    const adJson = {
      title: titre,
      author: nomEtPrenom,
      author_uid: currentUser.uid,
      region: selectedRegion,
      offre: offre,
      serviceType: "Recherche de Service",
      category: selectedCategory,
      content: contenu,
      idAnnonce: lastAdID,
      date_of_publishing: Timestamp.now(),
    };

    console.log(adJson);
    try {
      writeUserData(adJson);
      navigate(`/annonce/${adJson.idAnnonce}`);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className="newAdContainer">
      {isLoggedIn ? (
        <div className="formContainer">
          <div className="formWrapper">
            <form onSubmit={handleSubmit}>
              <input required type="text" placeholder="Titre" />
              <input
                required
                type="text"
                placeholder="Contenu"
                height={100}
                className="large-input"
              />
              <input required type="text" placeholder="Prix" />
              <label>
                Categorie:
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  size="1"
                >
                  {liste_categories.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Region:
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  size="1"
                >
                  {listeGouvernerat.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </label>
              <button>Postez votre annonce</button>
              {err && <span>Une erreur s'est produite</span>}
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
