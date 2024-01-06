import React from "react";
import "../styles/annonce.scss";
import ClickableText from "./clickableText";
import { useNavigate, Link } from "react-router-dom";

export default function Annonce({ item }) {
  const navigate = useNavigate();

  return (
    <div
      className="annonce"
      onClick={() => {
        navigate(`/annonce/${item.idAnnonce}`);
      }}
    >
      <div className="titreAnnonce">
        <ClickableText id={item.idAnnonce} text={item.title} />
      </div>
      <div className="keyWords">
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
