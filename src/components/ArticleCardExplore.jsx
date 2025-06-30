import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import dayjs from 'dayjs'

export default function ArticleCardExplore({ 
  article_id, 
  image, 
  title, 
  author, 
  posted, 
  votes, 
  commentsNum 
}) {
  const formattedDate = dayjs(posted).format('MMM DD, YYYY')

  return (
    <Card className="article-card-explore h-100">
      <div className="image-overlay-container">
        <Link to={`/articles/${article_id}`} className="article-card-link">
          <Card.Img 
            variant="top" 
            src={image} 
            alt={`Article: ${title}`} 
            className="explore-card-image"
          />
          
          {/* Main overlay content */}
          <div className="overlay-content">
            <div className="overlay-text">
              <Card.Title as="h3" className="overlay-title-text">
                {title}
              </Card.Title>
              <Card.Subtitle className="overlay-author">
                by {author}
              </Card.Subtitle>
            </div>
          </div>
        
        </Link>
      </div>
    </Card>
  )
}