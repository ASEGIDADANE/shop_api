import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

interface IProductInput {
  title: string;
  description: string;
  price: number;
  countInStock: number;
  category: string;
  image: string;
}

const productSchemaZod = z.object({
  title: z.string().min(1, 'Please provide a name'),
  description: z.string().min(1, 'Please provide a description'),
  price: z.number().positive('Please provide a valid price'),
  countInStock: z.number().int().nonnegative('Please provide a valid count in stock'),
  category: z.string().min(1, 'Please provide a category'),
  image: z.string().url('Please provide a valid image URL'),
});

type IProductInputZod = z.infer<typeof productSchemaZod>;

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
      required: [true, 'Please provide an image'],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
export { Document, IProductInput, productSchemaZod, IProductInputZod };