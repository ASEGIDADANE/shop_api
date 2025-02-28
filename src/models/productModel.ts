import mongoose, { Document, Schema } from 'mongoose';
import { z} from 'zod';

interface IProductInput {
    title: string;
    description: string;
    price: number;
    countInStock: number;
    category: string;
    image: string;
  }

  
//   interface IProduct extends IProductInput, Document {}

const productSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Please provide a count in stock'],
    },
    category: {
      type: String,
        required: [true, 'Please provide a category'],

  },
  image: {
    type: String,
    required: [true, 'Please provide a image'],
  },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
export { Document };
export { IProductInput };




  

