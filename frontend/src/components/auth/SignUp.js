import React, { useState } from "react";
import Coffeeimage from "../../images/Coffeeimage.png";
import { signup } from "../../service/userAPI.js";
import "../../signup.css";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");  // State for error messages
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "farmer",  // Set default role to "farmer"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSignUp(e) {
    e.preventDefault();
    setIsLoading(true);  // Start loading
    setError("");  // Clear any previous errors

    try {
      const user = await signup(formData);    
      if (!user) {
        throw new Error("Invalid response: User data missing");
      }
    
          if (user?.role === "farmer") navigate("/farmer");
          else if (user?.role === "researcher") navigate("/researcher");
          // else if (user?.role === "admin") navigate("/admin");

    } catch (e) {
      setError("Error signing up. Please try again.");  // Set error message
      console.log(e);
    } finally {
      setIsLoading(false);  // Stop loading
    }
  }

  return (
    <div className="LoginStyle">
      <img src={Coffeeimage} alt="coffee-image" />

      <form onSubmit={handleSignUp}>
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

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="role-dropdown"
        >
          <option value="farmer">Farmer</option>
          <option value="researcher">Researcher</option>
        </select>

        <button type="submit" disabled={isLoading}> {/* Disable button if loading */}
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {error && <div className="error-message">{error}</div>} {/* Display error message */}

        <div className="flexer">
          <p>Already have an account?</p>
          <Link to="/LoginWithRedirect">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
