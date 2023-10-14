// File: client/src/pages/ViewCars.jsx
import React, { useState, useEffect } from 'react';
import { getAllItems } from '../services/CustomItemsAPI';
import '../css/ViewItems.css';  // Import the CSS file
import { Link } from 'react-router-dom';  // Import the Link component

const ViewCars = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

   return (
        <div className='container'>
            <h1>View Custom Computers</h1>
            {items.map(item => (
                <div key={item.id} className='item-card' style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                    <h2>{item.title}</h2>
                    <p>CPU: {item.cpu}</p>
                    <p>GPU: {item.gpu}</p>
                    <p>RAM: {item.ram}</p>
                    <p>Storage: {item.storage}</p>
                    <p className='price-para'>Total Price: ${item.total_price}</p>
                    <Link to={`/customcars/${item.id}`}>  {/* Add Link to redirect to ItemDetails page */}
                        <button>View Details</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};
export default ViewCars;