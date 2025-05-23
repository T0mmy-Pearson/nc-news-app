import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack'
import dayjs from 'dayjs';

dayjs().format()

export default function ArticleCardExplore({ article_id, image, title, author, posted, votes, commentsNum}) {

  return (
     <Card bg="light" className="article-card-explore">
      <div className="image-overlay-container">
        <Link to={`/articles/${article_id}`} className="article-card-link">
          <Card.Img variant="top" src={image} alt="article image" as={Image} fluid />
          <div className="overlay-content">
            <h2>{title}</h2>
            <h4 className="mb-2 text-muted">by {author}</h4>
          </div>
        </Link>
      </div>
    </Card>
  )
}