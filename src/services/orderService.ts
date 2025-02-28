import { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import Cart from '../models/cartModel';
import cartModel from '../models/cartModel';
import Product from '../models/productModel';
import { ICartInput } from '../models/cartModel';
import Order from '../models/orderModel';




async function placeOrder(userId: string): Promise<Document> {
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product').exec();

    if (!cart) {
      throw new Error('Cart not found');
    }
    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    for (const item of cart.items) {
        const product = item.product as any;
        if (product.countInStock < item.quantity) {
          throw new Error(`Product ${product.name} is out of stock`);
        }
      }




    const orderItems = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalPrice = cart.total;

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
      status: 'pending',
    });

    await newOrder.save();

    
    // Reduce stock quantity from products
    for (const item of cart.items) {
      const product = item.product as any;
      product.countInStock -= item.quantity;
      await product.save();
    }

    // Clear the cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    return newOrder;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }

}

const getorder = async (): Promise<Document[]> => {
    try {
      const orders = await Order.find({}).exec();
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

const getuserorder = async function(userId: string): Promise<Document[]> {
    try {
        const orders = await Order.find({ user: userId }).exec();
        return orders;
    } catch (error) {
        console.error('Error getting user orders:', error);
        throw error;
    }
}

const updateOrderStatus = async function (orderId: string, newStatus: string): Promise<Document | null> {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: { status: newStatus } },
        { new: true }
      ).exec();
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

export { placeOrder, getorder,  getuserorder,   updateOrderStatus };


