import React from "react";
import "../styles/annonce.scss";
import ClickableText from "./clickableText";

export default function Annonce({ item }) {
  return (
    <div className="annonce">
      <div className="titreAnnonce">
        <ClickableText id={item.idAnnonce} text={item.title} />
      </div>
      <div classname="keyWords">
        <div className="TypeDeService">{item.serviceType}</div>
        <div className="CategorieDuService">{item.category}</div>
        <div className="AnnonceAuthor">{item.author}</div>
        <div className="RegionDuService">{item.region}</div>
      </div>

      <div className="contenuAnnonce">{item.content}</div>
      <a href={item.idAnnonce || "#"} className="contacterAuteur">
        {"Contacter"}
      </a>
      <div className="signalerAnnonce">{"Signaler l'annonce"}</div>
    </div>
  );
}
