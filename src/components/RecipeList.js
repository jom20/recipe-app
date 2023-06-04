import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeList = () => {
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
    <div className="container" style={{ backgroundColor: '#f5f5f5', padding: '20px', margin: '10px' }}>
      <h1 className="text-center" style={{ color: '#333', fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        Recipes
      </h1>
      <div className="row">
        {recipes.map(recipe => (
          <div
            className="col-md-4"
            key={recipe.id}
            style={{
              backgroundColor: '#fff',
              color: '#333',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ objectFit: 'cover', height: '200px', marginBottom: '10px', width: '100%' }}
            />
            <a href={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: '#333', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
              {recipe.title}
            </a>
            <p style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
