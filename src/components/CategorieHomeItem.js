import React from "react";

export default function CategorieHomeItem({ category }) {
  return (
    <div className="regionItem">
      <a href={`/category/${category}`}>{category}</a>
    </div>
  );
}
