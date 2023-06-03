import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import CommentForm from './components/CommentForm';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import './style.css';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import Update from './components/Update';
import Delete from './components/Delete';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/admin">Admin</a>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/update" element={<Update />} />
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/comment/:id" element={<CommentForm />} />
          <Route path="/admin" element={<LoginForm />} />
          <Route path="/add" element={<AdminPanel />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
