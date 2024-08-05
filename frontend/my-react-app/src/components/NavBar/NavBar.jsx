import React from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <header className="home-header">
                <h1>IRCTC Booking</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </header>
        </div>
    )
}

export default NavBar
