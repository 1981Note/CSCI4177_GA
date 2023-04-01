import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const PWD_REGEX =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [addressError, setAddressError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(typeof dob);
    const dateNew = new Date(dob);
    console.log(typeof dateNew);

    try {
      const response = await axios.post("https://csci4177-group18.onrender.com/api/users", {
        name: name,
        email: email,
        password: password,
        phone: phoneNumber,
        birthday: dateNew,
        gender: gender,
        address: address,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response) {
        console.error(error.response.data.message);
      }
    }
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
        "Password must be at least 8 characters long. At least 1 letter, 1 special character and 1 number"
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

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);

    if (!event.target.value.trim()) {
      setPhoneNumberError("Phone Number is required");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);

    if (!event.target.value.trim()) {
      setGenderError("Gender is required");
    } else {
      setGenderError("");
    }
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);

    if (!event.target.value.trim()) {
      setDobError("Date of Birth is required");
    } else {
      setDobError("");
    }
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;

    if (!value.trim()) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
    setAddress(value);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} class="regForm">
        <section class="form-modal">
          <div>
            <h1 className="headerReg">FLYCANDA Registration</h1>
          </div>
          <div>
            <div>
              <label htmlFor="name">Name</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && <p>{confirmPasswordError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <input
              type="text"
              id="phoneNUmber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {phoneNumberError && <p> {phoneNumberError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="gender">Gender</label>
            </div>
            <select id="gender" value={gender} onChange={handleGenderChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {genderError && <p>{genderError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
            </div>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={handleDobChange}
            />
            {dobError && <p>{dobError}</p>}
          </div>

          <div>
            <div>
              <label htmlFor="address"> Address</label>
            </div>
            <input
              type="text"
              id="regFormAddress"
              value={address}
              onChange={handleAddressChange}
            />
            {addressError && <p>{addressError}</p>}
          </div>

          <button type="submit" className="reg-btn">
            Register
          </button>
        </section>
      </form>
      <div>

      <div class="clear"></div>
      <Footer />
      </div>
    </div>
  );
}

export default Registration;
