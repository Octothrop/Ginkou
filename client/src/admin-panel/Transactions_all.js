import React, { useState, useEffect } from "react";
import "./Transactions_all.css";
import Footer from "../header-footer/footer";
import AdminHeader from "../header-footer/admin-header";

function TransactionDisplayAll() {
  const [transactions, setTransactions] = useState([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/payment.ginkou.in/admin/all`
        );
        const data = await response.json();

        const combinedTransactions = [
          ...data.sucessTransactions.map((transaction) => ({
            ...transaction,
            type: "success",
          })),
          ...data.failedTransactions.map((transaction) => ({
            ...transaction,
            type: "failed",
          })),
        ].sort((a, b) => new Date(b.time) - new Date(a.time));

        setTransactions(combinedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const getTransactionStyle = (transaction) => {
    if (transaction.type === "failed") {
      return { color: "red" };
    } else if (transaction.type === "sucess") {
      return { color: "blue" };
    }
    return {};
  };

  const toggleDetails = (transactionId) => {
    setExpandedTransactionId((prevId) =>
      prevId === transactionId ? null : transactionId
    );
  };

  return (
    <div>
      <AdminHeader />
    <div className="transaction-container">
      {transactions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?t=st=1727436461~exp=1727440061~hmac=72671970110de69627864245de65e03f8ef4817108ea35e8c439b80184a7dd90&w=996"
             alt="No Transactions"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Mode</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <React.Fragment
                key={`${transaction.transactionId}-${transaction.type}`}
              >
                <tr
                  style={getTransactionStyle(transaction)}
                  onClick={() => toggleDetails(transaction.transactionId)}
                >
                  <td>{new Date(transaction.time).toLocaleDateString()}</td>
                  <td className="transaction-type">{transaction.mode}</td>
                  <td>{transaction.type}</td>
                  <td>
                    {transaction.amount.toLocaleString(undefined, {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>
                    <span
                      role="img"
                      aria-label="details"
                      style={{
                        marginLeft: "5px",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    >
                      ℹ️
                    </span>
                  </td>
                </tr>
                {expandedTransactionId === transaction.transactionId && (
                  <tr className="transaction-details">
                    <td colSpan="5">
                      <div>
                        <strong>From Account:</strong>{" "}
                        {transaction.fromAccountId} <br />
                        <strong>To Account:</strong> {transaction.toAccountId}{" "}
                        <br />
                        <strong>Transcript :</strong> {transaction.remark}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default TransactionDisplayAll;
