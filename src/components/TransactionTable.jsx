import React, { useState } from "react";
import "./TransactionTable.css";

function TransactionTable({ transactions, loading, onDelete }) {
  const [sortOrder, setSortOrder] = useState({ column: null, direction: "asc" });

  const handleSort = (column) => {
    const direction = sortOrder.direction === "asc" ? "desc" : "asc";
    setSortOrder({ column, direction });

    transactions.sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="transaction-table">
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          <div className="sort-buttons">
            <button onClick={() => handleSort("name")} className="sort-btn">
              Sort by Name
            </button>
            <button onClick={() => handleSort("date")} className="sort-btn">
              Sort by Date
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Tag</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.name}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.tag}</td>
                  <td>{transaction.type}</td>
                  <td>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default TransactionTable;
