import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="mainr">
      <div class="main-container">
        <h2>銀行</h2>
        <div class="links">| 
          <Link class="link" to="/"> Home </Link>|
          <Link class="link" to="/"> Explore </Link>|
          <Link class="link" to="/"> Accounts </Link>|
          <Link class="link" to="/login"> Login/Register</Link>|
        </div>
      </div>
      <marquee class="marquee-block">
        {" "}
        ನಿಮ್ಮ ಖಾತೆಯ ಬ್ಯಾಲೆನ್ಸ್ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ, ಎಲ್ಲೆಲ್ಲಿ ನೋಡಿ! 24/7 ನಾವು ನಿಮ್ಮ
        ನೆರವಿಗೆ ಇರುತ್ತೇವೆ! ಇಂದು ನಮ್ಮ ಡಿಜಿಟಲ್ ಬ್ಯಾಂಕಿಂಗ್ ಕ್ರಾಂತಿಯಲ್ಲಿ ಸೇರಿ!{" "}
      </marquee>
    </div>
  );
}
