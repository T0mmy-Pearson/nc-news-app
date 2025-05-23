import React from "react";
import { fetchArticleById } from "../../api";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import CommentsSection from "../components/CommentsSection";
import Votes from "../components/Votes";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchArticleById(article_id)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [article_id]);

  if (loading) return <Spinner animation="border" />;

  if (!article) return <div>Article not found!</div>;

  return (
    <>
      <Card className="m-4">
        <h2>{article.title}</h2>
        <Card.Img variant="top" src={article.article_img_url} alt="article" />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            by {article.author} | {dayjs(article.created_at).format('D MMM YYYY')}
          </Card.Subtitle>
          <Card.Text>{article.body}</Card.Text>
          <Votes article_id={article.article_id} initialVotes={article.votes} />
          <span>
            <i className="fa-solid fa-comment"></i> {article.comment_count}
          </span>
        </Card.Body>
      </Card>
      <CommentsSection article_id={article_id} />
    </>
  );
}
