import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentsSection({ article_id }) {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    axios
      .get(
        `https://nc-news-api-g9yq.onrender.com/api/articles/${article_id}/comments`
      )
      .then((res) => setComments(res.data.comments));
  };

  useEffect(() => {
    fetchComments();
  }, [article_id]);

  return (
    <section className="comments-section">
      <h3>Comments</h3>
      <CommentList article_id={article_id} comments={comments} />
      <CommentForm article_id={article_id} onCommentPosted={fetchComments} />
    </section>
  );
}
