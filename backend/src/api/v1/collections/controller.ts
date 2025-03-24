import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../logger';
import { createCollectionSchema } from './schema';
import Collection from '../../../database/models/collection';

export const getCollections = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const collections = await Collection.find();
    res.json({
      status: 'success',
      data: collections
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};

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
      data: collection
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};

export const getCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: collection
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};

export const deleteCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await Collection.findByIdAndDelete(id);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};
