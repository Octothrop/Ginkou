import React, { useState } from "react";
import "./card.css";

const CardPage = ({ defaultToAccount, defaultMode, defaultAmount }) => {
  const [toAccountId, setToAccountId] = useState(defaultToAccount || 0);
  const [amount, setAmount] = useState(defaultAmount || 0);
  const [mode, setMode] = useState(defaultMode || "CASH");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the payment request
      const paymentResponse = await fetch(
        `http://localhost:7000/api/payment.ginkou.in/pay-card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toAccountId,
            cardNumber,
            cvv,
            mode,
            amount: parseFloat(amount),
            remark,
          }),
        }
      );

      if (!paymentResponse.ok) {
        setError("Payment failed");
        return;
      }

      const paymentData = await paymentResponse.json();
      console.log("Payment successful:", paymentData);
      setError("");
      alert("Payment sucessfull!");
    } catch (error) {
      setError("Payment failed: " + error.message);
    }
  };

  return (
    <div className="card-payment-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>To Account ID:</label>
          <input
            type="number"
            value={toAccountId}
            onChange={(e) => setToAccountId(parseInt(e.target.value, 10))}
            disabled={!!defaultToAccount}
            required
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            disabled={!!defaultAmount}
            min={0}
            required
          />
        </div>
        <div>
          <label>Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            disabled={!!defaultMode}
            required
          >
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
            <option value="NETBANKING">NETBANKING</option>
            <option value="NEFT">NEFT</option>
          </select>
        </div>
        <div>
          <label>Remark:</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CardPage;
