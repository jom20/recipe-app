import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Concatenate the desired path with the file name
      const imagePath = `/images/${file.name}`;
      setImage(imagePath);
    };

    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Send new recipe to the server
    axios
      .post('http://localhost:8800/api/recipes', { title, image, description })
      .then(response => {
        console.log('Recipe added successfully');
        setTitle('');
        setImage('');
        setDescription('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="card" style={{ backgroundColor: '#f8f0e8' }}>
        <h2 className="card-header text-center" style={{ color: '#b06c49' }}>Add Recipe</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label" style={{ color: '#b06c49' }}>
                Title
              </label>
              <input
                id="title"
                className="form-control"
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label" style={{ color: '#b06c49' }}>
                Image
              </label>
              <input
                id="image"
                className="form-control"
                type="file"
                placeholder="Image"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label" style={{ color: '#b06c49' }}>
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
                required
              ></textarea>
            </div>
            <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#b06c49', borderColor: '#b06c49' }}>
              Add Recipe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link to="/view" className="btn btn-primary" style={{ backgroundColor: '#b06c49', borderColor: '#b06c49' }}>
          View Recipes
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
