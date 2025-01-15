import React from 'react';

function Cards({ currentBalance, income, expenses, showExpenseModal, showIncomeModal, reset }) {
  return (
    <div className="dashboard-container">
      <div className="card-container">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p>${income.toLocaleString()}</p>
          <button className="addIncome" onClick={showIncomeModal}>
            Add Income
          </button>
        </div>
        <div className="card balance-card">
          <h3>Current Balance</h3>
          <p>${currentBalance.toLocaleString()}</p>
          <button className="resetBalance" onClick={reset}>
            Reset Balance
          </button>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p>${expenses.toLocaleString()}</p>
          <button className="addExpense" onClick={showExpenseModal}>
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
