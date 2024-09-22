import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    fetchUserAccounts();
    fetchUserTransactions();
    fetchUserCards();
  }, []);

  const fetchUserAccounts = async () => {
    try {
      const response = await fetch('/api/user/accounts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAccounts(data.accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const response = await fetch('/api/user/transactions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchUserCards = async () => {
    try {
      const response = await fetch('/api/user/cards');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCards(data.cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      
      <section>
        <h2>My Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Type</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountId}>
                <td>{account.accountId}</td>
                <td>{account.Type}</td>
                <td>${account.balance}</td>
                <td>{account.accountStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h2>My Cards</h2>
        <table>
          <thead>
            <tr>
              <th>Card ID</th>
              <th>Account ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.cardId}>
                <td>{card.cardId}</td>
                <td>{card.accountId}</td>
                <td>{card.status ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h2>My Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.fromAccountId}</td>
                <td>{transaction.toAccountId}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>{new Date(transaction.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserPage;
