import React from "react";

const CategorieHomeItem = () => {
  return (
    <div className="categorieHomeItem">
      <div>
        <img
          src="https://source.unsplash.com/random/200x200"
          alt="profileImg"
          className="itemImage" // Changed 'class' to 'className'
        />
      </div>
    </div>
  );
};

export default CategorieHomeItem;
