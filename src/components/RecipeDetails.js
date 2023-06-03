import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details from the server
    axios.get(`http://localhost:8800/api/recipes/${id}`)
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
    <div className="container">
      <h2>{recipe.title}</h2>
      <img className="custom-thumbnail" src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <CommentForm recipeId={id} />
    </div>
  );
};

export default RecipeDetails;
