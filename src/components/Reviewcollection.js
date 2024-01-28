import React, { useContext, useState, useEffect } from "react";
import "./ReviewCollection.scss";
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
import ReviewItem from "./ReviewItem";
export default function ReviewCollection(userDataIncomming) {
  const [UserData, setUserData] = useState({});
  const [queryResult, setQueryResult] = useState(null);
  const [reviewsArray, setReviewsArray] = useState([]);
  useEffect(() => {
    setUserData(userDataIncomming.userDataIncomming);
  }, [userDataIncomming]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "userReviews"),
      where("to", "==", UserData.uid)
    );

    try {
      const querySnapshot = await getDocs(q);
      setQueryResult(querySnapshot);
      const arrayResult = [];
      querySnapshot.forEach((doc) => {
        arrayResult.push(doc.data());
      });
      setReviewsArray(arrayResult);
    } catch (err) {
      console.log("got Error DB");
    }
  };
  useEffect(() => {
    if (Object.keys(UserData).length != 0) {
      handleSearch();
    }
  }, [UserData]);

  return (
    <div className="ReviewCollectionContainer">
      <div className="allReviews">
        {reviewsArray.length === 0 ? (
          <>No Reviews</>
        ) : (
          reviewsArray.map((item) => (
            <ReviewItem key={item.comment} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
