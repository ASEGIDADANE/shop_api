import { Request,Response } from "express";
import mongoose from "mongoose";
import Review from "../models/reviewModel"; 
import product from "../models/productModel";
import Order from "../models/orderModel";

const addReview = async (req: Request, res: Response): Promise<void> => {
    const { userId, productId, rating, comment } = req.body;

    try {

        const foundProduct = await product.findById(productId).exec();

        if (!foundProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const order = await Order.findOne({ user: userId, 'items.product': productId }).exec();
        if (!order) {
          res.status(403).json({ message: 'You can only review products you have purchased' });
          return;
        }

        if (rating < 1 || rating > 5) {
            res.status(400).json({ message: 'Rating must be between 1 and 5' });
            return;
          }
        


        const review = new Review({
            user:userId,
            product:productId,
            rating,
            comment,
        });
        await review.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getReviews = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
  
    try {
      
      const reviews = await Review.find({ product: productId }).populate('user', 'name').exec();
  
      if (reviews.length === 0) {
        res.status(404).json({ message: 'No reviews found for this product' });
        return;
      }
  
    
      const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
      res.status(200).json({
        averageRating,
        reviews,
      });
    } catch (error) {
      console.error('Error getting reviews:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteReview = async (req: Request, res: Response): Promise<void> => {
    const reviewId = req.params.reviewId;
  
    try {
      const review = await Review.findById(reviewId).exec();
  
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
  
      await Review.deleteOne({ _id: reviewId }).exec();
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }


export { addReview, getReviews, deleteReview };

``



