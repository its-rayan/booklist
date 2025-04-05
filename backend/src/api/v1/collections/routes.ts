import express from 'express';
import {
  createCollection,
  deleteCollection,
  getCollection,
  getCollections
} from './controller';
const router = express.Router();

// GET api/v1/collections
router.get('/', getCollections);

// POST api/v1/collections
router.post('/', createCollection);

// GET api/v1/collections/:id
router.get('/:id', getCollection);

// DELETE api/v1/collections/:id
router.delete('/:id', deleteCollection);

router.post('/:id/books', async (req, res) => {
  res.json({ Collections: 'Add book to Single Collection' });
});

export default router;
