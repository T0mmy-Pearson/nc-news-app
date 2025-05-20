import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default function CommentsSection({ article_id }) {
  return (
    <section className="comments-section">
      <h3>Comments</h3>
      <CommentList article_id={article_id} />
      <CommentForm article_id={article_id} />
    </section>
  )
}