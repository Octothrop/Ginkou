import React, { useState } from "react";
import "./payment.css";


const PaymentPage = ({
  defaultToAccount,
  defaultFromAccount,
  defaultMode,
  defaultAmount,
}) => {
  const [toAccountId, setToAccountId] = useState(defaultToAccount || 0);
  const [fromAccountId, setFromAccountId] = useState(defaultFromAccount || 0);
  const [amount, setAmount] = useState(defaultAmount || 0);
  const [mode, setMode] = useState(defaultMode || "CASH");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user data
      const userResponse = await fetch(
        `http://localhost:7000/api/getUser/account/${fromAccountId}`
      );
      if (!userResponse.ok) {
        setError("Invalid account number");
        return;
      }
      const user = await userResponse.json();

      // Verify the password
      if (user.password !== password) {
        setError("Incorrect password");
        return;
      }

      // Make the payment request
      const paymentResponse = await fetch(
        `http://localhost:7000/api/payment.ginkou.in/pay/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromAccountId,
            toAccountId,
            amount: parseFloat(amount),
            mode,
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
      alert("Payment sucessful");
    } catch (error) {
      setError("Payment failed: " + error.message);
    }
  };

  return (
    <div className="payment-form">
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
          <label>From Account ID:</label>
          <input
            type="number"
            placeholder="XXXXXXXX001"
            value={fromAccountId}
            onChange={(e) => setFromAccountId(parseInt(e.target.value, 10))}
            disabled={!!defaultFromAccount}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            placeholder="XXXXXXXX001"
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentPage;
