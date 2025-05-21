import { Routes, Route } from "react-router-dom";
import './index.css'
import ArticleList from './components/ArticleList';
import ArticlePage from './Pages/ArticlePage';
import HomePage from './Pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/articles" element={<ArticleList/>} />
      <Route path="/articles/topics/:topic" element={<ArticleList/>} />
      <Route path="/articles/:article_id" element={<ArticlePage />}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
