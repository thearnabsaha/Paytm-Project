import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.verify(
      req.headers.token as string,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string };

    if (decoded.id) {
      req.id = decoded.id;
      next();
    } else {
      res.status(401).send('Authorization Error');
    }
  } catch (err) {
    res.status(500).send('Authorization Error');
  }
};