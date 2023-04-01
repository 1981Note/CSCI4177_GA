import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, { useState } from "react";
import "./Registration.css";

function Registration () {
  const PWD_REGEX =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleNameChange = (event) => {
    setName(event.target.value);

    if (!event.target.value.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!event.target.value.trim()) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(event.target.value)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (!event.target.value.trim()) {
      setPasswordError("Password is required");
    } else if (!PWD_REGEX.test(event.target.value)) {
      setPasswordError(
        "Password must be atleast 8 chracters long. Atleas 1 letter, 1 special character and 1 number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (!event.target.value.trim()) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (event.target.value.trim() !== password) {
      setConfirmPasswordError("Confirm Password does not match Password");
    } else {
      setConfirmPasswordError("");
    }
  };
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} class="regForm">
        <section class="form-modal">
          <h1>FLYCANADA Registration</h1>
          <div>
            <div>
              <label htmlFor="name">Name:</label>
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p>{nameError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="email">Email:</label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p>{emailError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p>{passwordError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
            </div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && <p>{confirmPasswordError}</p>}
          </div>

          <button type="submit" className="reg-btn">
            Register
          </button>
        </section>
      </form>
      <Footer />
    </div>
  );
};

export default Registration;
