import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Recipe Management</h2>
      <div className="card fantasy-card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <Link to="/add" className="btn btn-primary btn-block fantasy-btn fantasy-btn-primary">
                Add Recipe
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/update" className="btn btn-primary btn-block fantasy-btn fantasy-btn-primary">
                Update Recipe
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/delete" className="btn btn-primary btn-block fantasy-btn fantasy-btn-primary">
                Delete Recipe
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/view" className="btn btn-primary btn-block fantasy-btn fantasy-btn-primary">
                View Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
