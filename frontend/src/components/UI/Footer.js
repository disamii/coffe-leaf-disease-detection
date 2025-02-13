import React from 'react';
import Coffeeimage from '../../images/Coffeeimage.png';
import { Link } from 'react-router-dom';
import "../../styling/footer.css";

export default function Footer() {
  return (
    <div className="Footer">
    <div className="footer-header-sub">
      <img src={Coffeeimage} alt="Coffee Logo"/>
      <h1>CoffeeGuard.com</h1>
    </div>
    <div className="footer-sub">
      <div className="footer-links">
        <h3>Explore</h3>
        <Link className="nav-link" to="/AboutUs">About Us</Link>
        <Link className="nav-link" to="/ContactUs">Contact Us</Link>
      </div>
      <div className="footer-links">
        <h3>Services</h3>
        <Link className="nav-link" to="/Farmer">Farmer</Link>
        <Link className="nav-link" to="/Researcher">Researcher</Link>
      </div>
    </div>
  </div>
  )
}
