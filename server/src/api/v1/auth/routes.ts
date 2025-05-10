import express from 'express';
import { getUser, signIn, signUp } from './controller';
import authGuard from '@/middleware/authGuard';

const router = express.Router();

// POST api/v1/auth/signup
router.post('/signup', signUp);

// POST api/v1/auth/signin
router.post('/signin', signIn);

// GET api/v1/auth/user
router.get('/user', authGuard, getUser);

export default router;
