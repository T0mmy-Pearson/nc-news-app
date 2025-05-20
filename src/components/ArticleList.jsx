import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articlesToRead, setArticlesToRead] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://nc-news-api-g9yq.onrender.com/api/articles")
      .then((res) => {
        setArticlesToRead(res.data.articles);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <section className="article-list">
      <h1>Articles</h1>
      <div className="article-list-container">
        {articlesToRead.map((article) => (
          <ArticleCard
            key={article.article_id}
            article_id={article.article_id}
            title={article.title}
            topic={article.topic}
            author={article.author}
            posted={article.created_at}
            votes={article.votes}
            commentsNum={article.comment_count}
            image={article.article_img_url}
          />
        ))}
      </div>
    </section>
  );
}