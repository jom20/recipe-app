import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = () => {
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

  const handleUpdate = recipeId => {
    // Handle update logic here
    console.log(`Update recipe with ID: ${recipeId}`);

    // Example update request to the server
    axios
      .put(`http://localhost:8800/api/recipes/${recipeId}`, { /* Updated recipe data */ })
      .then(response => {
        console.log('Recipe updated successfully');
        // Perform any necessary UI updates or navigation after successful update
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Recipe</h2>
      <div className="card nature-card">
        <div className="card-body">
          <ul className="list-group">
            {recipes.map(recipe => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={recipe.id}>
                <div>
                  <img className="nature-image" src={recipe.image} alt={recipe.title} />
                  {recipe.title}
                </div>
                <button className="btn btn-primary nature-btn" onClick={() => handleUpdate(recipe.id)}>
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Update;
