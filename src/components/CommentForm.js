import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentForm = ({ recipeId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the recipe from the server
    axios
      .get(`http://localhost:8800/api/recipes/${recipeId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [recipeId]);

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Send new comment to the server
    axios
      .post(`http://localhost:8800/api/recipes/${recipeId}/comments`, { comment })
      .then(response => {
        console.log('Comment added successfully');
        setComment('');
        // Fetch updated comments after submitting
        axios
          .get(`http://localhost:8800/api/recipes/${recipeId}/comments`)
          .then(response => {
            setComments(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5f5f5', padding: '20px', margin: '10px' }}>
      <h3 style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>Comments</h3>
      {comments.map((comment, index) => (
        <p key={comment.id} style={{ color: '#333', marginBottom: '10px' }}>
          <strong style={{ fontFamily: 'Arial, sans-serif' }}>Person {index + 1}:</strong> {comment.comment}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
            required
            style={{ fontFamily: 'Arial, sans-serif', marginBottom: '10px' }}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#333', fontFamily: 'Arial, sans-serif' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
