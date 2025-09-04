import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgotpassword';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ExpenseForm from './pages/ExpenseForm';
import ExpenseList from './pages/ExpenseList';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsLoggedIn(true);
      try {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser.name || 'User');
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Layout isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<ExpenseForm />} />
          <Route path="/list" element={<ExpenseList />} />
        </Routes>
      </Layout>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
