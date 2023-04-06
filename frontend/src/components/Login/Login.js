import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext"

import "./Login.css";

function Login() {
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!event.target.value.trim()) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/");

      } else {
        console.error('Error during login:', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
    
      if (error.response) {
        if (error.response.status === 401) {
          setPasswordError(error.response.data.message);
        } else {
          setPasswordError(`Server error: ${error.response.status} ${error.response.statusText}`);
        }
      } else {
        setPasswordError('An error occurred during login. Please check your network connection and try again.');
      }
    }
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (!event.target.value.trim()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div>
      <Header />
      <div class="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <p>
            <label>Email</label>
          </p>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="login-error">{emailError}</p>}
          <p>
            <label>Password</label>
          </p>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="login-error">{passwordError}</p>}

          <p class="link">
            <Link to="/registration" class="reg-link">
              Not have an account yet? Click here!
            </Link>
          </p>
          <button className="login-btn">Login</button>
        </form>
      </div>
      <div class="clear"></div>
      <Footer />
    </div>
  );
}

export default Login;
