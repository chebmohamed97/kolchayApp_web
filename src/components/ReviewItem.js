import React, { useContext, useState, useEffect } from "react";
import "./ReviewItem.scss";
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
import { db, firestoreTimestamp } from "../firebase";
import { AuthContext } from "../contexts/authContextChat";
import { FetchUserDataByUID } from "../utils/fetchDataFunctions";
export default function ReviewItem(item) {
  const [review, setReview] = useState({});
  const [rater, setRater] = useState("Rater");
  const [ratee, setRatee] = useState("Ratee");
  const [raterData, setRaterData] = useState(null);
  const [rateeData, setRateeData] = useState(null);
  useEffect(() => {
    setReview(item.item);
    setRater(item.item.from);
    setRatee(item.item.to);
    console.log(review);
  }, [item]);

  useEffect(() => {
    const fetchRaterData = async () => {
      try {
        if (rater != "Rater") {
          const data = await FetchUserDataByUID(rater);
          setRaterData(data);
        }
        if (ratee != "Ratee") {
          const data = await FetchUserDataByUID(ratee);
          setRateeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRaterData();
  }, [rater]);

  return (
    <div className="ReviewItemContainer">
      <p className="reviewHeaderText">
        {raterData && raterData.displayName} a noté(e){" "}
        {rateeData && rateeData.displayName} {review.rating}/5{" "}
      </p>
      <div> {review.comment}</div>
    </div>
  );
}
