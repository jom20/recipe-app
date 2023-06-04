import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delete = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the server
    axios
      .get('http://localhost:8800/api/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDelete = id => {
    // Send delete request to the server
    axios
      .delete(`http://localhost:8800/api/recipes/${id}`)
      .then(response => {
        console.log('Recipe deleted successfully');
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Recipes</h2>
      {recipes.map(recipe => (
        <div key={recipe.id} className="mb-3">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(recipe.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Delete;
