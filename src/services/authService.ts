import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel'; // Assuming you have a User model
import { Document } from 'mongoose';

interface IUserInput {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

interface ILoginInput {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

const createUser = async (data: IUserInput): Promise<Document> => {
  try {
    const { username, email, password, role } = data;
    

    const existingUser = await User.findOne({
      email,   
    });
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


const loginUser = async (data: ILoginInput): Promise<ILoginResponse> => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY as string, {
      expiresIn: "1h"
    });

    return { token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export { createUser, loginUser };