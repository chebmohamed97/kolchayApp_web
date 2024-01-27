import React from "react";
import { liste_categories } from "../components/CategoriesHome";

const CategoriesListPage = () => {
  return (
    <div className="categoriesPageContainer">
      {liste_categories.map((item, index) => (
        <div key={index} className="categoryItemCategoryPage">
          <a href={`/categories/${item}`}>{item}</a>
        </div>
      ))}
    </div>
  );
};

export default CategoriesListPage;
