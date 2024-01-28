import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { getStorage } from "firebase/storage";
import { getFirestore, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUxb7n9KpCQTqv9_J8GOjIA0GdHRYh--c",
  authDomain: "kolchayapp.firebaseapp.com",
  projectId: "kolchayapp",
  storageBucket: "kolchayapp.appspot.com",
  messagingSenderId: "710783804432",
  appId: "1:710783804432:web:9ccf5c6b172f3edb599695",
  measurementId: "G-LP1NN7HYLN",
  databaseURL:
    "https://kolchayapp-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const database = getDatabase(app);
export const db = getFirestore();
export const storage = getStorage();
export const firestoreTimestamp = Timestamp;
