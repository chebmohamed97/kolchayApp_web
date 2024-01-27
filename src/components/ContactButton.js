import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/addButtonStyles.scss";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
export default function ContactButton(data) {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, userInfo } = useAuth();
  const userData = data.userData;

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > userData.uid
        ? currentUser.uid + userData.uid
        : userData.uid + currentUser.uid;
    console.log(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: userData.uid,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userData.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
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
    <div className="adBottomButtons">
      <a onClick={handleSelect} className="contacterAuteur">
        Contacter {userData.displayName}
      </a>
      <div className="signalerAnnonce">{"Signaler"}</div>
    </div>
  );
}
