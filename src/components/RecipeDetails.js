import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details from the server
    axios
      .get(`http://localhost:8800/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!recipe) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container" style={{ backgroundColor: '#f5f5f5', padding: '20px', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h2 style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>{recipe.title}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <img
          className="custom-thumbnail"
          src={recipe.image}
          alt={recipe.title}
          style={{ objectFit: 'cover', height: '300px' }}
        />
      </div>
      <p style={{ color: '#333', fontSize: '16px', marginBottom: '20px' }}>{recipe.description}</p>
      <CommentForm recipeId={id} />
      <Link to="/" className="btn btn-primary" style={{ backgroundColor: '#b06c49', borderColor: '#b06c49', marginTop: '20px' }}>
        Return to Recipes
      </Link>
    </div>
  );
};

export default RecipeDetails;
