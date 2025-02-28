import {placeOrderController, getorderController, getuserorderController, updateOrderStatusController} from '../controllers/orderController';
import validateToken from '../middlesWare/authMiddleware';
import checkAdmin from '../middlesWare/roleMiddleware';
import  restrictToUser  from '../middlesWare/roleMiddleware';
import express from 'express';

const router = express.Router();

router.post('/placeOrder', validateToken,restrictToUser, placeOrderController);
router.get('/', validateToken,checkAdmin, getorderController);
router.get('/:userId', validateToken, getuserorderController);
router.patch('/:orderId', validateToken,checkAdmin, updateOrderStatusController);


export default router;