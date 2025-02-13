
import React, { useState } from 'react';
import Coffeeimage from '../../images/Coffeeimage.png';
import { Link } from 'react-router-dom';
import "../../styling/header.css"
export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  
    return (
      <div className="nav-links">
        <img src={Coffeeimage} alt="Coffee Logo" />
        <Link className="nav-link" to="/">Home</Link>
        {/* Categories Dropdown */}
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            Categories
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/unsigned_farmer" className="dropdown-item">
                For Farmers
              </Link>
              <Link to="/unsigned_researcher" className="dropdown-item">
                For Researchers
              </Link>
            </div>
          )}
        </div>
  
        <Link className="nav-link" to="/AboutUs">About Us</Link>
        {/* <Link className="nav-link" to="/ContactUs">Contact Us</Link> */}
        <div className="nav-link">
          <Link className="nav-link" to="/SignUp">SignUp</Link>
          <Link className="nav-link" to="/login">Login</Link>
        </div>
      </div>
    );
  }
  