import React, { useState } from 'react'
import axios from 'axios'

export default function CommentForm({ article_id }) {
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    axios.post(`https://nc-news-api-g9yq.onrender.com/api/articles/${article_id}/comments`, {
      username: "tickle122",
      body: comment
    })
    .then(() => {
      setComment('')
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
    </form>
  )
}