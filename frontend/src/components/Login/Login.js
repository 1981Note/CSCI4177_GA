import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
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
        <form>
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

          <Link to="/registration" class="reg-link">
            Already have an account.Click here!
          </Link>
          <button className="login-btn">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
