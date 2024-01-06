import React from "react";
import Topbar from "./topbar";
import logo from "../images/KC_logo_white_bg.png";
import LogInStatus from "./logInStatus";
import NameDisplay from "./nameDisplay";
export default function WebsiteHeader() {
  return (
    <div className="websiteHeader">
      <img src={logo} alt="KCLogoWBG" className="logoTopLeft" />
      <Topbar />
      <LogInStatus />
      <NameDisplay />
    </div>
  );
}
