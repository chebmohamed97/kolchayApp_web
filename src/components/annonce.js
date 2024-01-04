import React from 'react';
import '../styles/annonce.css';

export default function Annonce({ item}){
    return (
        <div className="annonce">
            <div className="titreAnnonce" >
            {item.title}
            </div>
            
            <div className="TypeDeService"> 
                {item.serviceType}
            </div>
            <div className="CategorieDuService"> 
                {item.category}
            </div>
            <div className="AnnonceAuthor"> 
                {item.author}
            </div>
            <div className="RegionDuService"> 
                {item.region}
            </div>
            <div className="contenuAnnonce">
                {item.content}
            </div>
            <a href={item.idAnnonce || "#"} className="contacterAuteur">
            {"Contacter l'auteur de l'annonce"}
            </a>
            <div className="signalerAnnonce">
                {"Signaler l'annonce"}
            </div>
        </div>
    )
}