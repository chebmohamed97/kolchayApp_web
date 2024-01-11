import React from "react";
import { liste_categories } from "../components/CategoriesHome";
const Categories = () => {
  return (
    <div className="categoriesPageContainer">
      {liste_categories.map((item, index) => (
        <div className="categoryItemCategoryPage">
          <a href={`/categories/${item}`}>{item} </a>
        </div>
      ))}
    </div>
  );
};

export default Categories;
