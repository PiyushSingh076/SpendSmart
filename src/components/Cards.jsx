import React from 'react'

function Cards() {
  return (
    <div className="dashboard-container">
                <div className="card-container">
                    <div className="card income-card">
                        <h3>Total Income</h3>
                        <p>$10,000</p> 
                        <button className='addIncome'>Add Income</button>
                    </div>
                    <div className="card balance-card">
                        <h3>Current Balance</h3>
                        <p>$7,500</p> 
                        <button className='resetBalance'>Reset Balance</button>
                    </div>
                    <div className="card expense-card">
                        <h3>Total Expenses</h3>
                        <p>$2,500</p>
                        <button className='addExpense'>Add Expense</button>
                    </div>
                </div>
            </div>
  )
}

export default Cards