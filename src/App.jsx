import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import axios from 'axios'
import './index.css'
import ArticleList from './components/ArticleList';

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([]);

  useEffect(() => {
      setLoading(true)
  
      axios.get("https://nc-news-api-g9yq.onrender.com/api/articles")
      .then((res) => {
        setArticles(res.data.articles)
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => setLoading(false))
    }, [])

  return (
    <>
    <Routes>

      <Route path="/articles" element={<ArticleList articles={articles}/>} />

    </Routes>
    </>
  )
}

export default App
