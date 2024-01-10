import React from "react";
import RegionItem from "./RegionItem";
export default function Regions() {
  const listeGouvernerat = [
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
  return (
    <div className="regions">
      {listeGouvernerat.map((item, index) => (
        <RegionItem key={index} gouvernerat={item} />
      ))}
    </div>
  );
}
