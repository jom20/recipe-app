import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleImageChange = event => {
    setImage(event.target.value);
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
      <div className="card">
        <h2 className="card-header text-center">Add Recipe</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
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
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                id="image"
                className="form-control"
                type="file"
                placeholder="Image"
                value={image}
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
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
            <button className="btn btn-primary" type="submit">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
