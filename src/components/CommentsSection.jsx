import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { fetchComments } from "../../api";

export default function CommentsSection({ article_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(article_id)
    .then((res) => setComments(res.data.comments));  
  }, [article_id]);

  return (
    <section className="comments-section">
      <h3>Comments</h3>
      <CommentList article_id={article_id} comments={comments} />
      <CommentForm article_id={article_id} onCommentPosted={fetchComments} />
    </section>
  );
}
