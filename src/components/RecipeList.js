import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the server
    axios.get('http://localhost:8800/api/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Recipes</h2>
      <ul className="list-group">
        {recipes.map(recipe => (
          <li className="list-group-item" key={recipe.id}>
            <div className="recipe-item">
              <img className="recipe-image" src={recipe.image} alt={recipe.title} />
              <a href={`/recipe/${recipe.id}`}>{recipe.title}</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default RecipeList;