import mongoose, { Document, Schema } from 'mongoose';

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
    //   it is optional
     
    },
  },
  {
    timestamps: true,
  }
);



const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;



