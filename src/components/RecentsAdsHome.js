import React, { useState, useEffect } from "react";
import Annonce from "./annonce";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
export default function RecentAdsHome() {
  const [filteredData, setFilteredData] = useState([]);
  const [jsonData, setjsonData] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          const dataArray = Object.keys(data).map((key) => data[key]);
          setjsonData(dataArray.reverse());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="allAdsHomePage">
      {jsonData.length === 0 ? (
        <></>
      ) : (
        jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)
      )}
    </div>
  );
}
