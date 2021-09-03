import config from 'config';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseCodes } from '../constants/ResponseCodes';

import Payload from '../types/Payload';
import Request from '../types/Request';

export default function(req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(ResponseCodes.UNAUTHORIZED)
      .json({ msg: 'No token, authorization denied' });
  }
  // Verify token
  try {
    const payload: Payload | any = jwt.verify(token, config.get('jwtSecret'));
    req.userId = payload.userId;
    next();
  } catch (err) {
    res
      .status(ResponseCodes.UNAUTHORIZED)
      .json({ msg: 'Token is not valid' });
  }
}
