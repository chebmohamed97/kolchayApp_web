import React from 'react';
import { Link } from 'react-router-dom';

const ClickableText = ({ id, text }) => {
  return (
    <Link to={`/annonce/${id}`}>
      <span>{text}</span>
    </Link>
  );
};

export default ClickableText;