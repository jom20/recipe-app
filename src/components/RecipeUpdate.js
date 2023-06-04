import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                <Link to={`/update/${recipe.id}`} className="btn btn-primary nature-btn">
                  Update
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Update;
