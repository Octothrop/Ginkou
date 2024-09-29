import React, { useState, useEffect } from "react";
import "./accounts.css";
import Footer from "../header-footer/footer";
import AdminHeader from "../header-footer/admin-header";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [avl, setAvl] = useState(false);

  // Fetch all accounts on component mount
  useEffect(() => {
    setAvl(false);
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/getAllAccounts"
        );
        const data = await response.json();
        setAccounts(data);
        if (data.length > 0) {
          setAvl(true);
        }
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

  // Handle card issuance
  const handleIssueCard = async (userId, accountId) => {
    const confirmIssue = window.confirm(
      "Are you sure you want to issue a card for this account?"
    );
    if (!confirmIssue) return;

    try {
      const response = await fetch(
        `http://localhost:7000/api/createCard/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId,
          }),
        }
      );

      if (response.ok) {
        alert("Card issued successfully");
      } else {
        alert("Failed to issue card");
      }
    } catch (error) {
      console.error("Error issuing card:", error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="accounts-container">
        <div className="accounts-list">
          {avl &&
            accounts.map((account) => (
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
                    {account.accountStatus !== "CLOSED" && (
                      <button
                        className="close-btn"
                        onClick={() =>
                          handleIssueCard(account.userId, account.accountId)
                        }
                      >
                        Issue Card
                      </button>
                    )}
                    {account.accountStatus === "CLOSED" && (
                      <button className="closed-btn">CLOSED</button>
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

          {!avl && (
            <img
              class="no-data"
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1727435938~exp=1727439538~hmac=0142a55ef92173d2bbcb63b7951b1996bbea97f63290fdfecbb618cdee8fdf03&w=740"
            ></img>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Accounts;
