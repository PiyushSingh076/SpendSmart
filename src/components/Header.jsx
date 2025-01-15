import React from 'react';
import "./Header.css"
function Header(){
    function logoutFunc(){
        alert("Logout!!")
    }
    return <div className='navbar'>
        <p className='ss'> SmartSpend.</p>
        <p onClick={logoutFunc} className='logout'>Logout</p>
    </div>
}
export default Header;
