import React, { useState, useEffect } from "react";
import "./payment.css";

const PaymentPage = ({
  defaultToAccount,
  defaultFromAccount,
  defaultMode,
  defaultAmount,
  userId,
}) => {
  const [toAccountId, setToAccountId] = useState(defaultToAccount || 0);
  const [fromAccountId, setFromAccountId] = useState(defaultFromAccount || 0); // Track selected account ID
  const [accounts, setAccounts] = useState([]); // Track list of accounts
  const [amount, setAmount] = useState(defaultAmount || 0);
  const [mode, setMode] = useState(defaultMode || "CASH");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/getAllAccId/${userId}`
        );
        if (response.ok) {
          const accountsData = await response.json();
          setAccounts(accountsData); // Set accounts list
        } else {
          setError("Failed to load accounts");
        }
      } catch (error) {
        setError("Error fetching accounts: " + error.message);
      }
    };

    fetchAccounts();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //... remaining handleSubmit code
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentPage;
