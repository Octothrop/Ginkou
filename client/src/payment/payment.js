import React, { useState, useEffect } from "react";
import "./payment.css";

const PaymentPage = ({
  defaultToAccount,
  defaultFromAccount,
  defaultMode,
  defaultAmount,
  UrlUserId,
  url
}) => {
  const [toAccountId, setToAccountId] = useState(defaultToAccount || 0);
  const [fromAccountId, setFromAccountId] = useState(defaultFromAccount || 0);
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState(defaultAmount || 0);
  const [mode, setMode] = useState(defaultMode || "CASH");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let payState = false;
  const userId = UrlUserId;

  useEffect(() => {
    if (!defaultFromAccount) {
      const fetchAccounts = async () => {
        try {
          const response = await fetch(
            `http://localhost:7000/api/getAllAccId/${userId}`
          );
          if (response.ok) {
            const accountsData = await response.json();
            setAccounts(accountsData);
          } else {
            setError("Failed to load accounts");
          }
        } catch (error) {
          setError("Error fetching accounts: " + error.message);
        }
      };
      fetchAccounts();
    }
  }, [userId, defaultFromAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user;
      if (defaultFromAccount) {
        user = { userId: defaultFromAccount };
      } else {
        const userResponse = await fetch(
          `http://localhost:7000/api/getUser/account/${fromAccountId}`
        );
        if (!userResponse.ok) {
          setError("Invalid account number");
          setLoading(false);
          return;
        }
        user = await userResponse.json();
        if (user.password !== password) {
          setError("Incorrect password");
          setLoading(false);
          return;
        }
      }

      const paymentResponse = await fetch(
        `http://localhost:7000/api/payment.ginkou.in/pay/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromAccountId: defaultFromAccount || fromAccountId,
            toAccountId,
            amount: parseFloat(amount),
            mode,
          }),
        }
      );

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        setError("Payment failed");
        setLoading(false);
        payState = false;
      } else {
        payState = true;
        alert("Payment successful");
      }

      const newUrl = `${url}/${payState}/${paymentData.transactionId}`;
      console.log(payState);
      if (defaultFromAccount) {
        window.location.href = newUrl; 
      }
    } catch (error) {
      setError("Payment failed: " + error.message);
    } finally {
      setLoading(false);
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
          <select
            value={fromAccountId}
            onChange={(e) => setFromAccountId(parseInt(e.target.value, 10))}
            disabled={!!defaultFromAccount}
            required
          >
            <option value="" disabled>
              Select Account
            </option>
            {accounts.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountId}
              </option>
            ))}
          </select>
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
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
