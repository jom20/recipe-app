import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentForm = ({ recipeId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the recipe from the server
    axios.get(`http://localhost:8800/api/recipes/${recipeId}/comments`)
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
    axios.post(`http://localhost:8800/api/recipes/${recipeId}/comments`, { comment })
      .then(response => {
        console.log('Comment added successfully');
        setComment('');
        // Fetch updated comments after submitting
        axios.get(`http://localhost:8800/api/recipes/${recipeId}/comments`)
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
    <div className="container">
      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <p key={comment.id}>
          <strong>Person {index + 1}:</strong> {comment.comment}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea className="form-control" placeholder="Add a comment" value={comment} onChange={handleCommentChange} required></textarea>
        </div>
        <button className="btn btn-primary" type="submit" style = {{ backgroundColor: 'pink', margin: 10 }}>Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
