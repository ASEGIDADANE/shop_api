import mongoose, { Document, Schema } from 'mongoose';
import { ICartItem } from './cartModel'; // Assuming cartItemSchema is defined in cartModel

// Define the order item schema
const orderItemSchema: Schema = new Schema({
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

// Define the order schema
const orderSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      required: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Define the order interface
interface IOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IOrderInput {
  user: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered';
}

interface IOrder extends IOrderInput, Document {}

// Create the order model
const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
export { IOrder, IOrderInput, IOrderItem };