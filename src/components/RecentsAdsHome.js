import React, { useState, useEffect } from "react";
import Annonce from "./Annonce";
import { FetchRealtimeDBData } from "../utils/fetchDataFunctions";

export default function RecentAdsHome() {
  const [jsonData, setjsonData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const dataArray = await FetchRealtimeDBData("/ads");
      setjsonData(dataArray);
    };

    fetchDataAndSetState();
  }, []);

  return (
    <div>
      <div>
        <p className="boldCenteredText">Annonces publié récemment</p>
      </div>
      <div className="allAdsHomePage">
        {jsonData.length === 0 ? (
          <></>
        ) : (
          jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)
        )}
      </div>
    </div>
  );
}
