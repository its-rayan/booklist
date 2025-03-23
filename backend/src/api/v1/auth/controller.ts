import express from 'express';
import { signInSchema } from './schemas';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../logger';

export const signIn = async (req: express.Request, res: express.Response) => {
  try {
    const model = { ...req.body };

    // validate request body
    const validity = signInSchema.safeParse(model);
    if (!validity.success) {
      const { message } = validity.error;
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: message
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};
