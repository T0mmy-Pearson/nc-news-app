import React from 'react'

export default function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <strong>{comment.author}</strong>
      <p>{comment.body}</p>
      <small>{comment.created_at}</small>
    </div>
  )
}