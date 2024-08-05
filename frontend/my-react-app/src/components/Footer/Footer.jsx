import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
       <footer className="home-footer">
            <p>© 2024 IRCTC Booking. All rights reserved.</p>
            <nav>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
            </nav>
            </footer>
    </div>
  )
}

export default Footer
