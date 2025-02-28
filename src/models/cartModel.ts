import mongoose, { Document, Schema } from 'mongoose';

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
export default Cart;
export { ICartInput, ICart, ICartItem };