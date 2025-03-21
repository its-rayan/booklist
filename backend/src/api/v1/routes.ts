import express from 'express';
const router = express.Router();

import { default as collections } from './collections/routes';

router.use('/collections', collections);

export default router;
