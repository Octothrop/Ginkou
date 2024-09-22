import "./register.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header-footer/header";

export default function RegisterComponent() {
  //setting variables using useState
  // useState[var, func to update var ] = useState(initialValue)
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(null);

  // handeling user registration
  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSucess(null);

    try {
      if (password !== confirmPassword) {
        setError("Passwords donot match!");
        setLoading(false);
      } else {
        const response = await fetch("http://localhost:7000/api/newUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            DOB: dob,
            address,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = response.json();
        console.log("Sucess : ", data);
        setSucess("Registration Sucessfull!!");
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="register-main">
      <img src="https://img.freepik.com/free-vector/hand-holding-phone-with-digital-wallet-service-sending-money-payment-transaction-transfer-through-mobile-app-flat-illustration_74855-20589.jpg?t=st=1726323866~exp=1726327466~hmac=b644071f0b54aabbae8b951747dc8ce0b02aae94d01391b7f53ec83818bd71f1&w=900"></img>
      <form className="register-container" onSubmit={registerUser}>
        <span>銀行</span>
        <label htmlFor="firstName">First Name </label>
        <input
          type="text"
          id="firstName"
          className="register-input"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="lastName">Last Name </label>
        <input
          type="text"
          id="lastName"
          className="register-input"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="dob">Date of Birth </label>
        <input
          type="date"
          id="dob"
          className="register-input"
          placeholder="1990-08-30"
          onChange={(e) => setDob(new Date(e.target.value))}
          required
        />
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="text"
          id="email"
          className="register-input"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="address">Address </label>
        <input
          type="text"
          id="address"
          className="register-input"
          placeholder="789 Birch S"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          className="register-input"
          placeholder="****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength="12"
          minLength="8"
          required
        />
        <br />
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input
          type="password"
          id="confirmPassword"
          className="register-input"
          placeholder="****"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength="12"
          minLength="8"
          required
        />
        <br />
        {error && <p className="error-message">Error: {error}</p>}
        {sucess && <p className="success-message">{sucess}</p>}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Loading" : "Register"}
        </button>
        <p class="go-to-login">
          Have an account?{" "}
          <Link class="link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}
