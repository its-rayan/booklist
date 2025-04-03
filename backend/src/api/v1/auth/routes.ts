import express from 'express';
import { signIn, signOut, signUp } from './controller';
import authenticateMiddleware from '../../../lib/passport/authenticateMiddleware';

const router = express.Router();

// POST api/v1/auth/signup
router.post('/signup', signUp);

// POST api/v1/auth/signin
router.post('/signin', authenticateMiddleware, signIn);

// GET api/v1/auth/signout
router.get('/signout', signOut);

export default router;
