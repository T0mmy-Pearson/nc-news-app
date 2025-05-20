import React from 'react'
import CommentCard from './CommentCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CommentList({ article_id }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
      setLoading(true)
  
      axios.get(`https://nc-news-api-g9yq.onrender.com/api/articles/${article_id}/comments`)
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