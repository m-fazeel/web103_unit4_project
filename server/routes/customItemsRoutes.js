// File: server/routes/customItemsRoutes.js
import express from 'express';
import * as customItemsController from '../controllers/customItemsController.js';

const router = express.Router();

// Define routes for Custom Items
router.get('/customitems', customItemsController.getAllItems);
router.get('/customitems/:id', customItemsController.getItemById);  // Updated
router.post('/', customItemsController.createItem);  // Updated
router.put('/customitems/edit/:id', customItemsController.updateItem);  // Updated
router.delete('/customitems/edit/:id', customItemsController.deleteItem);  // Updated

export default router;
