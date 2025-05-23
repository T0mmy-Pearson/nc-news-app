import React from 'react'

import LatestArticlesList from '../components/LatestArticlesList'
import FootballCarousel from '../components/FootballCarousel'
import TopicSideBar from '../components/TopicsideBar'

export default function HomePage({ articles }) {
  return (
    <>
    <FootballCarousel articles={articles} />
    <div className="home-page-second">
    <LatestArticlesList articles={articles} />
    <TopicSideBar />
    </div>
    </>
  )
}
