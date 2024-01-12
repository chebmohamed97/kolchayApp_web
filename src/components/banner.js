import React from "react";
import banner from "../images/banner.png";

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner Image" className="banner-image" />
    </div>
  );
};

export default Banner;
