import { pool } from '../config/database.js';
import 'dotenv/config'

export const getComponentOptions = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM componentoptions');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching component options:', error);
        res.status(500).send('Server Error');
    }
};
