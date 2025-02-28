import express, { Request, Response } from 'express';
import { addReviewController, getReviewsController, deleteReviewController } from '../controllers/reviewController';
import validateToken from '../middlesWare/authMiddleware';
import restrictToUser  from '../middlesWare/roleMiddleware';
import checkAdmin from '../middlesWare/roleMiddleware';

const router = express.Router();
router.post('/add', validateToken,restrictToUser,addReviewController);
router.get('/:id',validateToken, getReviewsController);
router.delete('/:id',validateToken,checkAdmin, deleteReviewController);

export default router;

