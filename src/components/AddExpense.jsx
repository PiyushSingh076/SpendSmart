import React from "react";
import "./AddExpenseModal.css";

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    values.amount = parseFloat(values.amount);
    onFinish(values);
    e.target.reset();
  };

  if (!isExpenseModalVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Expense</h2>
        <form className="expense-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Reciever's name"
            required
          />

          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            required
          />

          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" required />

          <label htmlFor="tag">Tag</label>
          <input
            id="tag"
            name="tag"
            type="text"
            placeholder="Enter tag"
            required
          />

          <div className="modal-buttons">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleExpenseCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
