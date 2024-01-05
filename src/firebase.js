import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUxb7n9KpCQTqv9_J8GOjIA0GdHRYh--c",
  authDomain: "kolchayapp.firebaseapp.com",
  projectId: "kolchayapp",
  storageBucket: "kolchayapp.appspot.com",
  messagingSenderId: "710783804432",
  appId: "1:710783804432:web:9ccf5c6b172f3edb599695",
  measurementId: "G-LP1NN7HYLN",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
