import React, { useState, useEffect } from 'react';
import Header from './Header';
import './Dashboard.css';
import Cards from './Cards';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import moment from 'moment';
import { addDoc, collection, query, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import TransactionTable from './TransactionTable';
import AddIncomeModal from './AddIncome';
import AddExpenseModal from './AddExpense';
import AddUpdateModal from './AddUpdateModal';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [transactionToUpdate, setTransactionToUpdate] = useState(null);

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

  const handleExpenseCancel = () => setIsExpenseModalVisible(false);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);
  const handleUpdateCancel = () => setIsUpdateModalVisible(false);

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
      type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  const onUpdateFinish = async (values) => {
    if (transactionToUpdate) {
      try {
        const docRef = doc(db, `users/${user.uid}/transactions`, transactionToUpdate.id);
        await updateDoc(docRef, {
          ...values,
          date: moment(values.date).format("YYYY-MM-DD"),
          amount: parseFloat(values.amount),
        });
        toast.success("Transaction Updated!");
        fetchTransactions();
        setIsUpdateModalVisible(false);
      } catch (e) {
        console.error("Error updating document: ", e);
        toast.error("Couldn't update transaction");
      }
    }
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
      fetchTransactions();
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
        transactionsArray.push({ id: doc.id, ...data });
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

  const toggleTransactionTable = () => setShowTransactions(!showTransactions);

  const handleUpdateTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      setTransactionToUpdate(transaction);
      setIsUpdateModalVisible(true);
    }
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

      {isUpdateModalVisible && (
        <AddUpdateModal
          isIncomeModalVisible={isUpdateModalVisible}
          handleIncomeCancel={handleUpdateCancel}
          onFinish={onUpdateFinish}
          initialValues={transactionToUpdate}
        />
      )}

      <button onClick={toggleTransactionTable} className="show-transactions-btn">
        {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
      </button>

      {showTransactions && (
        <TransactionTable
          transactions={transactions}
          loading={loading}
          onDelete={deleteTransaction}
          onUpdate={handleUpdateTransaction}
        />
      )}
    </div>
  );
}

export default Dashboard;
