import React from "react";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";

export default function ArticleList({ articles, setArticles }) {
    
  return (
    <section className="article-list">
      <h1>Articles</h1>
      <div className="article-list-container">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              title={article.title}
              topic={article.topic}
              author={article.author}
              posted={article.created_at}
              votes={article.votes}
              commentsNum={article.comment_count}
              image={article.article_img_url}
            />
          );
        })}
      </div>
    </section>
  );
}
