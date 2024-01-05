import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import Annonce from "../components/annonce";
const MessagesPage = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const [jsonData, setjsonData] = useState([]);
  const database = getDatabase();
  const writeUserData = (adID) => {
    const db = getDatabase();
    set(ref(db, "ads/" + adID), {
      title: "CHERCHE quelqun pour m'aider",
      author: "Hamza Aouachri",
      region: "Bizerte",
      serviceType: "Recherche de Service",
      category: "Divers",
      content:
        "I am currently experiencing a plumbing issue at my residence and am in need of urgent assistance. I came across your services online and was impressed with the positive reviews.  The issue I am facing involves [briefly describe the plumbing problem – e.g., a leaky faucet, burst pipe, clogged drain]. It requires immediate attention, and I believe your expertise could help resolve the situation effectively.",
    });
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
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

  if (!isLoggedIn) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Messages</h2>
      {jsonData.length === 0
        ? jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)
        : jsonData.map((item) => <Annonce key={item.idAnnonce} item={item} />)}
    </div>
  );
};

export default MessagesPage;
