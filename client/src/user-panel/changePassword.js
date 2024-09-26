import React, { useState } from "react";
import "./changePassword.css";
import Footer from "../header-footer/footer";
import Header from "../header-footer/header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/api/forgotPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });
      if (response.ok) {
        setMessage("Password updated");
        setError(false);
      } else {
        setError(true);
        setMessage("Failed to update");
      }
    } catch (error) {
      setMessage("Error updating password");
      setError(true);
      console.error(error);
    }
  };

  return (
    <div class="pass-main">
      <Header />
      <div className="forgot-password-container">
        <div className="image-container">
          <img
            src="https://www.hhaexchange.com/wp-content/uploads/2023/03/mco-1.svg"
            alt="Forgot Password"
          />
        </div>
        <form className="form-container" onSubmit={handleChangePassword}>
          <h1>Forgot Password?</h1>
          <p>Enter your email and new password to reset it.</p>
          <input
            type="text"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            maxLength="12"
            minLength="8"
            required
          />
          <button type="submit">Change Password</button>
          {message && (
            <p
              className="message"
              style={{
                color: error ? "red" : "blue",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
