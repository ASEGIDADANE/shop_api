import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import mongoose from 'mongoose';



interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}
declare module 'express-serve-static-core' {
    interface Request {
      user?: DecodedToken;
    }
  }

const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];

      // Verify token
      jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
        if (err) {
          const error = new Error('Not authorized, token failed');
          res.status(401);
          return next(error);
        }

        req.user = decoded as DecodedToken;
        next();
      });
    } catch (error) {
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};



export default validateToken;