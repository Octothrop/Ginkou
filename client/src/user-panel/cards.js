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

  return (
    <div className="card-container">
      {cards.map((card) => (
        <div className="card" key={card.cardId}>
          <div className="bank-name">銀行</div>
          <div className="card-number">{card.cardNumber}</div>
          <div className="expiration">
            Valid Thru:{" "}
            {new Date(card.expiration).toLocaleDateString("en-GB", {
              year: "2-digit",
              month: "2-digit",
            })}
          </div>
          <div className="cardholder">{card.type}</div>
        </div>
      ))}
    </div>
  );
}

export default CardDisplay;
