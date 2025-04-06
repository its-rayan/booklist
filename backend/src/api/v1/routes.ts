import express from 'express';
const router = express.Router();

import { default as auth } from './auth/routes';
import { default as collections } from './collections/routes';
import { default as books } from './books/routes';

router.use('/auth', auth);

router.use('/collections', collections);

router.use('/books', books);

export default router;
