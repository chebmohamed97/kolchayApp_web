import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { CapitalizeFirstLetter } from "../utils/helper";

const Register = () => {
  const downloadURL =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200&d=mp&r=g";
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  const executeLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      login();
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const nom = CapitalizeFirstLetter(e.target[0].value);
    const prenom = CapitalizeFirstLetter(e.target[1].value);
    const displayName = CapitalizeFirstLetter(e.target[2].value);
    const email = e.target[3].value;
    const password = e.target[4].value;

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
          nom: nom,
          prenom: prenom,
          displayName,
          email,
          tel_number: "",
          photoURL: downloadURL,
          rating: 0,
          jobs_done: 0,
          driving_licence: false,
          has_car: false,
          tools_for_work: [],
          bio: "Ici je peux ecrire une petite description de ma personne et aussi decrire mes experiences et skills",
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

      executeLogin(email, password);
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
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Register</span>
        {/* <span className="title">Register</span> */}
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Nom" />
          <input required type="text" placeholder="Prenom" />
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <button disabled={loading}>Sign up</button>
          {accountCreationValidation()}
        </form>
        {/* <p>You do have an account?</p>
        <button onClick={() => navigate("/login")}> Log in</button> */}
      </div>
    </div>
  );
};

export default Register;
