import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)   

  console.log(article_id);
  
  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://nc-news-api-g9yq.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        console.log(res.data);
        setArticle(res.data);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [article_id]);

  if (loading) return <Spinner animation="border" />;

  if (!article) return <div>Article not found!</div>;

  return (
    <Card className="m-4">
        <h2>{article.title}</h2>
      <Card.Img variant="top" src={article.article_img_url} alt="article" />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          by {article.author} | {article.created_at}
        </Card.Subtitle>
        <Card.Text>{article.body}</Card.Text>
        <span>
            <i className="fa-solid fa-hand-point-up"></i> {article.votes}
          </span>
          <span>
            <i className="fa-solid fa-comment"></i> {article.commentsNum}
          </span>
      </Card.Body>
    </Card>
  );
}
