import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Register from "./Register";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      login();
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Login</span>
          {/* <span className="title">Login</span> */}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>Sign in</button>
            {err && <span>Something went wrong</span>}
          </form>
          {/* <p>You don't have an account?</p>
          <button onClick={handleRegisterButton}>Register</button> */}
        </div>
      </div>

      <div>
        <Register />
      </div>
    </div>
  );
};

export default Login;
