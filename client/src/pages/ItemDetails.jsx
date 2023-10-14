// File: client/src/pages/CarDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';  
import { getItemById, deleteItem } from '../services/CustomItemsAPI';
import '../css/ItemDetails.css';  // Import the CSS file

const CarDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getItemById(id);
                setItem(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {  // Updated this function
        try {
            window.location.href = '/customitems';
            await deleteItem(id);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid black', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginTop: '20px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'black' }}>
            {item ? (
                <>
                    <div>
                        <h2>{item.title}</h2>
                        <p><strong>CPU:</strong> {item.cpu}</p>
                        <p><strong>GPU:</strong> {item.gpu}</p>
                        <p><strong>RAM:</strong> {item.ram}</p>
                        <p><strong>Storage:</strong> {item.storage}</p>
                        <p className='price-para'><strong>Total Price:</strong> ${item.total_price}</p>
                        <div style={{ marginTop: '20px' }}>
                            <Link to={`/customitems/edit/${item.id}`} style={{ marginRight: '10px' }}>
                                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Edit</button>
                            </Link>
                            <button onClick={handleDelete} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'red', color: 'white' }}>Delete</button>
                        </div>
                    </div>
                    <div className="pc-container">
                        <div className="pc-case">
                            <div className="component cpu"></div>
                            <div className="component gpu"></div>
                            <div className="component ram"></div>
                            <div className="component storage"></div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CarDetails;
