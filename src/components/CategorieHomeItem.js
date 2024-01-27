import React, { useEffect } from "react";

export default function CategorieHomeItem({ category }) {
  useEffect(() => {}, []);
  return (
    <div className="regionItem">
      {category.hasOwnProperty("icon") ? (
        <img src={category.icon} alt="profileImg" />
      ) : (
        <></>
      )}
      <a href={`/categories/${category}`}>{category}</a>
    </div>
  );
}
