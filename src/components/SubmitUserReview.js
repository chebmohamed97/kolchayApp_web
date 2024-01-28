import React, { useContext, useState, useEffect } from "react";
import "./SubmitUserReview.scss";
import { FaStar } from "react-icons/fa";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../contexts/authContextChat";
export default function SubmitUserReview(userDataIncomming) {
  const [rating, setRating] = useState(0);
  const [UserData, setUserData] = useState(null);
  const [nameOfUser, setNameOfUser] = useState("");
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);

  const submitReview = async () => {
    try {
      await addDoc(collection(db, "userReviews"), {
        from: currentUser.uid,
        to: UserData.uid,
        rating: rating,
        comment: comment,
        date: serverTimestamp(),
      });
    } catch (err) {
      console.log("Error 1");
    }
  };
  const handleTextChange = (event) => {
    setComment(event.target.value);
  };
  useEffect(() => {
    if (userDataIncomming) {
      setUserData(userDataIncomming.userData);
    }
  }, [userDataIncomming]);

  useEffect(() => {
    if (UserData) {
      setNameOfUser(UserData.nom);
    }
  }, [UserData]);

  return (
    <div className="SubmitUserReviewContainer">
      <div className="starsRatingBox">
        <div className="starsRatingText">Noter {nameOfUser} :</div>
        <div>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />{" "}
                <FaStar
                  key={index} // Add a unique key prop here
                  className="star"
                  size={25}
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#000"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>{" "}
      </div>
      <div>
        <div>Commentaire: (optionnel)</div>
        <div>
          <input
            className="inputCommentaire"
            type="text"
            placeholder="Ecrivez votre commentaire ici"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <button
        className="submitReviewButton"
        onClick={submitReview}
        type="button"
      >
        {" "}
        Confirmer
      </button>
    </div>
  );
}
