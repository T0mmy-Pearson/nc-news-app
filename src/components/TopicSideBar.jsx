import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { fetchTopics } from "../../../api";

export default function TopicSideBar() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics()
      .then((res) => setTopics(res.data.topics))
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, []);

  const handleRandomTopic = () => {
    if (topics.length === 0) return;
    const randomIndex = Math.floor(Math.random() * topics.length);
    const randomTopic = topics[randomIndex];
    navigate(`/articles/topics/${randomTopic.slug}`);
  };

  return (
    <aside className="topic-sidebar" style={{ textAlign: "center" }}>
      <Button
        variant="primary"
        onClick={handleRandomTopic}
        disabled={loading || topics.length === 0}
      >
        {loading ? "Loading..." : "Go to Random Topic"}
      </Button>
    </aside>
  );
}