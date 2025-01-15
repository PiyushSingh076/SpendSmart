import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Header.css";

function Header() {
  const navigate = useNavigate(); // Initialize the navigate function

  function logoutFunc() {
    alert("Logout successful!");
    // Redirect to the home page (login page or main page) after logout
    navigate('/'); // Home page, adjust the path as needed
  }

  return (
    <div className='navbar'>
      <p className='ss'>SmartSpend.</p>
      <p onClick={logoutFunc} className='logout'>Logout</p>
    </div>
  );
}

export default Header;
