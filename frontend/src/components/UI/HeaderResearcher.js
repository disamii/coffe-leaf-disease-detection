import React from 'react';
import Coffeeimage from '../../images/Coffeeimage.png';
import { Link } from 'react-router-dom';
import "../../styling/header.css"
import { logout } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function HeaderResearcher() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout()); 
      };
    return (
      <div className="nav-links">
        <img src={Coffeeimage} alt="Coffee Logo" />
        <Link className="nav-link" to="/researcher">Home</Link>
        <Link className="nav-link" to="/researcher/train-model">Train</Link>
        <Link className="nav-link" to="/researcher/test-model">Test</Link>
        <Link className="nav-link" to="/researcher/predict_coffe_leaf">Predict</Link>
        <p className="nav-link" >{user&&user.email}</p>
        <Link className="nav-link" to="/AboutUs">About Us</Link> 
        <button className="nav-link" onClick={handleLogout} >logout</button>
      </div>
    );
  }