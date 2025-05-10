import { Request, Response, NextFunction } from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { verifyJwt } from '@/lib/jwt';
import logger from '@/logger';

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the request has an authorization header and extract the token from it
    // format: Bearer token
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        error: 'Unauthorized'
      });
      return;
    }

    // Verify the token
    const verifyToken = verifyJwt(token);
    if (!verifyToken) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        error: 'Unauthorized'
      });
      return;
    }

    // Attach the user to the request object
    req.user = verifyToken;

    next();
  } catch (error: unknown) {
    logger.error(`[AuthGuard] - Unable to authorise user: ${error}`);
    const message = (error as VerifyErrors)
      ? (error as VerifyErrors).message
      : error;
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      error: message
    });
  }
};

export default authGuard;
