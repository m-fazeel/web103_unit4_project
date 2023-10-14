import { pool } from './database.js';
import '../config/dotenv.js';

const seedDatabase = async () => {
    try {
        await pool.query(`
            -- Drop existing tables if they exist
            DROP TABLE IF EXISTS customitems, componentoptions;

            -- Create CustomItems Table
            CREATE TABLE customitems (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),  -- Added title field
                cpu VARCHAR(255),
                gpu VARCHAR(255),
                ram VARCHAR(255),
                storage VARCHAR(255),
                total_price DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create ComponentOptions Table
            CREATE TABLE componentoptions (
                id SERIAL PRIMARY KEY,
                component_type VARCHAR(255),
                component_name VARCHAR(255),
                component_price DECIMAL(10, 2)
            );

            -- Insert dummy data into ComponentOptions Table
            INSERT INTO ComponentOptions (component_type, component_name, component_price)
            VALUES
            ('CPU', 'Intel Core i9', 450.00),
            ('CPU', 'AMD Ryzen 9', 430.00),
            ('GPU', 'NVIDIA GeForce RTX 3080', 700.00),
            ('GPU', 'AMD Radeon RX 6900 XT', 650.00),
            ('RAM', 'Corsair Vengeance LPX 16GB', 80.00),
            ('RAM', 'G.SKILL Ripjaws V 16GB', 75.00),
            ('Storage', 'Samsung SSD 970 EVO 1TB', 150.00),
            ('Storage', 'WD Black SN750 1TB', 130.00),
            ('CPU', 'Intel Core i7', 350.00),
            ('CPU', 'AMD Ryzen 7', 330.00),
            ('GPU', 'NVIDIA GeForce RTX 3070', 500.00),
            ('GPU', 'AMD Radeon RX 6800 XT', 450.00),
            ('RAM', 'Kingston HyperX Fury 16GB', 70.00),
            ('Storage', 'Kingston A2000 NVMe PCIe M.2 1TB', 110.00);

            -- Insert dummy data into CustomItems Table
            INSERT INTO CustomItems (title, cpu, gpu, ram, storage, total_price)  -- Included title field here
            VALUES
            ('High-end Build 1', 'Intel Core i9', 'NVIDIA GeForce RTX 3080', 'Corsair Vengeance LPX 16GB', 'Samsung SSD 970 EVO 1TB', 1380.00),
            ('High-end Build 2', 'AMD Ryzen 9', 'AMD Radeon RX 6900 XT', 'G.SKILL Ripjaws V 16GB', 'WD Black SN750 1TB', 1285.00),
            ('Mid-range Build 1', 'Intel Core i7', 'NVIDIA GeForce RTX 3070', 'Kingston HyperX Fury 16GB', 'Kingston A2000 NVMe PCIe M.2 1TB', 980.00),
            ('Mid-range Build 2', 'AMD Ryzen 7', 'AMD Radeon RX 6800 XT', 'Kingston HyperX Fury 16GB', 'Kingston A2000 NVMe PCIe M.2 1TB', 960.00);
        `);

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        await pool.end(); 
    }
};

seedDatabase();
