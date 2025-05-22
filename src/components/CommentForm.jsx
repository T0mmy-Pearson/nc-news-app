import React, { useState, useContext } from 'react'
import { UserContext } from "../contexts/UserContext";
import { postComment } from '../../../api';

export default function CommentForm({ article_id, onCommentPosted }) {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    postComment(article_id, {
      username: user.username,
      body: comment
    })
    .then(() => {
      setComment('')
      setSuccess(true)
        if (onCommentPosted) setTimeout(onCommentPosted, 300)
    })
    .catch(() => {
      setError('Failed to post comment.')
    })
    .finally(() => setSubmitting(false))
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Add your comment..."
        rows={3}
        value={comment}
        onChange={e => setComment(e.target.value)}
        disabled={submitting}
        required
      />
      <button type="submit" disabled={submitting || !comment.trim()}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
      {error && <div className="error">{error}</div>}
      {success && <h4 className="success">Comment posted!</h4>}
    </form>
  )
}