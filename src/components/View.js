import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const View = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5f5f5', padding: '20px', margin: '10px' }}>
      <h1 className="mb-4 text-center" style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>Recipes</h1>
      <div className="row">
        {recipes.length === 0 ? (
          <div>Loading recipes...</div>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-6 col-lg-4">
              <div className="card mb-3" style={{ backgroundColor: '#FFF', color: '#333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{recipe.title}</h5>
                  <p className="card-text" style={{ fontSize: '16px', marginBottom: '20px', minHeight: '80px' }}>{recipe.description}</p>
                  <div className="btn-group">
                    <button className="btn btn-danger" onClick={() => handleDelete(recipe.id)} style={{ margin: '10px', fontFamily: 'Arial, sans-serif' }}>
                      Delete
                    </button>
                    <button className="btn btn-primary" style={{ margin: '10px', fontFamily: 'Arial, sans-serif' }}>
                      <Link
                        to={`/update/${recipe.id}`}
                        style={{ color: '#FFF', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}
                      >
                        Update
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mb-4 text-center">
        <button className="btn btn-primary" style={{ backgroundColor: '#333', margin: '10px', fontFamily: 'Arial, sans-serif' }}>
          <Link to="/add" style={{ color: '#FFF', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
            Add Recipe
          </Link>
        </button>
        <button className="btn btn-primary" style={{ backgroundColor: '#333', fontFamily: 'Arial, sans-serif' }}>
          <Link to="/home" style={{ color: '#FFF', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
            Go Back
          </Link>
        </button>
      </div>
    </div>
  );
};

export default View;
