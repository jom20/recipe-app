import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delete = () => {
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

  const handleDelete = id => {
    // Send delete request to the server
    axios.delete(`http://localhost:8800/api/recipes/${id}`)
      .then(response => {
        console.log('Recipe deleted successfully');
        // Update the recipe list after deleting
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>Delete Recipes</h2>
      <ul className="list-group">
        {recipes.map(recipe => (
          <li className="list-group-item" key={recipe.id}>
            <img className="custom-logo" src={recipe.image} alt={recipe.title} />
            <span>{recipe.title}</span>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(recipe.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delete;
