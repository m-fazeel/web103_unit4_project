
import express from 'express';
import * as componentOptionsController from '../controllers/componentOptionsController.js';

const router = express.Router();

router.get('/componentoptions', componentOptionsController.getComponentOptions);

export default router;