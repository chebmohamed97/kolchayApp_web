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
      <p className="boldCenteredText">Choisissez votre ville</p>
      <div className="regionsContainer">
        <Regions />
      </div>
      <p className="boldCenteredText">Choisissez la categorie</p>
      <div className="regionsContainer">
        <CategoriesHome />
      </div>
      <p className="boldCenteredText">Annonces publié récemment</p>
      <RecentAdsHome />
    </div>
  );
};

export default Home;
