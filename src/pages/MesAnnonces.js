import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
const MesAnnonces = () => {
  const { currentUser } = useAuth();
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
            (item) => item.author_uid === currentUser.uid
          );
          console.log(filteredData);
          setjsonData(filteredData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser.uid]);

  return (
    <div>
      <h3>Mes Annonces</h3>
      <div className="mesAnnoncesContainer">
        {jsonData.map((item) => (
          <div key={item.idAnnonce} className="mesAnnoncesItem">
            <a href={`/annonce/${item.idAnnonce}`}>
              ID: {item.idAnnonce} - {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesAnnonces;
