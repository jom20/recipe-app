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
            <div className="row align-items-center">
              <div className="col-4">
                <img
                  className="custom-logo rounded-circle"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
              <div className="col-6">
                <span className="fw-bold">{recipe.title}</span>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delete;
