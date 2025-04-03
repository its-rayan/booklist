/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

// This middleware is used to authenticate users using the local strategy.
// It checks the credentials provided in the request and calls the next middleware
export default function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate('local', function (err: any, user: any) {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', error: 'Internal server error' });
    }
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: 'error', error: 'Invalid credentials' });
    }

    return next();
  })(req, res, next);
}
