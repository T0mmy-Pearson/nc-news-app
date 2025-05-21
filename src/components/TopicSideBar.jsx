import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

export default function TopicSideBar() {
  const [topics, setTopics] = useState([]);
  const { topic } = useParams();

  useEffect(() => {
    axios
      .get("https://nc-news-api-g9yq.onrender.com/api/topics")
      .then((res) => setTopics(res.data.topics))
      .catch(() => setTopics([]));
  }, []);

  return (
    <aside className="topic-sidebar">
      <h4>Topics</h4>
      <ListGroup>
        <ListGroup.Item
          as={Link}
          to="/articles"
          active={!topic}
          action
        >
          All
        </ListGroup.Item>
        {topics.map((t) => (
          <ListGroup.Item
            key={t.slug}
            as={Link}
            to={`/articles/topics/${t.slug}`}
            active={topic === t.slug}
            action
          >
            {t.slug.charAt(0).toUpperCase() + t.slug.slice(1)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </aside>
  );
}