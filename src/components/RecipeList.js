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
      <h2 className="text-center">Recipes</h2>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-lg-4 col-md-6 mb-4" key={recipe.id}>
            <div className="card">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} style={{width: '300px', height: '250'}} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <a href={`/recipe/${recipe.id}`} className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
