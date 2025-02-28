import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

// Define the zod schema for user input validation
const userSchemaZod = z.object({
  username: z.string().min(1, 'Please provide a name'),
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).default('user'),
});

const userLoginSchemaZod = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type IUserInputZod = z.infer<typeof userSchemaZod>;

export default User;
export { IUser, userSchemaZod, IUserInputZod,userLoginSchemaZod };