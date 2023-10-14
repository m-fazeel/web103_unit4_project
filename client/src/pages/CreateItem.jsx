// File: client/src/pages/CreateCar.jsx
import React, { useState, useEffect } from 'react';
import { createItem } from '../services/CustomItemsAPI';
import { getComponentOptions } from '../services/ComponentOptionsAPI';

const CreateCar = () => {
    const [formData, setFormData] = useState({
        title: '',
        cpu: '',
        gpu: '',
        ram: '',
        storage: '',
    });
    const [componentOptions, setComponentOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);



    useEffect(() => {
        const fetchComponentOptions = async () => {
            try {
                const options = await getComponentOptions();
                setComponentOptions(options);
                console.log(options);
            } catch (error) {
                console.error('Error fetching component options:', error);
            }
        };

        fetchComponentOptions();
    }, []);

    const getPrice = (name) => {
        const option = componentOptions.find(option => option.component_name === name);
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
            const newItem = await createItem({ ...formData, total_price: newTotalPrice });
            console.log('Item created:', newItem);
            window.location.href = '/customitems';
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };
    
    const filterOptions = (type) => {
        return componentOptions.filter(option => option.component_type === type);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title || ''} 
                onChange={handleChange}
            />
            <select name="cpu" value={formData.cpu} onChange={handleChange}>
                <option value="" disabled>Select a CPU</option>
                {filterOptions('CPU').map(option => (
                    <option key={option.id} value={option.name}>{option.component_name}</option>
                ))}
            </select>
            
            <select name="gpu" value={formData.gpu} onChange={handleChange}>
                <option value="" disabled>Select a GPU</option>
                {filterOptions('GPU').map(option => (
                    <option key={option.id} value={option.name}>{option.component_name}</option>
                ))}
            </select>
            
            <select name="ram" value={formData.ram} onChange={handleChange}>
                <option value="" disabled>Select RAM</option>
                {filterOptions('RAM').map(option => (
                    <option key={option.id} value={option.name}>{option.component_name}</option>
                ))}
            </select>
            
            <select name="storage" value={formData.storage} onChange={handleChange}>
                <option value="" disabled>Select Storage</option>
                {filterOptions('Storage').map(option => (
                    <option key={option.id} value={option.name}>{option.component_name}</option>
                ))}
            </select>
            {/* <p>Total Price: ${totalPrice.toFixed(2)}</p>  */}
            <button type="submit">Create</button>
        </form>
    );
    
};

export default CreateCar;
