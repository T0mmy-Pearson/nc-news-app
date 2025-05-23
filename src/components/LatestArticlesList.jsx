import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../../api"; 

const LatestArticlesList = () => {
  const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticles()
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <section className="latest-articles-list">
      <h2>Latest Articles</h2>
      <ul>
        {sortedArticles.slice(0, 5).map((article) => (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestArticlesList;
