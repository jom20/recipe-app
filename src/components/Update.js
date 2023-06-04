import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const recipeId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/recipes/${recipeId}`);
        setRecipe(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/api/recipes/${recipeId}`, recipe);
      navigate("/view");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="container" style={{ margin: '10px'}}>
      <div className="card p-4" style={{ backgroundColor: "#e3f2fd", maxWidth: "500px", margin: "0 auto" }}>
        <h1 className="text-center mb-4" style={{ color: "#1565c0" }}>Update Recipe</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            style={{ backgroundColor: "#FFFFFF", borderRadius: "5px", padding: "10px", margin: "10px" }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            style={{ backgroundColor: "#FFFFFF", borderRadius: "5px", padding: "10px", margin: "10px" }}
          />
        </div>
        <div className="form-group">
          <textarea
            rows={4}
            className="form-control"
            placeholder="Description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            style={{ backgroundColor: "#FFFFFF", borderRadius: "5px", padding: "10px", margin: "10px" }}
          ></textarea>
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" style={{ backgroundColor: "#336699", margin: '5px' }} onClick={handleClick}>
            Update
          </button>
          {error && <p className="text-danger">Something went wrong!</p>}
          <Link className="btn btn-primary" style={{ backgroundColor: "#336699", margin: '5px' }} to="/view">
            See all recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
