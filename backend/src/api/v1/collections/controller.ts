import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ Collections: 'Get Collections' });
});

router.post('/', async (req, res) => {
  res.json({ Collections: 'Create Collection' });
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
