import express from 'express';
import { signInSchema, signUpSchema } from './schemas';
import { StatusCodes } from 'http-status-codes';
import logger from '@/logger';
import User from '@/database/models/user';
import { hashPassword, validatePassword } from '@/lib/bcrypt';
import { signJwt } from '@/lib/jwt';

export const signUp = async (req: express.Request, res: express.Response) => {
  try {
    const model = { ...req.body };

    // validate request body
    const validity = signUpSchema.safeParse(model);
    if (!validity.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: validity.error.format()
      });
      return;
    }

    // Check if user exists
    const userInDb = await User.findOne({ email: model.email });
    if (userInDb) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: 'User already exists'
      });
      return;
    }

    const hashedPassword = await hashPassword(model.password);
    const updatedModel = { ...model, password: hashedPassword };

    const user = new User(updatedModel);
    await user.save();

    const token = signJwt({
      id: user._id
    });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: token
    });
  } catch (error) {
    logger.error(`[signUp]: ${error}`);
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
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: validity.error.format()
      });
      return;
    }

    const foundUser = await User.findOne({ email: model.email });
    if (!foundUser) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: 'Invalid credentials'
      });
      return;
    }

    const isPasswordValid = await validatePassword(
      model.password,
      foundUser.password
    );
    if (!isPasswordValid) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: 'Invalid credentials'
      });
      return;
    }

    const token = signJwt({
      id: foundUser._id
    });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: token
    });
  } catch (error) {
    logger.error(`[signIn]: ${error}`);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        error: 'Unauthorized'
      });
      return;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: 'User not found'
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    logger.error(`[getUser]: ${error}`);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};
