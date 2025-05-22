import React from 'react'

import LatestArticlesList from '../components/LatestArticlesList'
import FootballCarousel from '../components/FootballCarousel'

export default function HomePage({ articles }) {
  return (
    <>
    <section className="home-page-hero">
        <h2>Welcome to NC News</h2>
        <h3>Your one-stop shop for the latest articles.</h3>
        <h3>Explore our curated range of topics and stay updated with the current events.</h3>
    </section>
    <FootballCarousel articles={articles} />
    <LatestArticlesList articles={articles} />
    </>
  )
}
