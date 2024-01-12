import React, { useState, useEffect } from "react";
import Banner from "../components/banner";
import AddButton from "../components/AddButton";
import Regions from "../components/Regions";
import CategoriesHome from "../components/CategoriesHome";
import RecentAdsHome from "../components/RecentsAdsHome";
const Home = () => {
  return (
    <div>
      <Banner />
      <AddButton />
      <Regions />
      <CategoriesHome />
      <RecentAdsHome />
    </div>
  );
};

export default Home;
