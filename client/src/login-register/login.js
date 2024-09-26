import { useState, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header-footer/header";

export default function LoginComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:7000/api/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
        }),
      });

      if (!response.ok) {
        console.log(response.json());
        throw new Error("Invalid user credentials");
      }

      const data = await response.json();
      console.log("Success:", data);

      const isUser = await data.Role;
      setSuccess(true);
      navigate(`/${data.userId}/${isUser}`);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <form className="login-form" onSubmit={loginUser}>
          <span>銀行</span>
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            id="firstName"
            className="login-input"
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
            className="login-input"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength="12"
            minLength="3"
            required
          />
          <br />
          {error && (
            <p
              className="error-message"
              style={{ color: "red", textAlign: "center" }}
            >
              Password / username is incorrect
            </p>
          )}
          {success && <p className="success-message">Logged In</p>}
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Loading" : "Login"}
          </button>
          <p className="go-to-register">
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </form>
        <img
          src="https://img.freepik.com/free-vector/data-protection-with-biometric-identification-fingerprint-security-system-smartphone-secure-authentication-transactions-flat-woman-scans-her-face-access-data-id-scanning-technology_88138-658.jpg?t=st=1726335439~exp=1726339039~hmac=5ada4074763140572f5a83808a8c8479705dbb42e253572c9f31bfd164594db8&w=1060"
          alt="login-with-ginkou"
        ></img>
      </div>
    </>
  );
}
