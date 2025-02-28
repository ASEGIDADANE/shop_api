import { Request, Response } from 'express';
// import mongoose from 'mongoose';
import Cart from '../models/cartModel';
import Product from '../models/productModel';
import mongoose, { Document } from 'mongoose';
import { ICartInput } from '../models/cartModel';

const addToCart = async (data: { userId: string, productId: string, quantity: number }): Promise<Document> => {
    const { userId, productId, quantity } = data;
  
    try {
      
      const product = await Product.findById(productId).exec();
      if (!product) {
        throw new Error('Product not found');
      }
 
      let cart = await Cart.findOne({ user: userId }).exec();
  
      if (!cart) {
       
        cart = new Cart({
          user: userId,
          items: [],
          total: 0,
        });
      }
  
      
      const existingProductIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (existingProductIndex !== -1) {
      
        cart.items[existingProductIndex].quantity += quantity;
      } else {

        // Add the product to the cart if it doesn't exist
        cart.items.push({
          product: product._id as mongoose.Schema.Types.ObjectId,
          quantity,
          price: product.price as number,
        });
        
      }
  
      // Recalculate the total
      cart.total = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
  
      // Save the cart
      await cart.save();
  
      return cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

const removefromcart = async (req: Request, res: Response): Promise<void> => {
    const { userId, productId } = req.body;
    
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId }).exec();
    
        if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
        }
    
        // Find the index of the product in the cart
        const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
        );
    
        if (productIndex === -1) {
        res.status(404).json({ message: 'Product not found in cart' });
        return;
        }
    
        // Remove the product from the cart
        cart.items.splice(productIndex, 1);
    
        // Recalculate the total
        cart.total = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
        );
    
        // Save the cart
        await cart.save();
    
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };

    const getcart = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.body;
        const cart = await Cart.findOne({ user: userId }).exec();
        res.status(200).json(cart);
    };

    const clearcart = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.body;
        console.log("userId");
        console.log(userId);
        const cart = await Cart.findOne({ user: userId }).exec();
        console.log(cart);
    
        if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
        }
    
        cart.items = [];
        cart.total = 0;
        console.log("cart is deleted");
        console.log(cart);
        await cart.save();
        console.log(cart);
    
        res.status(200).json({ message: 'Cart cleared', cart });
    };




    export { addToCart, removefromcart, getcart, clearcart };
