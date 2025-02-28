import express, { Request, Response } from 'express';
import { addToCartController, removefromcartController, getcartController, clearcartController } from '../controllers/cartController';
import validateToken from '../middlesWare/authMiddleware';
import  restrictToUser  from '../middlesWare/roleMiddleware';

const router = express.Router();

router.post('/add', validateToken,restrictToUser, addToCartController);
router.delete('/remove', validateToken,restrictToUser, removefromcartController);  
router.get('/', validateToken,restrictToUser, getcartController);
router.delete('/clear', validateToken,restrictToUser, clearcartController);

export default router;



