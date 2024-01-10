import React from "react";
import Topbar from "./topbar";
import logo from "../images/KC_logo_white_bg.png";
import { Person } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function WebsiteHeader() {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, currentUser } = useAuth();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="websiteHeader">
      <img src={logo} alt="KCLogoWBG" className="logoTopLeft" />
      <Topbar />
      {/*<LogInStatus />*/}
      <div className="profileIconTopRight" onClick={handleClick}>
        <Person size={35} />
      </div>
    </div>
  );
}
