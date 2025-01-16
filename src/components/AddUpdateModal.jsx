import React, { useState } from "react";
import "./AddUpdateModal.css";

function AddUpdateModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish(formData, "income");
    setFormData({ name: "", amount: "", date: "", tag: "" });
  };

  return (
    isIncomeModalVisible && (
      <div className="modal-overlay">
        <div className="modal-container">
          <h2>Update Transaction</h2>
          <form onSubmit={handleSubmit} className="income-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter transaction name"
              required
            />

            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />

            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="Enter tag"
              required
            />

            <div className="modal-buttons">
              <button
                type="button"
                onClick={handleIncomeCancel}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default AddUpdateModal;
