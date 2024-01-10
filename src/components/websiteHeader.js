import React from "react";
import Topbar from "./topbar";
import logo from "../images/KC_logo_white_bg.png";
import { Person } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";

export default function WebsiteHeader() {
  const navigate = useNavigate();

  return (
    <div className="websiteHeader">
      <img src={logo} alt="KCLogoWBG" className="logoTopLeft" />
      <Topbar />
      {/*<LogInStatus />*/}
      <div className="profileIconTopRight" onClick={() => navigate("/profile")}>
        <Person size={35} />
      </div>
    </div>
  );
}
