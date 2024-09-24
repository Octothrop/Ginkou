import React, { useState, useEffect } from "react";
import "./accounts.css";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  // Fetch all accounts on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/getAllAccounts"
        );
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Fetch user details when account is selected
  const handleDetailsClick = async (userId, accountId) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/getUser/${userId}`
      );
      const data = await response.json();
      setUserDetails(data);
      setSelectedAccountId(accountId); // Set the selected account ID
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle account closure
  const handleCloseAccount = async (accountId) => {
    const confirmClose = window.confirm(
      "Are you sure you want to close this account?"
    );
    if (!confirmClose) return;

    try {
      const response = await fetch(
        `http://localhost:7000/api/closeAccount/${accountId}`,
        { method: "PUT" }
      );

      if (response.ok) {
        alert("Account closed successfully");
        setAccounts(
          accounts.filter((account) => account.accountId !== accountId)
        );
      } else {
        alert("Failed to close account");
      }
    } catch (error) {
      console.error("Error closing account:", error);
    }
  };

  return (
    <div className="accounts-container">
      <div className="accounts-list">
        {accounts.map((account) => (
          <div className="account-card" key={account.accountId}>
            <div className="account-info">
              <p>
                <strong>Account No:</strong> XXXX XXXX {account.accountId}
              </p>
              <div className="action-buttons">
                <button
                  onClick={() =>
                    handleDetailsClick(account.userId, account.accountId)
                  }
                >
                  i
                </button>
                {account.accountStatus !== "CLOSED" && (
                  <button
                    className="close-btn"
                    onClick={() => handleCloseAccount(account.accountId)}
                  >
                    Close Account
                  </button>
                )}
                {account.accountStatus === "CLOSED" && (
                  <button
                    className="closed-btn"
                  >
                    CLOSED
                  </button>
                )}
              </div>
            </div>
            <p>
              <strong>Balance:</strong> ₹ {account.balance}.00
            </p>
            {selectedAccountId === account.accountId && userDetails && (
              <div className="user-details">
                <div className="user-details-header">
                  <p>
                    <strong>Name:</strong> {userDetails.firstName}{" "}
                    {userDetails.lastName}
                  </p>
                  <button
                    onClick={() => setSelectedAccountId(null)}
                    style={{ fontWeight: "bold", alignSelf: "flex-end" }}
                  >
                    X
                  </button>
                </div>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(userDetails.DOB).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
