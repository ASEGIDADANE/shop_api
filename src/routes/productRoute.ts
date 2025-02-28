import express, { Request, Response } from 'express';
import { createProductController, deleteProductController, getAllProductController, updateProductController } from '../controllers/productController';
import validateToken from '../middlesWare/authMiddleware';
import checkAdmin from '../middlesWare/roleMiddleware';

const router = express.Router();

router.post('/create', validateToken,checkAdmin, createProductController);
router.get('/', validateToken, getAllProductController);
router.put('/:id', validateToken,checkAdmin, updateProductController);
router.delete('/:id', validateToken,checkAdmin, deleteProductController);

export default router;

