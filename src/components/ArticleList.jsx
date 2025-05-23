import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articlesToRead, setArticlesToRead] = useState([]);
  const { topic } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchArticles(topic, sort_by, order)
      .then((res) => {        
         if (res.data.articles.length === 0) {
          setError("No articles found for this topic.");
        } else {
          setArticlesToRead(res.data.articles);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("Topic not found!");
        } else {
          setError("Something went wrong!");
        }
      })
        .finally(() => setLoading(false));
  }, [topic, sort_by, order]);

  function handleSortChange(e) {
    setSearchParams({
      sort_by: e.target.form.sort_by.value,
      order: e.target.form.order.value,
    });
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <section className="article-list">
      <h2>Articles</h2>
      <form className="sort-form" onChange={handleSortChange}>
        <label>
          Sort by:{" "}
          <select name="sort_by" defaultValue={sort_by}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:{" "}
          <select name="order" defaultValue={order}>
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </label>
      </form>
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