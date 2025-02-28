import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      // it is optional
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);

// Define the zod schema for review input validation
const reviewSchemaZod = z.object({
  userId: z.string().min(1, 'Please provide a user ID'),
  productId: z.string().min(1, 'Please provide a product ID'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().optional(),
});

type IReviewInputZod = z.infer<typeof reviewSchemaZod>;

export default Review;
export { IReview, reviewSchemaZod, IReviewInputZod };