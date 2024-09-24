import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./card.css";

function CardDisplay() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:7000/api/allCards/${id}`)
        .then((response) => response.json())
        .then((data) => setCards(data))
        .catch((error) => console.error("Error fetching cards:", error));
    }
  }, [id]);
  const handleMouseMove = (e, cardIndex) => {
    const card = document.querySelectorAll(".card")[cardIndex];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.backgroundPosition = `${x / 2}px ${
      y / 2
    }px`;
  };

  return (
    <div className="card-container">
      {cards.map((card, index) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardDisplay;
