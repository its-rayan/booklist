import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../logger';
import { createCollectionSchema } from './schema';
import Collection from '../../../database/models/collection';
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ Collections: 'Get Collections' });
});

// POST api/v1/collections
router.post('/', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
  res.json({ Collections: 'Get Single Collection' });
});

router.delete('/:id', async (req, res) => {
  res.json({ Collections: 'Delete Single Collection' });
});

router.post('/:id/books', async (req, res) => {
  res.json({ Collections: 'Add book to Single Collection' });
});

export default router;
