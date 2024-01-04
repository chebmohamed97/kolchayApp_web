import React from 'react';
import { useParams } from 'react-router-dom';
import adData from '../data/exemples-annonces.json';

const PageAnnonce = () => {
  const { id } = useParams();
  
  const findAdById = (idAnnonce, data) => {
    const announcement = data.find(item => item.idAnnonce === idAnnonce);
  
    return announcement || null;
  };
  const announcement = findAdById(Number(id), adData);

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    
    <div>
      <h1>{announcement.title}</h1>
      <p>Author: {announcement.author}</p>
      <p>Region: {announcement.region}</p>
      <p>Service Type: {announcement.serviceType}</p>
      <p>Category: {announcement.category}</p>
      <p>Content: {announcement.content}</p>
    </div>
  );
};

export default PageAnnonce;
