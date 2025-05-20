import React from 'react'
import NavbarC from './Navbar'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <header className="header">
      <h1><NavLink to="/">NC News</NavLink></h1>
      <NavbarC/>
    </header>
    </>
  )
}
