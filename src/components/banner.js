import React from "react";
import banner from "../assets/banner.png";

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner" className="banner-image" />
    </div>
  );
};

export default Banner;
