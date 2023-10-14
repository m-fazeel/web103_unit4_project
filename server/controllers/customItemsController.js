// File: server/controllers/customItemsController.js
import { pool } from '../config/database.js';
import 'dotenv/config'

export const getAllItems = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM customitems');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
        res.status(500).send('Server Error');
        res.status(500).send(error.message);
    }
  };
  
export const getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM customitems WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const createItem = async (req, res) => {
    const { title, cpu, gpu, ram, storage, total_price } = req.body;  // included title here
    try {
        const result = await pool.query(
            // included title in the SQL query as well
            'INSERT INTO CustomItems (title, cpu, gpu, ram, storage, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, cpu, gpu, ram, storage, total_price]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { title, cpu, gpu, ram, storage, total_price } = req.body;  // Added title
    try {
        const result = await pool.query(
            // Updated query to include title
            'UPDATE CustomItems SET title = $1, cpu = $2, gpu = $3, ram = $4, storage = $5, total_price = $6 WHERE id = $7 RETURNING *',
            [title, cpu, gpu, ram, storage, total_price, id]  // Updated values array to include title
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM CustomItems WHERE id = $1', [id]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
