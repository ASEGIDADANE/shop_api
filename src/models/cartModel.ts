import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

interface ICartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface ICartInput {
  user: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
  total: number;
}

interface ICart extends ICartInput, Document {}

const cartItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>('Cart', cartSchema);

// Define the zod schema for cart input validation
const cartItemSchemaZod = z.object({
  product: z.string().min(1, 'Please provide a product ID'),
  quantity: z.number().int().positive('Please provide a valid quantity'),
  price: z.number().positive('Please provide a valid price'),
});

const cartSchemaZod = z.object({
  user: z.string().min(1, 'Please provide a user ID'),
  items: z.array(cartItemSchemaZod),
  total: z.number().nonnegative('Please provide a valid total'),
});

const removeFromCartSchemaZod = z.object({
  userId: z.string().min(1, 'Please provide a user ID'),
  productId: z.string().min(1, 'Please provide a product ID'),
});
const userIDcartSchemaZod = z.object({
  userId: z.string().min(1, 'Please provide a user ID'),
});
const addToCartSchemaZod = z.object({
  userId: z.string().min(1, 'Please provide a user ID'),
  productId: z.string().min(1, 'Please provide a product ID'),
  quantity: z.number().int().positive('Please provide a valid quantity'),
});

type ICartInputZod = z.infer<typeof cartSchemaZod>;

export default Cart;
export { ICartInput, ICart, ICartItem, cartSchemaZod, ICartInputZod, cartItemSchemaZod, removeFromCartSchemaZod, userIDcartSchemaZod,addToCartSchemaZod };