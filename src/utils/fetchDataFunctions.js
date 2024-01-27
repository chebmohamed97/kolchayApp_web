import { getDatabase, ref, get, child } from "firebase/database";
import { db } from "../firebase";
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
export async function FetchRealtimeDBData(collection) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, collection));

    if (snapshot.exists()) {
      const data = snapshot.val();
      const dataArray = Object.keys(data).map((key) => data[key]);
      return dataArray.reverse();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function FetchUserDataByUID(user_uid) {
  try {
    const docRef = doc(db, "users", user_uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function FetchUserDataByDisplayName(displayName) {
  try {
    const firestoreQuery = query(
      collection(db, "users"),
      where("displayName", "==", displayName)
    );
    const querySnapshot = await getDocs(firestoreQuery);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      const data = firstDoc.data();
      return data;
    } else {
      console.log("No documents matching the query!");
      return {}; // Return an empty object if no documents are found
    }
  } catch (error) {
    console.error(error);
    return {}; // Return an empty object in case of an error
  }
}
