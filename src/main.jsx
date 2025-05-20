import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from './contexts/UserContext'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContext.Provider value={{ user: { username: "tickle122", name: "Tom Tickle" } }}>
      <App />
    </UserContext.Provider>
  </BrowserRouter>
);
