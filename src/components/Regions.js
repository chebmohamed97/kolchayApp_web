import React from "react";
import RegionItem from "./RegionItem";

export const listeGouvernerat = [
  "Ariana",
  "Béja",
  "Ben Arous",
  "Bizerte",
  "El Kef",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kesserine",
  "Kebili",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
];
export default function Regions() {
  return (
    <div className="regionsContainer">
      <p className="boldCenteredText">Choisissez votre ville</p>
      <div className="regions">
        {listeGouvernerat.map((item, index) => (
          <RegionItem key={index} gouvernerat={item} />
        ))}
      </div>
    </div>
  );
}
