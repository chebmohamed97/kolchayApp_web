import React from "react";
import "../styles/annonce.scss";
import ClickableText from "./clickableText";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
export default function Annonce({ item }) {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, userInfo } = useAuth();
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > item.author_uid
        ? currentUser.uid + item.author_uid
        : item.author_uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: item.author_uid,
            displayName: item.author,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", item.author_uid), {
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

  return (
    <div
      className="annonce"
      onClick={() => {
        navigate(`/annonce/${item.idAnnonce}`);
      }}
    >
      <div className="titreAnnonce">
        <ClickableText id={item.idAnnonce} text={item.title} />
      </div>
      <div className="keyWords">
        <div className="TypeDeService">{item.serviceType}</div>
        <div className="CategorieDuService">{item.category}</div>
        <div className="AnnonceAuthor">{item.author}</div>
        <div className="RegionDuService">{item.region}</div>
      </div>

      <div className="contenuAnnonce">{item.content}</div>
      <div className="adBottomButtons">
        <a onClick={handleSelect} className="contacterAuteur">
          {"Contacter"}
        </a>
        <div className="signalerAnnonce">{"Signaler l'annonce"}</div>
        <div className="priceDisplay"> Offre: {item.offre} DT </div>
      </div>
    </div>
  );
}
