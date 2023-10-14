import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Navigation.css';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Unique Custom Computers</h1></li>
            </ul>

            <ul>
                <li><Link to="/" role='button'>Customize</Link></li>
                <li><Link to="/customitems" role='button'>View Computers</Link></li>
            </ul>
            
        </nav>
    )
}

export default Navigation;
