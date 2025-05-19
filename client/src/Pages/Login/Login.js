import React, { useState } from "react";
import twitterimg from "../../image/twitter.jpeg";
import GoogleButton from "react-google-button";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { useUserAuth } from "../../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={twitterimg} className="image" alt="x-logo" />
      </div>

      <div className="form-container">
        <div className="form-box">
          <h1 className="heading">Happening Now</h1>
          <h3 className="heading1">Join X today</h3>

          {error && <p className="errorMessage">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              Log In
            </button>
          </form>

          <hr className="divider" />
          <center>
          <GoogleButton className="g-btn" onClick={handleGoogleSignIn} />
          <br/>
          <h3>OR</h3>
          </center>
          <div className="signup-section">
            <Link to="/signup" className="signup-link">
              Create Account
            </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
