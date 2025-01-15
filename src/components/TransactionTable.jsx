import React, { useState } from 'react';
import './TransactionTable.css';

function TransactionTable({ transactions, loading, onDelete, onEdit }) {
  const [sortOrder, setSortOrder] = useState({ column: null, direction: 'asc' });

  const handleSort = (column) => {
    const direction = sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ column, direction });

    transactions.sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="transaction-table">
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('amount')}>Amount</th>
              <th onClick={() => handleSort('date')}>Date</th>
              <th onClick={() => handleSort('tag')}>Tag</th>
              <th onClick={() => handleSort('type')}>Type</th>
              <th>Actions</th>  {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}> {/* Use transaction.id as the key */}
                <td>{transaction.name}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.tag}</td>
                <td>{transaction.type}</td>
                <td>
                  
                  <button onClick={() => onDelete(transaction.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionTable;
