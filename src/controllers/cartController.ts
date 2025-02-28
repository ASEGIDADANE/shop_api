import { Request, Response } from 'express';
import Cart from '../models/cartModel';
import { addToCart, removefromcart, getcart, clearcart } from '../services/cartService';
import {addToCartSchemaZod} from '../models/cartModel';
import { z} from 'zod';




const addToCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = addToCartSchemaZod.parse(req.body);

        const data = validatedData;
   
        const cart = await addToCart(data);
      
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };

const removefromcartController = async (req: Request, res: Response): Promise<void> => {
    try {
        await removefromcart(req, res);
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };

const getcartController = async (req: Request, res: Response): Promise<void> => {
    try {
        await getcart(req, res);
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };
const clearcartController = async (req: Request, res: Response): Promise<void> => {
    try {
        await clearcart(req, res);
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };

export { addToCartController, removefromcartController, getcartController, clearcartController };




