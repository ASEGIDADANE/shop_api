import { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import Order from '../models/orderModel';
import { placeOrder, getorder,  getuserorder,   updateOrderStatus } from '../services/orderService';

const placeOrderController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.userId;
        console.log('userId:', userId);
        
        const order = await placeOrder(userId);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getorderController = async(request: Request, response: Response) => {
    try {
        const orders = await getorder();
        response.status(200).json(orders);
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: error.message });
        } else {
            response.status(500).json({ message: 'An unknown error occurred' });
        }
    }
    };

const getuserorderController = async(request: Request, response: Response) => {
    try {
        const userId = request.params.userId;
        const orders = await getuserorder(userId);
        response.status(200).json(orders);
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: error.message });
        } else {
            response.status(500).json({ message: 'An unknown error occurred' });
        }
    }
    };

const updateOrderStatusController = async(request: Request, response: Response) => {
    try {
        const orderId = request.params.orderId;
        const status = request.body.status;
        const order = await updateOrderStatus(orderId, status);
        response.status(200).json(order);
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: error.message });
        } else {
            response.status(500).json({ message: 'An unknown error occurred' });
        }
    }
    };

export { placeOrderController, getorderController, getuserorderController, updateOrderStatusController };


