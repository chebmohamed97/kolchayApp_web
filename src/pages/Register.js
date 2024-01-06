import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const downloadURL = "https://source.unsplash.com/random/200x200";
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setShowMessage(1);
      try {
        //Update profile
        await updateProfile(res.user, {
          displayName,
        });

        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
        });

        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
      } catch (err) {
        console.log(err);
        setErr(true);
        setLoading(false);
        setShowMessage(2);
      }
    } catch (err) {
      setShowMessage(2);
      setErr(true);
      setLoading(false);
    }
  };

  const accountCreationValidation = () => {
    if (showMessage === 0) {
      return <span></span>;
    }
    if (showMessage === 1) {
      return <span>Le compte a ete cree aves succes !</span>;
    }
    if (showMessage === 2) {
      return <span>Probleme survenu !</span>;
    }
  };
  console.log(err);
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Kolchayy.tn</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <button disabled={loading}>Sign up</button>
          {accountCreationValidation()}
        </form>
        <p>You do have an account?</p>
        <button onClick={() => navigate("/login")}> Log in</button>
      </div>
    </div>
  );
};

export default Register;
