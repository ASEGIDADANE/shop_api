import { Request, Response } from 'express';
import {  addReview, getReviews, deleteReview } from '../services/reviewService';
import {reviewSchemaZod} from '../models/reviewModel';
import {z} from 'zod';
const addReviewController = async (req: Request, res: Response): Promise<void> => {
    try {
        
        await addReview(req, res);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getReviewsController = async (req: Request, res: Response): Promise<void> => {
    try {
        await getReviews(req, res);
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteReviewController = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteReview(req, res);
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { addReviewController, getReviewsController, deleteReviewController };
