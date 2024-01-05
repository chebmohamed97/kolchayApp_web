import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import adData from '../data/exemples-annonces.json';

const PageAnnonce = () => {
  const { id } = useParams();
  const [jsonData, setjsonData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/accounts');
      const data = await response.json();
      setjsonData(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  
  const findAdById = (idAnnonce, jsonData) => {
    const announcement = jsonData.find(item => item.idAnnonce === idAnnonce);
  
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
