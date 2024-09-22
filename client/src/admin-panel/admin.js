import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
  useEffect(() => {
    fetchTotalAmount();
    fetchAllTransactions();
    fetchAllCards();
    fetchAllAccounts();
  }, []);

  const fetchTotalAmount = async () => {
    try {
      const response = await fetch('/api/admin/total-amount');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTotalAmount(data.totalAmount);
    } catch (error) {
      console.error('Error fetching total amount:', error);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const response = await fetch('/api/admin/transactions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchAllCards = async () => {
    try {
      const response = await fetch('/api/admin/cards');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCards(data.cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const fetchAllAccounts = async () => {
    try {
      const response = await fetch('/api/admin/accounts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAccounts(data.accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      const response = await fetch(`/api/admin/accounts/${accountId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchAllAccounts(); // Refresh the accounts list
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleMakePayment = async (transactionData) => {
    try {
      const response = await fetch('/api/admin/make-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchAllTransactions(); // Refresh transactions
      fetchTotalAmount(); // Refresh total amount
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <section>
        <h2>Total Amount in Bank: ${totalAmount}</h2>
      </section>
      
      <section>
        <h2>All Transactions</h2>
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
      
      <section>
        <h2>All Cards</h2>
        <table>
          <thead>
            <tr>
              <th>Card ID</th>
              <th>User ID</th>
              <th>Account ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.cardId}>
                <td>{card.cardId}</td>
                <td>{card.userId}</td>
                <td>{card.accountId}</td>
                <td>{card.status ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h2>Manage Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>Account ID</th>
              <th>User ID</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountId}>
                <td>{account.accountId}</td>
                <td>{account.userId}</td>
                <td>${account.balance}</td>
                <td>
                  <button onClick={() => handleDeleteAccount(account.accountId)}>Delete Account</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h2>Make Payment</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const transactionData = {
            fromAccountId: formData.get('fromAccountId'),
            toAccountId: formData.get('toAccountId'),
            amount: parseFloat(formData.get('amount')),
            mode: formData.get('mode'),
            remark: formData.get('remark'),
            cardId: formData.get('cardId') || null,
          };
          handleMakePayment(transactionData);
        }}>
          <input type="number" name="fromAccountId" placeholder="From Account ID" required />
          <input type="number" name="toAccountId" placeholder="To Account ID" required />
          <input type="number" name="amount" placeholder="Amount" required />
          <input type="text" name="mode" placeholder="Mode (CASH/CARD/NETBANKING)" required />
          <input type="text" name="remark" placeholder="Remark" />
          <input type="number" name="cardId" placeholder="Card ID (Optional for Card Transactions)" />
          <button type="submit">Make Payment</button>
        </form>
      </section>
    </div>
  );
};

export default AdminPage;
