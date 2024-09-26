import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./account.css";
import Footer from "../header-footer/footer";
import UserHeader from "../header-footer/user_header";

function AccountDisplay() {
  const { userId } = useParams();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:7000/api/getAll/${userId}`)
        .then((response) => response.json())
        .then((data) => setAccounts(data))
        .catch((error) => console.error("Error fetching accounts:", error));
    }
  }, [userId]);

  return (
    <div className="card-main">
      <UserHeader userId={userId}/>
      <div className="account-container">
        {accounts.map((account) => (
          <div className="account" key={account.accountId}>
            <div className="bank-name">銀行</div>
            <div className="account-number">
              Account ID: {account.accountId}
            </div>
            <div className="accountholder">
              {account.Type}
              <span className="balance">Balance: ₹ {account.balance}.00</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AccountDisplay;
