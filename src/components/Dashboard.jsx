import React, { useState, useEffect } from 'react';
import Header from './Header';
import './Dashboard.css';
import Cards from './Cards';

import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import moment from 'moment';
import { addDoc, collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import TransactionTable from './TransactionTable'; 
import AddIncomeModal from './AddIncome';
import AddExpenseModal from './AddExpense';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [totalIncome, setTotalIncome] = useState(10000);
  const [totalExpenses, setTotalExpenses] = useState(2500);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const showExpenseModal = () => {
    if (totalIncome - totalExpenses <= 0) {
      toast.error("You have no money to spend!");
    } else {
      setIsExpenseModalVisible(true);
    }
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const resetBalance = () => {
    setTotalIncome(0);
    setTotalExpenses(0);
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);  // Add new transaction only (no update)
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      fetchTransactions();  
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  async function deleteTransaction(id) {
    try {
      const docRef = doc(db, `users/${user.uid}/transactions`, id);
      await deleteDoc(docRef);
      toast.success("Transaction Deleted!");
      fetchTransactions();  // Fetch updated transactions
    } catch (e) {
      console.error("Error deleting document: ", e);
      toast.error("Couldn't delete transaction");
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      let income = 0;
      let expenses = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactionsArray.push({ id: doc.id, ...data });  // Include the document ID
        if (data.type === 'income') {
          income += data.amount;
        } else if (data.type === 'expense') {
          expenses += data.amount;
        }
      });

      setTransactions(transactionsArray);
      setTotalIncome(income);
      setTotalExpenses(expenses);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const toggleTransactionTable = () => {
    setShowTransactions(!showTransactions);
  };

  return (
    <div className="dashBoard">
      <Header />
      <Cards
        currentBalance={totalIncome - totalExpenses}
        income={totalIncome}
        expenses={totalExpenses}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        reset={resetBalance}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={(values) => onFinish(values, 'expense')}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={(values) => onFinish(values, 'income')}
      />

      {/*toggle the transaction table */}
      <button onClick={toggleTransactionTable} className="show-transactions-btn">
        {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
      </button>

      {showTransactions && <TransactionTable 
        transactions={transactions} 
        loading={loading} 
        onDelete={deleteTransaction}  
      />}
    </div>
  );
}

export default Dashboard;
