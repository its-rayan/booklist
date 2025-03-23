import express from 'express';
import { signUpSchema } from './schemas';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../logger';
import User from '../../../database/models/user';

export const signUp = async (req: express.Request, res: express.Response) => {
  try {
    const model = { ...req.body };

    // validate request body
    const validity = signUpSchema.safeParse(model);
    if (!validity.success) {
      const { message } = validity.error;
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: message
      });
    }

    // Check if user exists
    const userInDb = await User.findOne({ email: model.email });
    if (userInDb) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: 'User already exists'
      });
    }

    const user = new User(model);
    await user.save();

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};
