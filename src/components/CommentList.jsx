import React from 'react'
import CommentCard from './CommentCard'
import { useState, useEffect } from 'react'
import { fetchComments } from '../../../api'

export default function CommentList({ article_id, comments }) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
      setLoading(true)
      fetchComments(article_id)
      .then((res) => {
        setComments(res.data.comments)
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => setLoading(false))
    }, [article_id])

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map(comment => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))
      )}
    </div>
  )
}