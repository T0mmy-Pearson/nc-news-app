import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Votes({ article_id, initialVotes }) {
  const [userVote, setUserVote] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem(`vote_${article_id}`);
    if (savedVote) {
      setUserVote(Number(savedVote));
    }
  }, [article_id]);

  const handleVote = (inc) => {

    if (userVote === 1) return;
    let newVote = inc;
    const voteChange = newVote - userVote;
    setUserVote(newVote);
    setVoteError(null);
    localStorage.setItem(`vote_${article_id}`, newVote);

patchArticleVotes(article_id, voteChange)
      .catch(() => {
        setUserVote(userVote);
        setVoteError("Failed to update vote. Please try again.");
        localStorage.setItem(`vote_${article_id}`, userVote);
      });
  };

  const handleMouseEnter = () => {
    if (userVote === 1) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleRemoveVote = (e) => {
    e.stopPropagation();
    // Remove vote
    const newVote = 0;
    const voteChange = newVote - userVote;
    setUserVote(newVote);
    setVoteError(null);
    localStorage.setItem(`vote_${article_id}`, newVote);

    axios
      .patch(
        `https://nc-news-api-g9yq.onrender.com/api/articles/${article_id}`,
        { inc_votes: voteChange }
      )
      .catch(() => {
        setUserVote(userVote);
        setVoteError("Failed to update vote. Please try again.");
        localStorage.setItem(`vote_${article_id}`, userVote);
      });
    setShowTooltip(false);
  };

  return (
    <div
      className="votes-container"
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => handleVote(1)}
        aria-label="Upvote"
        style={{
          color: userVote === 1 ? "#ffffff" : "inherit",
          fontWeight: userVote === 1 ? "bold" : "normal",
          cursor: userVote === 1 ? "not-allowed" : "pointer",
        }}

      >
        <i className="fa-regular fa-hand-point-up"></i>
      </button>
      <span>{initialVotes + userVote}</span>
      {voteError && <div className="error">{voteError}</div>}
      {showTooltip && (
        <div
          className="tooltip"
          onClick={handleRemoveVote}
        >
          Click here to remove your vote
        </div>
      )}
    </div>
  );
}