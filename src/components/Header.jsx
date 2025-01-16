import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Header.css";

function Header() {
  const navigate = useNavigate(); 

  function logoutFunc() {
    alert("Logout successful!");
    navigate('/'); 
  }

  return (
    <div className='navbar'>
      <p className='ss'>SmartSpend.</p>
      <p onClick={logoutFunc} className='logout'>Logout</p>
    </div>
  );
}

export default Header;
