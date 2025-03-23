import express from 'express';
const router = express.Router();

import { default as collections } from './collections/routes';
import { default as auth } from './auth/routes';

router.use('/collections', collections);

router.use('/auth', auth);

export default router;
