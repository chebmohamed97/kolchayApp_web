import React from "react";
import CategorieHomeItem from "./CategorieHomeItem";
export default function CategoriesHome() {
  const liste_categories = [
    "Assistance personelle",
    "Aide déménagement",
    "Transporteur",
    "Bricolage",
    "Réparations à la maison",
    "Montage mural",
    "Installation des lampes",
    "Travaux électriques",
    "Plomberie",
    "Peinture",
    "Jardinage",
  ];
  return (
    <div className="regions">
      {liste_categories.map((item) => (
        <CategorieHomeItem key={item.index} category={item} />
      ))}
    </div>
  );
}
