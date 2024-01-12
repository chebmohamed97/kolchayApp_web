import React from "react";
import Topbar from "./topbar";
import logo from "../images/KC_logo_white_bg.png";
import ProfileIconHeader from "./ProfileIconHeader";
import { useNavigate } from "react-router-dom";
export default function WebsiteHeader() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="websiteHeader">
      <div onClick={handleLogoClick}>
        <img src={logo} alt="KCLogoWBG" className="logoTopLeft" />
      </div>

      <Topbar />
      {/*<LogInStatus />*/}
      <ProfileIconHeader />
    </div>
  );
}
