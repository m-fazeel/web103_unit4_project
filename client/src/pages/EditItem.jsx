// File: client/src/pages/EditCar.jsx
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { getItemById, updateItem } from '../services/CustomItemsAPI';
import { getComponentOptions } from '../services/ComponentOptionsAPI';

const EditCar = () => {
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        title: '',  // Added title field
        cpu: '',
        gpu: '',
        ram: '',
        storage: '',
    });
    const [componentOptions, setComponentOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);  // Added totalPrice state


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [item, options] = await Promise.all([
                    getItemById(id),
                    getComponentOptions()
                ]);
                setFormData(item);
                setComponentOptions(options);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getPrice = (name) => {
        const option = componentOptions.find(option => option.component_name === name);
        console.log('Option:', option);
        return option ? parseFloat(option.component_price) : 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        const newTotalPrice = ['cpu', 'gpu', 'ram', 'storage'].reduce((sum, field) => {
            return sum + getPrice(formData[field] === name ? value : formData[field]);
        }, 0);
        setTotalPrice(newTotalPrice);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTotalPrice = ['cpu', 'gpu', 'ram', 'storage'].reduce((sum, field) => {
            return sum + getPrice(formData[field]);
        }, 0);
        try {
            const updatedItem = await updateItem(id, { ...formData, total_price: newTotalPrice });
            console.log('Item updated:', updatedItem);
            window.location.href = `/customcars/${id}`;
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const filterOptions = (type) => {
        return componentOptions.filter(option => option.component_type === type);
    };
    return (
        <div style={{ padding: '20px' }}>
            <h1>Edit Custom Computer</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>  {/* Added div for title input */}
                        <label style={{ marginRight: '10px' }}>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    {['cpu', 'gpu', 'ram', 'storage'].map(field => (
                        <div key={field} style={{ marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>{field.toUpperCase()}:</label>
                            <select name={field} value={formData[field]} onChange={handleChange}>
                                {filterOptions(field.toUpperCase()).map(option => (
                                    <option key={option.id} value={option.name}>{option.component_name}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button type="submit" style={{ padding: '10px 20px' }}>Update</button>
                </form>
            )}
        </div>
    );
};

export default EditCar;
