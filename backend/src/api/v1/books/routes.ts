import express from 'express';
import { getBooks } from './controller';
const router = express.Router();

// GET api/v1/books - Used to search for books
// @route GET /api/v1/books?q=searchTerm
router.get('/', getBooks);

export default router;
