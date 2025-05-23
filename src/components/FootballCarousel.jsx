import React, { useEffect, useState } from "react";
import ArticleCardExplore from "./ArticleCardExplore";
import { fetchArticles } from "../../../api";

const FootballCarousel = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [numVisible, setNumVisible] = useState(
    window.innerWidth <= 600 ? 1 : 3
  );

  useEffect(() => {
    const handleResize = () => {
      setNumVisible(window.innerWidth <= 600 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    setLoading(true);
    fetchArticles()
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const footballArticles = articles.filter(
    (article) => article.topic && article.topic.toLowerCase() === "football"
  );

  const visibleArticles = footballArticles.slice(startIdx, startIdx + numVisible);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      prev + 1 < footballArticles.length ? prev + 1 : prev
    );
  };

  if (footballArticles.length === 0) {
    return (
      <section className="home-page-hero">
        <h2>Football Articles</h2>
        <p>No football articles available.</p>
      </section>
    );
  }

  return (
    <section className="home-page-explore">
      <h2>Explore Our Football Articles</h2>
      <div
        className="carousel-overlay-container"
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className="carousel-btn prev-btn"
          onClick={handlePrev}
          disabled={startIdx === 0}
          aria-label="Previous"
        >
          &#8592;
        </button>
        <div className="article-list-explore" style={{ width: "100%" }}>
          {visibleArticles.map((article) => (
            <ArticleCardExplore
              key={article.article_id}
              article_id={article.article_id}
              image={article.article_img_url}
              title={article.title}
              author={article.author}
              posted={article.created_at}
              votes={article.votes}
              commentsNum={article.comment_count}
            />
          ))}
        </div>
        <button
          className="carousel-btn next-btn"
          onClick={handleNext}
          disabled={startIdx + 2 >= footballArticles.length}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default FootballCarousel;
