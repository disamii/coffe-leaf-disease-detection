import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Coffeeimage from "../../images/Coffeeimage.png";
import { useDispatch } from "react-redux";
import {login} from "../../service/userAPI"
import { login as userlogin  } from '../../redux/userSlice';
function LoginWithRedirect() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const user=await login(formData)
      if (user)
        dispatch(userlogin(user))
      if (user?.role === "farmer") navigate("/farmer");
      // else if (user?.role === "admin") navigate("/admin");
      else if (user?.role === "researcher") navigate("/researcher");
    } catch (err) {
      setError("Email is already in use, please login instead!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="LoginStyle">
      <img src={Coffeeimage} alt="coffee-image" />

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        <p>Don't have an account? </p>
        <p>
          <Link to="/SignUp">SignUp</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginWithRedirect;
