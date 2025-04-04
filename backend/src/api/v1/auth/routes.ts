import express from 'express';
import { signIn, signUp } from './controller';

const router = express.Router();

// POST api/v1/auth/signup
router.post('/signup', signUp);

// POST api/v1/auth/signin
router.post('/signin', signIn);

export default router;
