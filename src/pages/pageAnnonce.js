import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import "../styles/pageAnnonceStyle.scss";
const PageAnnonce = () => {
  const { id } = useParams();
  const [jsonData, setjsonData] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, userInfo } = useAuth();
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > announcement.author_uid
        ? currentUser.uid + announcement.author_uid
        : announcement.author_uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: announcement.author_uid,
            displayName: announcement.author,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", announcement.author_uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            // photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      navigate("/messages");
    } catch (err) {
      console.log("Error 1");
    }
  };
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ads/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Transform the object into an array
          const dataArray = Object.keys(data).map((key) => data[key]);
          setjsonData(dataArray);
          console.log(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const findAdById = (idAnnonce, jsonData) => {
    const announcement = jsonData.find(
      (item) => item && item.idAnnonce === idAnnonce
    );

    return announcement || null;
  };

  const announcement = findAdById(Number(id), jsonData);

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    <div>
      <div className="adBottomButtons">
        <a onClick={handleSelect} className="contacterAuteur">
          Contacter {announcement.author}
        </a>
        <div className="signalerAnnonce">{"Signaler l'annonce"}</div>
      </div>
      <div className="infoAnnonceContainer">
        <div className="adTitel">{announcement.title}</div>
        <p className="adContentText">{announcement.content}</p>
        <p className="adSubTitel">Author: </p>
        <p>{announcement.author}</p>
        <p className="adSubTitel">Region: </p>
        <p>{announcement.region}</p>
        <p className="adSubTitel">Service Type: </p>
        <p>{announcement.serviceType}</p>
        <p className="adSubTitel">Category: </p>
        <p>{announcement.category}</p>
      </div>
    </div>
  );
};

export default PageAnnonce;
