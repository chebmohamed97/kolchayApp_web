import React from "react";
import CategorieHomeItem from "./CategorieHomeItem";

export const liste_categories = [
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
  "Divers",
];
export default function CategoriesHome() {
  return (
    <div className="regions">
      {liste_categories.map((item, index) => (
        <CategorieHomeItem key={index} category={item} />
      ))}
    </div>
  );
}
