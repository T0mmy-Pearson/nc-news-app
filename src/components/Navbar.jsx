import React, { useState } from "react";


export default function NavbarC() {
  const [showLinks, setShowLinks] = useState(false);

  const handleToggle = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <>
      <div className="topnav">
        <a href="/" className="active">
          <h1>NC News</h1>
        </a>
        <div className="tagline"><h3>Your one-stop shop for non-stop news</h3></div>
        <div
          id="myLinks"
          style={{ display: showLinks ? "flex" : "none" }}
        >
          <a href="/articles">Articles</a>
          <button className="closebtn"
            onClick={() => setShowLinks(false)}
          >
            &times;
          </button>
        </div>
        <a
          href="#toggle"
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </a>
      </div>
    </>
  );
}