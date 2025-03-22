import express from 'express';
import { createCollection, getCollections } from './controller';
const router = express.Router();

// GET api/v1/collections
router.get('/', getCollections);

// POST api/v1/collections
router.post('/', createCollection);

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
