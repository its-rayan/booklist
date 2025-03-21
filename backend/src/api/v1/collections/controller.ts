import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../logger';
import { createCollectionSchema } from './schema';
import Collection from '../../../database/models/collection';

export const createCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const model = { ...req.body };

    // validate request body
    const validity = createCollectionSchema.safeParse(model);
    if (!validity.success) {
      const { message } = validity.error;
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: message
      });
    }

    const collection = new Collection(model);
    await collection.save();

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { collection }
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};
