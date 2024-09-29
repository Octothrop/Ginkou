import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./account.css";
import Footer from "../header-footer/footer";
import UserHeader from "../header-footer/user_header";

function AccountDisplay() {
  const { userId } = useParams();
  const [accounts, setAccounts] = useState([]);
  const [avl, setAvl] = useState(false);

  useEffect(() => {
    setAvl(false);
    if (userId) {
      fetch(`http://localhost:7000/api/getAll/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setAccounts(data);
          if (data.length > 0) {
            setAvl(true);
          }
        })
        .catch((error) => console.error("Error fetching accounts:", error));
    }
  }, [userId]);
  

  return (
    <div className="card-main">
      <UserHeader userId={userId}/>
      <div className="account-container">
        {avl && accounts.map((account) => (
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
        {!avl && <img class="no-data" src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1727435938~exp=1727439538~hmac=0142a55ef92173d2bbcb63b7951b1996bbea97f63290fdfecbb618cdee8fdf03&w=740"></img>}
      </div>
      <Footer />
    </div>
  );
}

export default AccountDisplay;
