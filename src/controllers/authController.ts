import { Request, Response } from 'express';
import { createUser, loginUser } from '../services/authService';
import { userSchemaZod,userLoginSchemaZod } from '../models/userModel';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = userSchemaZod.parse(req.body);
   
    const userData = validatedData;
  ;
    const newUser = await createUser(userData);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: (error as Error).message });
  }
};

const loginUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = userLoginSchemaZod.parse(req.body);
    const result = await loginUser(loginData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export { registerUser, loginUserController };