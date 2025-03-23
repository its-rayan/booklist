import express from 'express';
import { signIn } from './controller';
const router = express.Router();

// POST api/v1/auth/signin
router.post('/signin', signIn);

export default router;
