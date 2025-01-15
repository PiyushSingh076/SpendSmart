import React from 'react';
import Header from './header';
import './Dashboard.css'; 
import Cards from './Cards';

function Dashboard() {
    return (
        <div className='dashBoard'>
            <Header />
            <Cards />
        </div>
    );
}

export default Dashboard;
