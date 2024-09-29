import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./card.css";
import Footer from "../header-footer/footer";
import UserHeader from "../header-footer/user_header";

function CardDisplay() {
  const { userId } = useParams();
  const [cards, setCards] = useState([]);
  const [avl, setAvl] = useState(false);

  useEffect(() => {
    setAvl(false);
    if (userId) {
      fetch(`http://localhost:7000/api/allCards/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCards(data);
          setAvl(true);
        })
        .catch((error) => console.error("Error fetching cards:", error));
    }
  }, [userId]);
  const handleMouseMove = (e, cardIndex) => {
    const card = document.querySelectorAll(".card")[cardIndex];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.backgroundPosition = `${x / 2}px ${y / 2}px`;
  };

  return (
    <div className="card-main">
      <UserHeader userId={userId} />
      <div className="card-container">
        {avl &&
          cards.map((card, index) => (
            <div
              className="card"
              key={card.cardId}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              <div className="bank-name">銀行</div>
              <div className="card-number">{card.cardNumber}</div>
              <div className="cardholder">
                {card.type}
                <span className="expiration">
                  Valid Thru:{" "}
                  {new Date(card.expiration).toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "2-digit",
                  })}
                </span>
                <span className="cvv">
                  CVV: {card.cvv}
                </span>
              </div>
            </div>
          ))}
          {!avl && <img class="no-data" src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?t=st=1727436545~exp=1727440145~hmac=f1c0c4f43b5109fa4b95635138c2eeb8aa9ef09f0dd36d76bc414ac1b3ce1322&w=996" />}
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default CardDisplay;
