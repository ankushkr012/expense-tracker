import React, { useEffect, useState } from "react";
import "../styles/ExpenseList.css";
import { FaTrash, FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import API from '../api'; // import api.js
import "react-toastify/dist/ReactToastify.css";


const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [editingExpense, setEditingExpense] = useState(null); // now a full object
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [viewExpense, setViewExpense] = useState(null);

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to fetch expenses");
    }
  };

useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to fetch expenses");
    }
  };
  fetchExpenses();
}, [token]);



  useEffect(() => {
    let data = [...expenses];
    if (search) {
      const searchLower = search.toLowerCase();
      data = data.filter((e) => {
        const dateStr = new Date(e.date).toLocaleDateString();
        return e.title.toLowerCase().includes(searchLower) || dateStr.includes(searchLower);
      });
    }
    setFiltered(data);
  }, [search, expenses]);

  /* ===== Edit Expense ===== */
  const handleSaveEdit = async () => {
    try {
      await API.put(
        `/api/expenses/${editingExpense._id}`,
        editingExpense,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Expense updated!");
      setEditingExpense(null);
      fetchExpenses();
    } catch {
      toast.error("Failed to update expense");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingExpense((prev) => ({ ...prev, [name]: value }));
  };

  /* ===== Delete Expense ===== */
  const handleDelete = async () => {
    try {
      await API.delete(`/api/expenses/${confirmDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Expense deleted!");
      setConfirmDeleteId(null);
      fetchExpenses();
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="expense-list">
      <ToastContainer />
      <h2 className="heading">Expense List</h2>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by title or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>

      <p className="result-count">{filtered.length} result(s) found</p>

      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Pay Mode</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
        <div className="table-scroll-wrapper">
          <table className="expense-table">
            <tbody>
              {filtered.map((e) => (
                <tr key={e._id}>
                  <td>{e.title}</td>
                  <td>{e.payMode}</td>
                  <td>₹{e.amount}</td>
                  <td className={`status-cell ${e.status.toLowerCase()}`}>{e.status}</td>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td className="actions">
                    <FaEye className="action-icon view" title="View" onClick={() => setViewExpense(e)} />
                    <FaEdit className="action-icon edit" title="Edit" onClick={() => setEditingExpense(e)} />
                    <FaTrash className="action-icon delete" title="Delete" onClick={() => setConfirmDeleteId(e._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== View Modal ===== */}
      {viewExpense && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Expense Details</h3>
            <p><strong>Title:</strong> {viewExpense.title}</p>
            <p><strong>Amount:</strong> ₹{viewExpense.amount}</p>
            <p><strong>Pay Mode:</strong> {viewExpense.payMode}</p>
            <p><strong>Status:</strong> {viewExpense.status}</p>
            <p><strong>Date:</strong> {new Date(viewExpense.date).toLocaleDateString()}</p>
            <button className="close-btn" onClick={() => setViewExpense(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ===== Edit Modal ===== */}
      {editingExpense && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Expense</h3>
            <input type="text" name="title" value={editingExpense.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="payMode" value={editingExpense.payMode} onChange={handleChange} placeholder="Pay Mode" />
            <input type="number" name="amount" value={editingExpense.amount} onChange={handleChange} placeholder="Amount" />
            <input type="text" name="status" value={editingExpense.status} onChange={handleChange} placeholder="Status" />
            <input type="date" name="date" value={editingExpense.date.slice(0, 10)} onChange={handleChange} />
            <div className="modal-actions">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditingExpense(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete Modal ===== */}
      {confirmDeleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this expense?</p>
            <div className="modal-actions">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setConfirmDeleteId(null)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
