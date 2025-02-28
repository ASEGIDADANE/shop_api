import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import user from '../models/userModel';

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}



const restrictToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'user') {
      return res.status(403).json({ message: 'Admins are not allowed to add items to the cart' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { restrictToUser };

export default checkAdmin;

