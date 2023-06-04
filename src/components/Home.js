import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Recipe Management</h2>
      <div className="card food-card" style={{ background: '#FFFAF0', border: 'none' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card text-center" style={{ background: '#FDF3E7', border: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Add Recipe</h5>
                  <p className="card-text" style={{ fontFamily: 'Arial, sans-serif', color: '#777' }}>Share your delicious recipes with others.</p>
                  <Link to="/add" className="btn btn-primary btn-block food-btn" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#F5AB00', border: 'none' }}>
                    Add Recipe
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-center" style={{ background: '#FDF3E7', border: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>View Recipes</h5>
                  <p className="card-text" style={{ fontFamily: 'Arial, sans-serif', color: '#777' }}>Explore a collection of mouthwatering recipes.</p>
                  <Link to="/view" className="btn btn-primary btn-block food-btn" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#F5AB00', border: 'none' }}>
                    View Recipes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
