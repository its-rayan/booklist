import express from 'express';
import { signInSchema, signUpSchema } from './schemas';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../logger';
import User from '../../../database/models/user';
import { hashPassword } from '../../../lib/bcrypt';

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

    const hashedPassword = await hashPassword(model.password);
    const updatedModel = { ...model, password: hashedPassword };

    const user = new User(updatedModel);
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

    const user = await User.findOne({ email: model.email });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: 'User not found'
      });
    }

    res.status(StatusCodes.OK).json({
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
