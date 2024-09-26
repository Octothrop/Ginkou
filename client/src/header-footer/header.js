import React, { useState } from "react";
import "./header.css";
import { Link, useNavigate  } from "react-router-dom";

export default function Header() {
  return (
    <div className="main">
      <div className="main-container">
        <h2>銀行</h2>
        <div className="links">
          | <Link className="link" to="/"> Home </Link> |
          <Link className="link" to="/"> Explore </Link> |
          <Link className="link" to="/login"> Login/Register </Link>
        </div>
      </div>
      <marquee className="marquee-block">
        {" "}
        ನಿಮ್ಮ ಖಾತೆಯ ಬ್ಯಾಲೆನ್ಸ್ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ, ಎಲ್ಲೆಲ್ಲಿ ನೋಡಿ! 24/7 ನಾವು ನಿಮ್ಮ
        ನೆರವಿಗೆ ಇರುತ್ತೇವೆ! ಇಂದು ನಮ್ಮ ಡಿಜಿಟಲ್ ಬ್ಯಾಂಕಿಂಗ್ ಕ್ರಾಂತಿಯಲ್ಲಿ ಸೇರಿ!{" "}
      </marquee>
    </div>
  );
}
