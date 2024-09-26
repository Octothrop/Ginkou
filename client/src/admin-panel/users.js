import React, { useState, useEffect } from "react";
import "./users.css";
import Footer from "../header-footer/footer";
import AdminHeader from "../header-footer/admin-header";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedAccType, setSelectedAccType] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/findAllUsers", {
          method: "GET",
        });
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateAccount = async (userId) => {
    const accType = selectedAccType[userId];
    if (!accType) {
      alert("Please select an account type");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7000/api/newAccount/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, accType }),
        }
      );

      if (response.ok) {
        alert("Account created successfully");
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="user-main">
      <AdminHeader />
    <div className="users-container">
      <div className="users-list">
        {users.map((user) => (
          <div className="user-card" key={user.userId}>
            <div className="user-info">
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <div className="user-details">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(user.DOB).toLocaleDateString()}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
              </div>
              <div className="account-type">
                <label htmlFor={`accType-${user.userId}`}>
                  Select Account Type:
                </label>
                <select
                  id={`accType-${user.userId}`}
                  value={selectedAccType[user.userId] || ""}
                  onChange={(e) =>
                    setSelectedAccType({
                      ...selectedAccType,
                      [user.userId]: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="SAVINGS">Savings</option>
                  <option value="CURRENT">Current</option>
                </select>
                <button onClick={() => handleCreateAccount(user.userId)}>
                  Create Account
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Users;
