import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./transaction.css";

function TransactionDisplay() {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/payment.ginkou.in/allTransaction/${userId}`
        );
        const data = await response.json();

        const combinedTransactions = [
          ...data.creditTransactions.map((transaction) => ({
            ...transaction,
            type: "credit",
          })),
          ...data.debitTransactions.map((transaction) => ({
            ...transaction,
            type: "debit",
          })),
          ...data.selfTransactions.map((transaction) => ({
            ...transaction,
            type: "self",
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
  }, [userId]);

  const getTransactionStyle = (transaction) => {
    if (transaction.type === "failed") {
      return { color: "red" };
    } else if (transaction.type === "credit") {
      return { color: "green" };
    } else if (transaction.type === "debit") {
      return { color: "blue" };
    } else if (transaction.type === "self") {
      return { color: "orange" };
    }
    return {};
  };

  const toggleDetails = (transactionId) => {
    setExpandedTransactionId((prevId) =>
      prevId === transactionId ? null : transactionId
    );
  };

  return (
    <div className="transaction-container">
      {transactions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696467.jpg?t=st=1727115903~exp=1727119503~hmac=84814b7f18a43e09d89421208d9572e2835b0c7a0338e4a22970fb770e6cfadf&w=740"
            alt="No Transactions"
            style={{ width: '100%', height: '100%' }}
          />
          <p style={{fontSize: '20px', color: 'rgb(245, 142, 187)', fontWeight: 'bold'}}>-- No data available --</p>
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
                        {transaction.type !== "failed" && (
                          <>
                            <strong>From Account:</strong>{" "}
                            {transaction.fromAccountId} <br />
                            <strong>To Account:</strong> {transaction.toAccountId}{" "}
                            <br />
                          </>
                        )}
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
  );
}

export default TransactionDisplay;
