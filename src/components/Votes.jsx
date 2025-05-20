import React, { useState } from "react";
import axios from "axios";

export default function Votes({ article_id, initialVotes }) {
  const [userVote, setUserVote] = useState(0);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (inc) => {
    let newVote;
    if (userVote === inc) {
      newVote = 0;
    } else {
      newVote = inc;
    }

    const voteChange = newVote - userVote;
    setUserVote(newVote);
    setVoteError(null);

    axios
      .patch(
        `https://nc-news-api-g9yq.onrender.com/api/articles/${article_id}`,
        { inc_votes: voteChange }
      )
      .catch(() => {
        setUserVote(userVote);
        setVoteError("Failed to update vote. Please try again.");
      });
  };

  return (
    <div className="votes-container">
      <button
        onClick={() => handleVote(1)}
        aria-label="Upvote"
        style={{
          color: userVote === 1 ? "#ffffff" : "inherit",
          fontWeight: userVote === 1 ? "bold" : "normal",
        }}
      >
        <i className="fa-regular fa-hand-point-up"></i>
      </button>
      <span>{initialVotes + userVote}</span>
      {voteError && <div className="error">{voteError}</div>}
    </div>
  );
}
