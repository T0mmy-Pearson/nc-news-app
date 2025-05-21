import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack'
import dayjs from 'dayjs';

dayjs().format()


export default function ArticleCard({ article_id, image, title, author, posted, votes, commentsNum}) {

  return (
    
  <Card bg="light" className="article-card">
      <Card.Body>
        <h2>{title}</h2>
        <h4 className="mb-2 text-muted">
          <span>by {author}</span>
        </h4>
        <Link to={`/articles/${article_id}`} className="article-card-link">
        <Card.Img variant="top" src={image} alt="article image" as={Image} fluid />
        </Link>
        <Card.Text>
          <small className="text-muted">{dayjs(posted).format('D MMM YYYY')}</small>
        </Card.Text>
        <Stack direction="horizontal" gap={3}>
          <span>
            <i className="fa-solid fa-hand-point-up"></i> {votes}
          </span>
          <span>
            <i className="fa-solid fa-comment"></i> {commentsNum}
          </span>
        </Stack>
      </Card.Body>
    </Card>

  )
}
