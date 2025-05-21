import React, { useContext, useState } from 'react'
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';
import dayjs from 'dayjs';

dayjs().format()

export default function CommentCard({ comment, onDelete }) {
  const { user } = useContext(UserContext);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    setDeleting(true);
    setError(null);
    axios.delete(`https://nc-news-api-g9yq.onrender.com/api/comments/${comment.comment_id}`)
      .then(() => {
        setDeleted(true);
        if (onDelete) onDelete(comment.comment_id);
      })
      .catch(() => setError("Failed to delete comment."))
      .finally(() => setDeleting(false));
  };

  if (deleted) return <div className="comment-card deleted">Comment deleted.</div>;

  return (
    <div className="comment-card">
      <strong>{comment.author}</strong>
      <p>{comment.body}</p>
      <small>{dayjs(comment.created_at).format('D MMM YYYY, HH:mm')}</small>
      {user.username === comment.author && (
        <button
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}