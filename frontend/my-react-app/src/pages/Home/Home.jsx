import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="home-container">
          <section className="home-hero">
            <h2>Welcome to IRCTC</h2>
            <p>Book Your Train Tickets Easily!</p>
            <Link to="/create" className="cta-button">Book Tickets Now</Link>
          </section>
    
          <section className="home-features">
            <div className="feature">
              <h3>Book Train Tickets</h3>
              <p>Find and book train tickets in just a few clicks.</p>
              <Link to="/book-seats" className="feature-link">Start Booking</Link>
            </div>
            <div className="feature">
              <h3>View Your Bookings</h3>
              <p>Check your booked tickets and travel plans.</p>
              <Link to="/view-bookings" className="feature-link">View Bookings</Link>
            </div>
            <div className="feature">
              <h3>Login or Register</h3>
              <p>Access your account to manage your bookings.</p>
              <Link to="/login" className="feature-link">Login</Link>
              <Link to="/register" className="feature-link">Register</Link>
            </div>
          </section>
        </div>
      );
}

export default Home
