import express from 'express';
const router = express.Router();

import { default as collections } from './collections/controller';

router.use('/collections', collections);

export default router;
