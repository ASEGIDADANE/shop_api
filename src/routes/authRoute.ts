import express, { Request, Response } from 'express';
import { registerUser, loginUserController } from '../controllers/authController';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUserController);


export default router;