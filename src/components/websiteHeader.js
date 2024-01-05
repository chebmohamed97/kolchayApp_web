import React from "react";
import Topbar from "./topbar";
import logo from "../images/KC_logo_white_bg.png";
import LogInStatus from "./logInStatus";

export default function WebsiteHeader() {
  return (
    <div className="websiteHeader">
      <img src={logo} alt="KCLogoWBG" width="100" height="100" />
      <Topbar />
      <LogInStatus />
    </div>
  );
}
